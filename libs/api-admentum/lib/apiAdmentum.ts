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
  Response,
  ScheduleItem,
  SchoolContact,
  Skola24Child,
  Teacher,
  TimetableEntry,
  toMarkdown,
  User,
  wrap,
} from '@skolplattformen/api'
import { EventEmitter } from 'events'
import { decode } from 'he'
import { DateTime, FixedOffsetZone } from 'luxon'
import * as html from 'node-html-parser'
import { fakeFetcher } from './fake/fakeFetcher'
import { checkStatus, DummyStatusChecker } from './loginStatus'
import { extractMvghostRequestBody, parseCalendarItem } from './parse/parsers'
import {
  bankIdInitUrl,
  bankIdCheckUrl,
  bankIdSessionUrl,
  bankIdCallbackUrl,
  redirectLocomotive,
  apiUrls,
} from './routes'
import parse from '@skolplattformen/curriculum'

function getDateOfISOWeek(week: number, year: number) {
  const simple = new Date(year, 0, 1 + (week - 1) * 7)
  const dow = simple.getDay()
  const isoWeekStart = simple
  if (dow <= 4) isoWeekStart.setDate(simple.getDate() - simple.getDay() + 1)
  else isoWeekStart.setDate(simple.getDate() + 8 - simple.getDay())
  return isoWeekStart
}

export class ApiAdmentum extends EventEmitter implements Api {
  private fetch: Fetcher
  private realFetcher: Fetcher

  private personalNumber?: string
  private userId: string

  private cookieManager: CookieManager

  public isLoggedIn = false

  private _isFake = false

  public set isFake(fake: boolean) {
    this._isFake = fake
    if (this._isFake) {
      this.fetch = fakeFetcher
    } else {
      this.fetch = this.realFetcher
    }
  }

  public get isFake() {
    return this._isFake
  }

  constructor(
    fetch: Fetch,
    cookieManager: CookieManager,
    options?: FetcherOptions
  ) {
    super()
    this.fetch = wrap(fetch, options)
    this.realFetcher = this.fetch
    this.cookieManager = cookieManager
    this.userId = ''
  }

  public replaceFetcher(fetcher: Fetcher) {
    this.fetch = fetcher
  }

  async getSchedule(
    child: EtjanstChild,
    from: DateTime,
    to: DateTime
  ): Promise<(CalendarItem & ScheduleItem)[]> {
    const lessonsResponseJson: any[] = []

    return lessonsResponseJson.map((l) => {
      const start = DateTime.fromMillis(l.startDate.ts, {
        zone: FixedOffsetZone.instance(l.startDate.timezoneOffsetMinutes),
      })
      const end = DateTime.fromMillis(l.endDate.ts, {
        zone: FixedOffsetZone.instance(l.endDate.timezoneOffsetMinutes),
      })
      return {
        id: l.id,
        title: l.title,
        description: l.note,
        location: l.location,
        startDate: start.toISO(),
        endDate: end.toISO(),
        oneDayEvent: false,
        allDayEvent: false,
      }
    })
  }

  getPersonalNumber(): string | undefined {
    return this.personalNumber
  }

  public async getSessionHeaders(
    url: string
  ): Promise<{ [index: string]: string }> {
    const cookie = await this.cookieManager.getCookieString(url)
    return {
      cookie,
    }
  }

  async setSessionCookie(sessionCookie: string): Promise<void> {
    if (!sessionCookie) throw Error('cookie required')
    this.cookieManager.setCookieString(
      `sessionid=${sessionCookie}; Path=/;`,
      'skola.admentum.se'
    )

    //const user = await this.getUser()
    //if (!user.isAuthenticated) {
    //  throw new Error('Session cookie is expired')
   // }
  }

  async getUser(): Promise<User> {
    const user = await this.fetch('fetch-me', apiUrls.me);
    const userJson = await user.json();
    this.userId = userJson.user?.id;
    console.log('userId: ', this.userId);
    console.log('fetching user')
    const currentUserResponse = await this.fetch(
      'current-user',
      apiUrls.user(this.userId)
    )
    console.log('current-user', currentUserResponse)
    if (currentUserResponse.status !== 200) {
      return { isAuthenticated: false }
    }

    const retrivedUser = await currentUserResponse.json()
    return { ...retrivedUser, isAuthenticated: true }
  }

