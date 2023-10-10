/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Api,
  CalendarItem,
  Classmate,
  CookieManager,
  EtjanstChild,
  Fetch,
  Fetcher,
  FetcherOptions,
  FrejaLoginStatusChecker,
  LoginStatusChecker,
  MenuItem,
  NewsItem,
  Notification,
  ScheduleItem,
  SchoolContact,
  Skola24Child,
  Teacher,
  TimetableEntry,
  toMarkdown,
  URLSearchParams,
  User,
  wrap,
} from '../../api/lib';
import {EventEmitter} from 'events';
import {decode} from 'he';
import {DateTime, FixedOffsetZone} from 'luxon';
import * as html from 'node-html-parser';
import {fakeFetcher} from './fake/fakeFetcher';
import {checkStatus, DummyStatusChecker} from './loginStatus';
import {extractMvghostRequestBody, parseCalendarItem} from './parse/parsers';
import {
  beginBankIdUrl,
  beginLoginUrl,
  calendarEventUrl,
  calendarsUrl,
  currentUserUrl,
  fullImageUrl,
  hjarntorgetEventsUrl,
  hjarntorgetUrl,
  infoSetReadUrl,
  infoUrl,
  initBankIdUrl,
  lessonsUrl,
  membersWithRoleUrl,
  mvghostUrl,
  myChildrenUrl,
  rolesInEventUrl,
  shibbolethLoginUrl,
  shibbolethLoginUrlBase,
  verifyUrlBase,
  wallMessagesUrl,
} from './routes';
import parse from '../../curriculum/src';

function getDateOfISOWeek(week: number, year: number) {
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dow = simple.getDay();
  const isoWeekStart = simple;
  if (dow <= 4) isoWeekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else isoWeekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return isoWeekStart;
}

export class ApiHjarntorget extends EventEmitter implements Api {
  private fetch: Fetcher;
  private realFetcher: Fetcher;

  private personalNumber?: string;

  private cookieManager: CookieManager;

  public isLoggedIn = false;

  private _isFake = false;

  public set isFake(fake: boolean) {
    this._isFake = fake;
    if (this._isFake) {
      this.fetch = fakeFetcher;
    } else {
      this.fetch = this.realFetcher;
    }
  }

  public get isFake() {
    return this._isFake;
  }

  constructor(
    fetch: Fetch,
    cookieManager: CookieManager,
    options?: FetcherOptions,
  ) {
    super();
    this.fetch = wrap(fetch, options);
    this.realFetcher = this.fetch;
    this.cookieManager = cookieManager;
  }

  public replaceFetcher(fetcher: Fetcher) {
    this.fetch = fetcher;
  }

  async getSchedule(
    child: EtjanstChild,
    from: DateTime,
    to: DateTime,
  ): Promise<(CalendarItem & ScheduleItem)[]> {
    const lessonParams = {
      forUser: child.id,
      startDateIso: from.toISODate(),
      endDateIso: to.toISODate(),
    };
    const lessonsResponse = await this.fetch(
      `lessons-${lessonParams.forUser}`,
      lessonsUrl(lessonParams),
    );
    const lessonsResponseJson: any[] = await lessonsResponse.json();

    return lessonsResponseJson.map(l => {
      const start = DateTime.fromMillis(l.startDate.ts, {
        zone: FixedOffsetZone.instance(l.startDate.timezoneOffsetMinutes),
      });
      const end = DateTime.fromMillis(l.endDate.ts, {
        zone: FixedOffsetZone.instance(l.endDate.timezoneOffsetMinutes),
      });
      return {
        id: l.id,
        title: l.title,
        description: l.note,
        location: l.location,
        startDate: start.toISO(),
        endDate: end.toISO(),
        oneDayEvent: false,
        allDayEvent: false,
      };
    });
  }

  getPersonalNumber(): string | undefined {
    return this.personalNumber;
  }

  public async getSessionHeaders(
    url: string,
  ): Promise<{[index: string]: string}> {
    const cookie = await this.cookieManager.getCookieString(url);
    return {
      cookie,
    };
  }

  async setSessionCookie(sessionCookie: string): Promise<void> {
    this.cookieManager.setCookieString(sessionCookie, hjarntorgetUrl);

    const user = await this.getUser();
    if (!user.isAuthenticated) {
      throw new Error('Session cookie is expired');
    }

    this.isLoggedIn = true;
    this.emit('login');
  }

  async getUser(): Promise<User> {
    console.log('fetching user');
    const currentUserResponse = await this.fetch(
      'current-user',
      currentUserUrl,
    );
    if (currentUserResponse.status !== 200) {
      return {isAuthenticated: false};
    }

    const retrivedUser = await currentUserResponse.json();
    return {...retrivedUser, isAuthenticated: true};
  }

