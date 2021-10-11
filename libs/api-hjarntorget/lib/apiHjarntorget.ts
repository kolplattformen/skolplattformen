import { DateTime, FixedOffsetZone } from 'luxon'
import { EventEmitter } from 'events'
import * as html from 'node-html-parser'
import { decode } from 'he'
import wrap, { Fetcher, FetcherOptions } from '../../api/lib/fetcher'
import {
  CalendarItem,
  Classmate,
  CookieManager,
  EtjanstChild,
  Fetch,
  MenuItem,
  NewsItem,
  Notification,
  ScheduleItem,
  Skola24Child,
  TimetableEntry,
  User
} from "../../api/lib/types"
import { LoginStatusChecker } from '../../api/lib/loginStatus'
import { URLSearchParams } from '../../api/lib/URLSearchParams'
import { Api } from '../../api/lib/api'
import { toMarkdown } from '../../api/lib/parseHtml'
import { checkStatus } from './loginStatus'
import { extractMvghostRequestBody } from './parse/parsers'
import { beginLoginUrl, beingBankIdUrl, currentUserUrl, extractInitBankIdParams as initBankIdUrl, fullImageUrl, hjarntorgetEventsUrl, hjarntorgetUrl, infoSetReadUrl, infoUrl, lessonsUrl, membersWithRoleUrl, mvghostUrl, myChildrenUrl, returnUrlFromUrlParam, returnUrlFromUrlParam as shibbolethLoginUrlBase, rolesInEventUrl, shibbolethLoginUrl, verifyUrlBase, wallMessagesUrl } from './routes'


function getDateOfISOWeek(week: number, year: number,) {
  const simple = new Date(year, 0, 1 + (week - 1) * 7)
  const dow = simple.getDay()
  const ISOweekStart = simple
  if (dow <= 4)
    ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
  else
    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())
  return ISOweekStart
}

export class ApiHjarntorget extends EventEmitter implements Api {
  private fetch: Fetcher

  private personalNumber?: string

  private headers: any

  private cookieManager: CookieManager

  public isLoggedIn: boolean = false

  public isFake: boolean = false

  constructor(
    fetch: Fetch,
    cookieManager: CookieManager,
    options?: FetcherOptions
  ) {
    super()
    this.fetch = wrap(fetch, options)
    this.cookieManager = cookieManager
    this.headers = {}
  }