  async getChildren(): Promise<(Skola24Child & EtjanstChild)[]> {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...')
    }
    console.log("get children")
    const fetchUrl = apiUrls.user(this.userId)
    const currentUserResponse = await this.fetch('current-user', fetchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
    }) 

    if (currentUserResponse.status !== 200) {
      console.error('Error headers', currentUserResponse.headers)
      throw new Error('Could not fetch children. Response code: ' + currentUserResponse.status)
    }
    const myChildrenResponseJson = await currentUserResponse.json();
    return myChildrenResponseJson.students.map((student: { id: any; first_name: any; last_name: any }) => ({
      id: student.id,
      sdsId: student.id,
      personGuid: student.id,
      firstName: student.first_name,
      lastName: student.last_name,
      name: `${student.first_name} ${student.last_name}`,
    }) as Skola24Child & EtjanstChild);
  }



  async getCalendar(child: EtjanstChild): Promise<CalendarItem[]> {
    try {
      if (!this.isLoggedIn) {
        throw new Error('Not logged in...')
      }
      const now = DateTime.local()
      const [year, week] = now.toISOWeekDate().split('-')
      const isoWeek = week.replace('W','')

      const fetchUrl = apiUrls.overview(year.toString(), isoWeek.toString())
      console.log('fetching calendar', fetchUrl)
      //const calendarResponse = await this.fetch('get-calendar', fetchUrl) 
      //const calendarResponseJson = await calendarResponse.json()
      const overviewResponse = await this.fetch('get-overview', fetchUrl)
      console.log('overview response', overviewResponse)
      const overviewJson = await overviewResponse.json()
      console.log('overview response', overviewJson)
      const schedule_events = (await overviewJson)?.data?.schedule_events // .breaks: [] | .assignments: []
      if (!schedule_events) {
        return Promise.resolve([])
      }
      /*
"url": "https://skola.admentum.se/api/v1/schedule_event_instances/2990834/",
    "id": 2990834,
    "school_id": 824,
    "start_date": "2023-08-07",
    "end_date": "2023-08-07",
    "schedule_event": {
        "url": "https://skola.admentum.se/api/v1/schedule_events/148722/",
        "id": 148722,
        "eid": null,
        "schedule_id": 4385,
        "name": "Engelska",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "rooms": [
            {
                "url": "https://skola.admentum.se/api/v1/rooms/7200/",
                "id": 7200
            }
        ],
        "teachers": [
            {
                "url": "https://skola.admentum.se/api/v1/users/437302/",
                "id": 437302
            }
        ],
        "schedule_groups": [],
        "primary_groups": [
            {
                "url": "https://skola.admentum.se/api/v1/primary_groups/36874/",
                "id": 36874
            }
        ],
        "weekly_interval": ""
    }
      */
      return Promise.resolve(schedule_events.map(({ menu, date } : any) => ({
        title: date,
        description: menu
      })))
    } catch (e) {
      console.error('Error fetching menu', e)
      return Promise.resolve([])
    }
  }

  async getScheduledEvents(child: EtjanstChild): Promise<CalendarItem[]> {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...')
    }
    console.log('get calendar')
    const fetchUrl = apiUrls.schedule_events;
    console.log('fetching calendar', fetchUrl)
    const eventsResponse = await this.fetch('scheduled-events', fetchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
    })

    if (eventsResponse.status === 403) {
      console.error('Not allwed. Error headers', eventsResponse.headers)
      return []
    }
    if (eventsResponse.status !== 200) {
      console.error('Error headers', eventsResponse.headers)
      throw new Error('Could not fetch children. Response code: ' + eventsResponse.status)
    }

    const eventsResponseJson = await eventsResponse.json();
    console.log('eventsResponseJson', eventsResponseJson)
    return []
    //  const fetchUrl = apiUrls.schedule_events
    // const events = await this.fetch('scheduled-events', fetchUrl, {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //   },
    // }).then(res => res.json()).then(json => json.results)


    

    // return events.map(parseScheduleEvent)*/
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getClassmates(_child: EtjanstChild): Promise<Classmate[]> {
    // TODO: We could get this from the events a child is associated with...
    /*
    GET /api/v1/schedule_groups/423145/
{
    "url": "https://skola.admentum.se/api/v1/schedule_groups/423145/",
    "id": 423145,
    "eid": null,
    "schedule": {
        "url": "https://skola.admentum.se/api/v1/schedules/4385/",
        "id": 4385,
        "school_year": "23/24"
    },
    "name": "1 A SV",
    "guid": null,
    "users": [
        {
            "url": "https://skola.admentum.se/api/v1/users/436741/",
            "id": 436741,
            "email": null,
            "first_name": "Arvid",
            "last_name": "Forslin",
            "role": 1
        },
        {
            "url": "https://skola.admentum.se/api/v1/users/436747/",
            "id": 436747,
            "email": null,
            "first_name": "Emmy",
            "last_name": "Granström",
            "role": 1
        }
        ...
    */
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...')
    }
    return Promise.resolve([])
  }

  public async getTeachers(child: EtjanstChild): Promise<Teacher[]> {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...')
    }
    return Promise.resolve([])
  }

  public async getSchoolContacts(
    child: EtjanstChild
  ): Promise<SchoolContact[]> {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...')
    }
    return Promise.resolve([])
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getNews(_child: EtjanstChild): Promise<NewsItem[]> {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...')
    }
    return Promise.resolve([])
  }

  async getNewsDetails(_child: EtjanstChild, item: NewsItem): Promise<any> {
    return { ...item }
  }