  async getChildren(): Promise<(Skola24Child & EtjanstChild)[]> {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...');
    }
    console.log('fetching children');

    const myChildrenResponse = await this.fetch('my-children', myChildrenUrl);
    const myChildrenResponseJson: any[] = await myChildrenResponse.json();

    return myChildrenResponseJson.map(
      c =>
        ({
          id: c.id,
          sdsId: c.id,
          personGuid: c.id,
          firstName: c.firstName,
          lastName: c.lastName,
          name: `${c.firstName} ${c.lastName}`,
        } as Skola24Child & EtjanstChild),
    );
  }

  async getCalendar(child: EtjanstChild): Promise<CalendarItem[]> {
    const childEventsAndMembers =
      await this.getChildEventsWithAssociatedMembers(child);

    // This fetches the calendars search page on Hjärntorget.
    // It is used (at least at one school) for homework schedule
    // The Id for the "event" that the calendar belongs to is not the same as the ones
    // fetched using the API... So we match them by name :/
    const calendarsResponse = await this.fetch('calendars', calendarsUrl);
    const calendarsResponseText = await calendarsResponse.text();
    const calendarsDoc = html.parse(decode(calendarsResponseText));
    const calendarCheckboxes = Array.from(
      calendarsDoc.querySelectorAll('.calendarPageContainer input.checkbox'),
    );

    let calendarItems: CalendarItem[] = [];
    for (let i = 0; i < calendarCheckboxes.length; i++) {
      const calendarId = calendarCheckboxes[i].getAttribute('value') || '';

      const today = DateTime.fromJSDate(new Date());
      const start = today.toISODate();
      const end = today.plus({days: 30}).toISODate();
      const calendarResponse = await this.fetch(
        `calendar-${calendarId}`,
        calendarEventUrl(calendarId, start, end),
      );
      const calendarResponseText = await calendarResponse.text();
      const calendarDoc = html.parse(decode(calendarResponseText));

      const calendarRows = Array.from(
        calendarDoc.querySelectorAll('.default-table tr'),
      );
      if (!calendarRows.length) {
        continue;
      }

      calendarRows.shift();
      const eventName = calendarRows.shift()?.textContent;
      if (childEventsAndMembers.some(e => e.name === eventName)) {
        const items: CalendarItem[] = calendarRows.map(parseCalendarItem);

        calendarItems = calendarItems.concat(items);
      }
    }

    return calendarItems;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getClassmates(_child: EtjanstChild): Promise<Classmate[]> {
    // TODO: We could get this from the events a child is associated with...
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...');
    }
    return Promise.resolve([]);
  }

  public async getTeachers(child: EtjanstChild): Promise<Teacher[]> {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...');
    }
    return Promise.resolve([]);
  }

  public async getSchoolContacts(
    child: EtjanstChild,
  ): Promise<SchoolContact[]> {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...');
    }
    return Promise.resolve([]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getNews(_child: EtjanstChild): Promise<NewsItem[]> {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...');
    }

    const children = await this.getChildren();
    const eventsAndMembersForChildren =
      await this.getEventsWithAssociatedMembersForChildren(children);
    const membersInChildensEvents = eventsAndMembersForChildren.reduce(
      (acc, e) => acc.concat(e.eventMembers),
      [] as any[],
    );

    const wallMessagesResponse = await this.fetch(
      'wall-events',
      wallMessagesUrl,
    );
    const wallMessagesResponseJson: any[] = await wallMessagesResponse.json();
    const nonChildSpecificMessages = wallMessagesResponseJson
      .filter(
        message =>
          // Ignore "Alarm" messages from the calendar
          message.creator.id !== '__system$virtual$calendar__' &&
          // Only include messages that can not reliably be associated with one of the children
          !membersInChildensEvents.some(
            member => member.id === message.creator.id,
          ),
      )
      .map(message => {
        const createdDate = new Date(message.created.ts);
        const body = message.body as string;
        const trimmedBody = body.trim();
        const firstNewline = trimmedBody.indexOf('\n');
        const title =
          trimmedBody.substring(0, firstNewline).trim() || message.title;
        const intro = trimmedBody.substring(firstNewline).trim();
        return {
          id: message.id,
          author:
            message.creator &&
            `${message.creator.firstName} ${message.creator.lastName}`,
          header: title,
          intro: intro,
          body: body,
          published: createdDate.toISOString(),
          modified: createdDate.toISOString(),
          fullImageUrl:
            message.creator && fullImageUrl(message.creator.imagePath),
          timestamp: message.created.ts,
        };
      });

    const infoResponse = await this.fetch('info', infoUrl);
    const infoResponseJson: any[] = await infoResponse.json();
    // TODO: Filter out read messages?
    const officialInfoMessages = infoResponseJson.map(i => {
      const body = html.parse(decode(i.body || ''));
      const bodyText = toMarkdown(i.body);

      const introText = body.innerText || '';
      const publishedDate = new Date(i.created.ts);

      return {
        id: i.id,
        author: i.creator && `${i.creator.firstName} ${i.creator.lastName}`,
        header: i.title,
        intro: introText,
        body: bodyText,
        published: publishedDate.toISOString(),
        modified: publishedDate.toISOString(),
        fullImageUrl: i.creator && fullImageUrl(i.creator.imagePath),
        timestamp: i.created.ts,
      };
    });

    const newsMessages = officialInfoMessages.concat(nonChildSpecificMessages);
    newsMessages.sort((a, b) => b.timestamp - a.timestamp);
    return newsMessages;
  }

  async getNewsDetails(_child: EtjanstChild, item: NewsItem): Promise<any> {
    return {...item};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMenu(_child: EtjanstChild): Promise<MenuItem[]> {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...');
    }
    // Have not found this available on hjärntorget. Perhaps do a mapping to https://www.skolmaten.se/ ?
    return Promise.resolve([]);
  }

  async getChildEventsWithAssociatedMembers(child: EtjanstChild) {
    return this.getEventsWithAssociatedMembersForChildren([child]);
  }

  async getEventsWithAssociatedMembersForChildren(children: EtjanstChild[]) {
    const hjarntorgetEventsResponse = await this.fetch(
      'events',
      hjarntorgetEventsUrl,
    );
    const hjarntorgetEventsResponseJson: any[] =
      await hjarntorgetEventsResponse.json();
    const membersInEvents = await Promise.all(
      hjarntorgetEventsResponseJson
        .filter(e => e.state === 'ONGOING')
        .map(async e => {
          const eventId = e.id as number;

          const rolesInEvenResponse = await this.fetch(
            `roles-in-event-${eventId}`,
            rolesInEventUrl(eventId),
          );
          const rolesInEvenResponseJson: any[] =
            await rolesInEvenResponse.json();

          const eventMembers = await Promise.all(
            rolesInEvenResponseJson.map(async r => {
              const roleId = r.id;
              const membersWithRoleResponse = await this.fetch(
                `event-role-members-${eventId}-${roleId}`,
                membersWithRoleUrl(eventId, roleId),
              );
              const membersWithRoleResponseJson: any[] =
                await membersWithRoleResponse.json();
              return membersWithRoleResponseJson;
            }),
          );
          return {
            eventId,
            name: e.name as string,
            eventMembers: ([] as any[]).concat(...eventMembers),
          };
        }),
    );

    return membersInEvents.filter(e =>
      e.eventMembers.find(p => children.some(c => c.id === p.id)),
    );
  }

  async getNotifications(child: EtjanstChild): Promise<Notification[]> {
    const childEventsAndMembers =
      await this.getChildEventsWithAssociatedMembers(child);
    const membersInChildsEvents = childEventsAndMembers.reduce(
      (acc, e) => acc.concat(e.eventMembers),
      [] as any[],
    );

    const wallMessagesResponse = await this.fetch(
      'wall-events',
      wallMessagesUrl,
    );
    const wallMessagesResponseJson: any[] = await wallMessagesResponse.json();
    return wallMessagesResponseJson
      .filter(message =>
        membersInChildsEvents.find(member => member.id === message.creator.id),
      )
      .map(message => {
        const createdDate = new Date(message.created.ts);
        return {
          id: message.id,
          sender:
            message.creator &&
            `${message.creator.firstName} ${message.creator.lastName}`,
          dateCreated: createdDate.toISOString(),
          message: message.body,
          url: message.url,
          category: message.title,
          type: message.type,
          dateModified: createdDate.toISOString(),
        };
      });
  }

  async getSkola24Children(): Promise<Skola24Child[]> {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...');
    }
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTimetable(
    child: Skola24Child,
    week: number,
    year: number,
    _lang: string,
  ): Promise<TimetableEntry[]> {
    const startDate = DateTime.fromJSDate(getDateOfISOWeek(week, year));
    const endDate = startDate.plus({days: 7});

    const lessonParams = {
      forUser: child.personGuid!, // This is a bit of a hack due to how we map things...
      startDateIso: startDate.toISODate(),
      endDateIso: endDate.toISODate(),
    };
    const lessonsResponse = await this.fetch(
      `lessons-${lessonParams.forUser}`,
      lessonsUrl(lessonParams),
    );
    const lessonsResponseJson: any[] = await lessonsResponse.json();

    return lessonsResponseJson.map(l => {
      const start = DateTime.fromMillis(l.startDate.ts, {
        zone: FixedOffsetZone.instance(l.startDate.timezoneOffsetMinutes),
      });
      const end = DateTime.fromMillis(l.endDate.ts, {
        zone: FixedOffsetZone.instance(l.endDate.timezoneOffsetMinutes),
      });
      return {
        ...parse(l.title, _lang),
        id: l.id,
        teacher: l.bookedTeacherNames && l.bookedTeacherNames[0],
        location: l.location,
        timeStart: start.toISOTime().substring(0, 5),
        timeEnd: end.toISOTime().substring(0, 5),
        dayOfWeek: start.toJSDate().getDay(),
        blockName: l.title,
        dateStart: start.toISODate(),
        dateEnd: end.toISODate(),
      } as TimetableEntry;
    });
  }

  async logout(): Promise<void> {
    this.isLoggedIn = false;
    this.personalNumber = undefined;
    this.cookieManager.clearAll();
    this.emit('logout');
  }

  public async login(personalNumber?: string): Promise<LoginStatusChecker> {
    // short circut the bank-id login if in fake mode
    if (personalNumber !== undefined && personalNumber.endsWith('1212121212'))
      return this.fakeMode();

    this.isFake = false;

    console.log('initiating login to hjarntorget');
    const beginLoginRedirectResponse = await this.fetch(
      'begin-login',
      beginLoginUrl,
      {
        redirect: 'follow',
      },
    );

    if ((beginLoginRedirectResponse as any).url.endsWith('startPage.do')) {
      // already logged in!
      const emitter = new DummyStatusChecker();
      setTimeout(() => {
        this.isLoggedIn = true;
        emitter.emit('OK');
        this.emit('login');
      }, 50);
      return emitter as LoginStatusChecker;
    }

    console.log('prepping??? shibboleth');
    const shibbolethLoginResponse = await this.fetch(
      'init-shibboleth-login',
      shibbolethLoginUrl(
        shibbolethLoginUrlBase((beginLoginRedirectResponse as any).url),
      ),
      {
        redirect: 'follow',
      },
    );

    const shibbolethRedirectUrl = (shibbolethLoginResponse as any).url;
    console.log('initiating bankid...');
    const initBankIdResponse = await this.fetch(
      'init-bankId',
      initBankIdUrl(shibbolethRedirectUrl),
      {
        redirect: 'follow',
      },
    );

    const initBankIdResponseText = await initBankIdResponse.text();
    const mvghostRequestBody = extractMvghostRequestBody(
      initBankIdResponseText,
    );

    console.log('picking auth server???');
    const mvghostResponse = await this.fetch('pick-mvghost', mvghostUrl, {
      redirect: 'follow',
      method: 'POST',
      body: mvghostRequestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('start bankid sign in');
    // We may get redirected to some other subdomain i.e. not 'm00-mg-local':
    // https://mNN-mg-local.idp.funktionstjanster.se/mg-local/auth/ccp11/grp/other

    const ssnBody = new URLSearchParams({ssn: personalNumber}).toString();
    const beginBankIdResponse = await this.fetch(
      'start-bankId',
      beginBankIdUrl((mvghostResponse as any).url),
      {
        redirect: 'follow',
        method: 'POST',
        body: ssnBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    console.log('start polling');
    const statusChecker = checkStatus(
      this.fetch,
      verifyUrlBase((beginBankIdResponse as any).url),
    );

    statusChecker.on('OK', async () => {
      // setting these similar to how the sthlm api does it
      // not sure if it is needed or if the cookies are enough for fetching all info...
      this.isLoggedIn = true;
      this.personalNumber = personalNumber;
      this.emit('login');
    });
    statusChecker.on('ERROR', () => {
      this.personalNumber = undefined;
    });

    return statusChecker;
  }

  private async fakeMode(): Promise<LoginStatusChecker> {
    this.isFake = true;

    setTimeout(() => {
      this.isLoggedIn = true;
      this.emit('login');
    }, 50);

    const emitter: any = new EventEmitter();
    emitter.token = 'fake';
    return emitter;
  }

  async loginFreja(): Promise<FrejaLoginStatusChecker> {
    throw new Error('Not implemented...');
  }
}
