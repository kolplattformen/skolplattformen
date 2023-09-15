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
  apiUrls,
  getUserUrl,
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
    //    this.cookieManager.setCookieString(sessionCookie, admentumUrl)

    const user = await this.getUser()
    if (!user.isAuthenticated) {
      throw new Error('Session cookie is expired')
    }

    this.isLoggedIn = true
    this.emit('login')
  }

  async getUser(): Promise<User> {
    console.log('fetching user')
    const currentUserResponse = await this.fetch('current-user', apiUrls.users) // + /id?
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
    const testUserId = '436838'
    const fetchUrl = apiUrls.users + '/' + testUserId
    console.log('fetching children for user id', testUserId, 'from', fetchUrl)
    const currentUserResponse = await this.fetch('current-user', fetchUrl) 
    if (currentUserResponse.status !== 200) {
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
    return Promise.resolve([])
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getClassmates(_child: EtjanstChild): Promise<Classmate[]> {
    // TODO: We could get this from the events a child is associated with...
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMenu(_child: EtjanstChild): Promise<MenuItem[]> {
    if (!this.isLoggedIn) {
      throw new Error('Not logged in...')
    }
    // Have not found this available on hjärntorget. Perhaps do a mapping to https://www.skolmaten.se/ ?
    return Promise.resolve([])
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
    const startDate = DateTime.fromJSDate(getDateOfISOWeek(week, year))
    const endDate = startDate.plus({ days: 7 })

    const lessonsResponseJson: any[] = []

    return lessonsResponseJson.map((l) => {
      const start = DateTime.fromMillis(l.startDate.ts, {
        zone: FixedOffsetZone.instance(l.startDate.timezoneOffsetMinutes),
      })
      const end = DateTime.fromMillis(l.endDate.ts, {
        zone: FixedOffsetZone.instance(l.endDate.timezoneOffsetMinutes),
      })
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
      } as TimetableEntry
    })
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

    const testChildren = await this.getChildren()
    console.log('login adentum', personalNumber)
    this.isFake = false
    const sessionId = await this.fetch('get-session', bankIdSessionUrl(''))
      .then((res) => {
        console.log('got res', res, (res as any).url)
        return (res as any).url
      })
      .then((url) => url.split('=').pop()) // https://login.grandid.com/?sessionid=234324

    console.log('test children', testChildren)
    console.log('adentum session id', sessionId)
    if (!sessionId) throw new Error('No session provided')

    this.fetch('bankid-init', bankIdInitUrl(sessionId), {
      method: 'POST',
      body: 'ssn=' + personalNumber,
    })

    console.log('start polling', sessionId)
    const statusChecker = checkStatus(this.fetch, bankIdCheckUrl(sessionId))

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