/*
  "data": {
    "food_week": {
      "id": 12846,
      "week": 38,
      "year": 2023,
      "food_days": [
        {
          "id": 60620,
          "date": "2023-09-18",
          "menu": "Förrätt: Morotssoppa med knäckebröd\r\nHuvudrätt: Kycklinggryta med ris och grönsaker\r\nEfterrätt: Fruktkompott",
          "weekday": "Måndag",
          "weekday_nbr": 0
        },
        {
          "id": 60621,
          "date": "2023-09-19",
          "menu": "Förrätt: Gurksallad\
*/
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getMenu(_child: EtjanstChild): Promise<MenuItem[]> {
    try {
      if (!this.isLoggedIn) {
        throw new Error('Not logged in...')
      }
      const now = DateTime.local()
      const [year, week] = now.toISOWeekDate().split('-')
      const isoWeek = week.replace('W', '')

      const fetchUrl = apiUrls.menu(year.toString(), isoWeek.toString())
      console.log('fetching menu', fetchUrl)
      const menuResponse = (await this.fetch('get-menu', fetchUrl))
      console.log('menu response', menuResponse)
      const menuResponseJson = await menuResponse.text()
      console.log('menu response', menuResponseJson)
      const days = (await menuResponseJson)
      //if (!days) {
      return Promise.resolve([])
      //}
      /*return Promise.resolve(
        days.map(({ menu, date }: any) => ({
          title: date,
          description: menu,
        }))
      )*/
    } catch (e) {
      console.error('Error fetching menu', e)
      return Promise.resolve([])
    }
  }

  async getChildEventsWithAssociatedMembers(child: EtjanstChild) {
    return this.getEventsWithAssociatedMembersForChildren([child])
  }

  async getEventsWithAssociatedMembersForChildren(children: EtjanstChild[]) {
    return Promise.resolve([])
  }

  async getNotifications(child: EtjanstChild): Promise<Notification[]> {
    return Promise.resolve([])
  }

  async getSkola24Children(): Promise<Skola24Child[]> {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...')
    }
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTimetable(
    child: Skola24Child,
    week: number,
    year: number,
    _lang: string
  ): Promise<TimetableEntry[]> {

    const fetchUrl = apiUrls.schedule(year.toString(), week.toString())
    console.log('fetching timetable', fetchUrl)
    const calendarResponse = await this.fetch('get-calendar', fetchUrl) 
    const calendarResponseJson = await calendarResponse.json()
    const timetableEntries = parseCalendarItem(calendarResponseJson)
    return timetableEntries;
  }

  async logout(): Promise<void> {
    this.isLoggedIn = false
    this.personalNumber = undefined
    this.cookieManager.clearAll()
    this.emit('logout')
  }

  public async login(personalNumber?: string): Promise<LoginStatusChecker> {
    // short circut the bank-id login if in fake mode
    if (personalNumber !== undefined && personalNumber.endsWith('1212121212'))
      return this.fakeMode()

    
    console.log('login adentum', personalNumber)
    this.isFake = false

    const authenticatedUser = await this.getUser();
    if (authenticatedUser && authenticatedUser.isAuthenticated) {
      console.log('already logged in to admentum')
      this.isLoggedIn = true
      this.personalNumber = personalNumber
      this.emit('login')
      return new DummyStatusChecker()
    }

    const url = await this.fetch('get-session', bankIdSessionUrl('')).then(
      (res) => {
        console.log('got res', res, (res as any).url, res.headers)
        return (res as any).url
      }
    )
    // https://login.grandid.com/?sessionid=234324
    // => 234324
    console.log('url', url)

    // Logged in: https://skola.admentum.se/overview
    if (url.includes('overview')) {
      console.log('already logged in to admentum')
      this.isLoggedIn = true
      this.personalNumber = personalNumber
      this.emit('login')
      return new DummyStatusChecker()
    }

    const sessionId = url.split('=').pop()
    console.log('sessionId', sessionId)
    console.log('adentum session id', sessionId)
    if (!sessionId) throw new Error('No session provided')

    console.log('url', bankIdInitUrl(sessionId))
    await this.fetch('bankid-init', bankIdInitUrl(sessionId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'ssn=' + personalNumber,
    })

    console.log('start polling', sessionId)
    const statusChecker = checkStatus(this.fetch, bankIdCheckUrl(sessionId))

    statusChecker.on('OK', async () => {
      this.isLoggedIn = true
      this.personalNumber = personalNumber


      const locomotiveUrl = redirectLocomotive(sessionId)
      console.log('calling locomotive url: ', locomotiveUrl);
      const callbackResponse = await this.followRedirects(locomotiveUrl);
      console.log('final response:', callbackResponse);
      this.emit('login')
    })
    statusChecker.on('ERROR', () => {
      this.personalNumber = undefined
    })

    return statusChecker
  }
  
  async followRedirects(initialUrl: string): Promise<Response> {
    let currentUrl = initialUrl;
    let redirectCount = 0;
    const maxRedirects = 10;

    while (redirectCount < maxRedirects) {
      console.log('fetching (redirect number ' + redirectCount + ')', currentUrl);
      const response = await this.fetch('follow-redirect', currentUrl, {
        method: 'GET',
        redirect: 'manual', // Disable automatic redirects
      });
      console.log('follow-redirect response', response);
      if (response.status >= 300 && response.status < 400) {
        console.log('response status:', response.status);
        const newLocation = response.headers.get('location');
        if (!newLocation) {
          throw new Error('Redirect response missing location header');
        }
        currentUrl = newLocation;
        redirectCount++;
      } else {
        console.log('response status, not reidrect:', response.status);
        // The response is not a redirect, return it
        return response;
      }
    }
  throw new Error('Max redirects reached'); 
  };

  private async fakeMode(): Promise<LoginStatusChecker> {
    this.isFake = true

    setTimeout(() => {
      this.isLoggedIn = true
      this.emit('login')
    }, 50)

    const emitter: any = new EventEmitter()
    emitter.token = 'fake'
    return emitter
  }

  async loginFreja(): Promise<FrejaLoginStatusChecker> {
    throw new Error('Not implemented...')
  }
}