  async getSchedule(child: EtjanstChild, from: DateTime, to: DateTime): Promise<(CalendarItem & ScheduleItem)[]> {

    const lessonParams = {
      forUser: child.id,
      startDateIso: from.toISODate(),
      endDateIso: to.toISODate(),
    }
    const lessonsResponse = await this.fetch('info', lessonsUrl(lessonParams))
    const lessonsResponseJson: any[] = await lessonsResponse.json()

    return lessonsResponseJson.map(l => {
      const start = DateTime.fromMillis(l.startDate.ts, {
        zone: FixedOffsetZone.instance(l.startDate.timezoneOffsetMinutes)
      })
      const end = DateTime.fromMillis(l.endDate.ts, {
        zone: FixedOffsetZone.instance(l.endDate.timezoneOffsetMinutes)
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

  async setSessionCookie(sessionCookie: string): Promise<void> {

    await this.fetch('login-cookie', hjarntorgetUrl, {
      headers: {
        cookie: sessionCookie,
      },
      redirect: 'manual',
    })

    const user = await this.getUser()
    if (!user.isAuthenticated) {
      throw new Error('Session cookie is expired')
    }

    this.isLoggedIn = true
    this.emit('login')
  }

  async getUser(): Promise<User> {

    const currentUserResponse = await this.fetch('myChildren', currentUserUrl)
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


    const myChildrenResponse = await this.fetch('myChildren', myChildrenUrl)
    const myChildrenResponseJson: any[] = await myChildrenResponse.json()

    return myChildrenResponseJson.map(c => ({
      id: c.id,
      sdsId: c.id,
      personGuid: c.id,
      firstName: c.firstName,
      lastName: c.lastName,
      name: `${c.firstName} ${c.lastName}`,
    } as (Skola24Child & EtjanstChild)))
  }

  async getCalendar(child: EtjanstChild): Promise<CalendarItem[]> {
    const schedule = await this.getSchedule(child, DateTime.now(), DateTime.now().plus({ months: 1 }))
    return schedule
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getClassmates(_child: EtjanstChild): Promise<Classmate[]> {
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


    const infoResponse = await this.fetch('info', infoUrl)
    const infoResponseJson: any[] = await infoResponse.json()
    // TODO: Filter out read messages?
    return infoResponseJson.map(i => {
      const body = html.parse(decode(i.body || ""))
      const bodyText = toMarkdown(i.body)

      const introText = body.innerText || ""
      const publishedDate = new Date(i.created.ts)

      return {
        id: i.id,
        author: i.creator && `${i.creator.firstName} ${i.creator.lastName}`,
        header: i.title,
        intro: introText,
        body: bodyText,
        published: publishedDate.toISOString(),
        modified: publishedDate.toISOString(),
        fullImageUrl: i.creator && fullImageUrl(i.creator.imagePath)
      }
    })
  }

  async getNewsDetails(_child: EtjanstChild, item: NewsItem): Promise<any> {

    this.fetch('info', infoSetReadUrl(item), {
      method: 'POST',
    })

    return { ...item }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMenu(_child: EtjanstChild): Promise<MenuItem[]> {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...')
    }
    // Have not found this available on hjärntorget. Perhaps do a mapping to https://www.skolmaten.se/ ?
    return Promise.resolve([])
  }

  async getNotifications(child: EtjanstChild): Promise<Notification[]> {

    const hjarntorgetEventsResponse = await this.fetch('events', hjarntorgetEventsUrl)
    const hjarntorgetEventsResponseJson: any[] = await hjarntorgetEventsResponse.json()
    const membersInEvents = await Promise.all(hjarntorgetEventsResponseJson.filter(e => e.state === 'ONGOING')
      .map(async e => {
        const eventId = e.id as number

        const rolesInEvenResponse = await this.fetch('roles-in-event', rolesInEventUrl(eventId))
        const rolesInEvenResponseJson: any[] = await rolesInEvenResponse.json()

        const eventMembers = await Promise.all(rolesInEvenResponseJson.map(async r => {
          const roleId = r.id
          const membersWithRoleResponse = await this.fetch('event-role-members', membersWithRoleUrl(eventId, roleId))
          const membersWithRoleResponseJson: any[] = await membersWithRoleResponse.json()
          return membersWithRoleResponseJson
        }))
        return { eventId, eventMembers: ([] as any[]).concat(...eventMembers) }
      }))
    const membersInChildsEvents = membersInEvents
      .filter(e => e.eventMembers.find(p => p.id === child.id))
      .reduce((acc, e) => acc.concat(e.eventMembers), ([] as any[]))


    const wallMessagesResponse = await this.fetch('wall-events', wallMessagesUrl)
    const wallMessagesResponseJson: any[] = await wallMessagesResponse.json()
    return wallMessagesResponseJson.filter(message =>
      membersInChildsEvents.find(member => member.id === message.creator.id))
      .map(message => {
        const createdDate = new Date(message.created.ts)
        return {
          id: message.id,
          sender: message.creator && `${message.creator.firstName} ${message.creator.lastName}`,
          dateCreated: createdDate.toISOString(),
          message: message.body,
          url: message.url,
          category: message.title,
          type: message.type,
          dateModified: createdDate.toISOString(),
        }
      })
  }

  async getSkola24Children(): Promise<(Skola24Child)[]> {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...')
    }
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTimetable(child: Skola24Child, week: number, year: number, _lang: string): Promise<TimetableEntry[]> {

    const startDate = DateTime.fromJSDate(getDateOfISOWeek(week, year))
    const endDate = startDate.plus({ days: 7 })

    const lessonParams = {
      forUser: child.personGuid!, // This is a bit of a hack due to how we map things...
      startDateIso: startDate.toISODate(),
      endDateIso: endDate.toISODate(),
    }
    const lessonsResponse = await this.fetch('info', lessonsUrl(lessonParams))
    const lessonsResponseJson: any[] = await lessonsResponse.json()

    return lessonsResponseJson.map(l => {
      const start = DateTime.fromMillis(l.startDate.ts, {
        zone: FixedOffsetZone.instance(l.startDate.timezoneOffsetMinutes)
      })
      const end = DateTime.fromMillis(l.endDate.ts, {
        zone: FixedOffsetZone.instance(l.endDate.timezoneOffsetMinutes)
      })
      return {
        id: l.id,
        teacher: l.bookedTeacherNames && l.bookedTeacherNames[0],
        location: l.location,
        timeStart: start.toISOTime().substring(0, 5),
        timeEnd: end.toISOTime().substring(0, 5),
        dayOfWeek: start.toJSDate().getDay(),
        blockName: l.title,
        dateStart: start.toISODate(),
        dateEnd: start.toISODate(),
      } as TimetableEntry
    })

  }

  async logout(): Promise<void> {
    this.isLoggedIn = false
    this.cookieManager.clearAll()
  }

  public async login(personalNumber?: string): Promise<LoginStatusChecker> {
    console.log("initiating login to hjarntorget")

    const beginLoginRedirectResponse = await this.fetch('begin-login', beginLoginUrl, {
      redirect: 'follow'
    })

    const shibbolethLoginParam = {
      entityID: 'https://auth.goteborg.se/FIM/sps/HjarntorgetEID/saml20'
    }
    const shibbolethLoginUrlBase = returnUrlFromUrlParam((beginLoginRedirectResponse as any).url)
    console.log("prepping??? shibboleth")
    const shibbolethLoginResponse = await this.fetch('begin-login', shibbolethLoginUrl(shibbolethLoginUrlBase, shibbolethLoginParam), {
      redirect: 'follow'
    })

    const shibbolethRedirectUrl = (shibbolethLoginResponse as any).url
    console.log("initiating bankid...")
    const initBankIdResponse = await this.fetch('init-bankId', initBankIdUrl(shibbolethRedirectUrl), {
      redirect: 'follow'
    })

    const initBankIdResponseText = await initBankIdResponse.text()
    const mvghostRequestBody = extractMvghostRequestBody(initBankIdResponseText)

    console.log("picking auth server???")
    const mvghostResponse = await this.fetch('mvghost', mvghostUrl, {
      redirect: 'follow',
      method: 'POST',
      body: mvghostRequestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    console.log("start bankid sign in")
    // We may get redirected to some other subdomain i.e. not 'm00-mg-local':
    // https://mNN-mg-local.idp.funktionstjanster.se/mg-local/auth/ccp11/grp/other


    const ssnBody = new URLSearchParams({ ssn: personalNumber }).toString()
    const beginBankIdResponse = await this.fetch('being-bankid', beingBankIdUrl((mvghostResponse as any).url), {
      redirect: 'follow',
      method: 'POST',
      body: ssnBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    console.log("start polling")

    const statusChecker = checkStatus(this.fetch, verifyUrlBase((beginBankIdResponse as any).url))

    statusChecker.on('OK', async () => {
      // setting these similar to how the sthlm api does it
      // not sure if it is needed or if the cookies are enough for fetching all info...
      this.isLoggedIn = true
      this.personalNumber = personalNumber
      this.emit('login')
    })
    statusChecker.on('ERROR', () => {
      this.personalNumber = undefined
    })

    return statusChecker
  }
}