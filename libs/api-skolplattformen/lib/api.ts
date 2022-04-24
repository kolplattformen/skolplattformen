import {
  Api,
  AuthTicket,
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
  RequestInit,
  Response,
  ScheduleItem,
  Skola24Child,
  SSOSystem,
  Teacher,
  TimetableEntry,
  SchoolContact,
  URLSearchParams,
  User,
  wrap,
} from '@skolplattformen/api'
import { Language } from '@skolplattformen/curriculum'
import { EventEmitter } from 'events'
import { decode } from 'he'
import { DateTime } from 'luxon'
import * as html from 'node-html-parser'
import * as fake from './fakeData'
import { checkStatus, DummyStatusChecker } from './loginStatusChecker'
import { checkStatus as checkFrejaStatus } from './frejaLoginStatusChecker'
import * as parse from './parse/index'
import queueFetcherWrapper from './queueFetcherWrapper'
import * as routes from './routes'

const fakeResponse = <T>(data: T): Promise<T> =>
  new Promise((res) => setTimeout(() => res(data), 200 + Math.random() * 800))

const s24Init = {
  headers: {
    accept: 'application/json, text/javascript, */*; q=0.01',
    referer:
      'https://fns.stockholm.se/ng/timetable/timetable-viewer/fns.stockholm.se/',
    'accept-language': 'en-US,en;q=0.9,sv;q=0.8',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    pragma: 'no-cache',
    host: 'fns.stockholm.se',
    'x-scope': '8a22163c-8662-4535-9050-bc5e1923df48',
  },
}

interface SSOSystems {
  [name: string]: boolean | undefined
}

export class ApiSkolplattformen extends EventEmitter implements Api {
  private fetch: Fetcher

  private personalNumber?: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private headers: any

  private cookieManager: CookieManager

  public isLoggedIn = false

  public isFake = false

  private authorizedSystems: SSOSystems = {}

  constructor(
    fetch: Fetch, // typeof global.fetch,
    cookieManager: CookieManager,
    options?: FetcherOptions
  ) {
    super()
    this.fetch = wrap(fetch, options)
    this.cookieManager = cookieManager
    this.headers = {}
  }

  public getPersonalNumber(): string | undefined {
    return this.personalNumber
  }

  private getRequestInit(options: RequestInit = {}): RequestInit {
    return {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
      },
    }
  }

  public async getSessionHeaders(
    url: string
  ): Promise<{ [index: string]: string }> {
    const init = this.getRequestInit()
    const cookie = await this.cookieManager.getCookieString(url)
    return {
      ...init.headers,
      cookie,
    }
  }

  public async getSession(
    url: string,
    options?: RequestInit
  ): Promise<RequestInit> {
    const init = this.getRequestInit(options)
    const cookie = await this.cookieManager.getCookieString(url)
    return {
      ...init,
      headers: {
        ...init.headers,
        cookie,
      },
    }
  }

  private async clearSession(): Promise<void> {
    this.headers = {}
    await this.cookieManager.clearAll()
  }

  private addHeader(name: string, value: string): void {
    this.headers[name] = value
  }

  public async login(personalNumber?: string): Promise<LoginStatusChecker> {
    if (personalNumber !== undefined && personalNumber.endsWith('1212121212'))
      return this.fakeMode()

    this.isFake = false

    const ticketUrl = routes.login(personalNumber)
    const ticketResponse = await this.fetch('auth-ticket', ticketUrl)

    if (!ticketResponse.ok) {
      throw new Error(
        `Server Error [${ticketResponse.status}] [${ticketResponse.statusText}] [${ticketUrl}]`
      )
    }

    const ticket: AuthTicket = await ticketResponse.json()

    // login was initiated - store personal number
    this.personalNumber = personalNumber

    const status = checkStatus(this.fetch, ticket)
    status.on('OK', async () => {
      await this.retrieveSessionCookie()

      const [user] = await Promise.all([
        this.getUser(),
        this.retrieveXsrfToken(),
      ])
      this.personalNumber = user.personalNumber

      this.isLoggedIn = true
      this.emit('login')
    })
    status.on('ERROR', () => {
      this.personalNumber = undefined
    })

    return status
  }

  public async loginFreja(): Promise<FrejaLoginStatusChecker> {
    await this.clearSession()

    const loginUrl = routes.frejaLogin
    const loginResponse = await this.fetch('auth-ticket', loginUrl)

    // if (!ticketResponse.ok) {
    //   throw new Error(
    //     `Server Error [${ticketResponse.status}] [${ticketResponse.statusText}] [${ticketUrl}]`
    //   )
    // }

    const appSwitchUrl: string = await loginResponse.text()
    const cleanAppSwitchUrl = this.cleanFrejaAppSwitchUrl(appSwitchUrl)

    console.log('getting freja login url: ' + cleanAppSwitchUrl)

    const checkStatusSession = await this.getSession(loginUrl, {
      redirect: 'manual',
    })

    const status = checkFrejaStatus(
      this.fetch,
      cleanAppSwitchUrl,
      checkStatusSession
    )
    status.on('APPROVED', async () => {
      await this.retrieveFrejaSessionCookie()
      const [user] = await Promise.all([
        this.getUser(),
        this.retrieveXsrfToken(),
      ])
      this.personalNumber = user.personalNumber

      this.isLoggedIn = true
      this.emit('login')
    })

    return status
  }

  private cleanFrejaAppSwitchUrl(url: string): string {
    const parts = url.split('&')
    return parts[0]
  }

  public async setSessionCookie(sessionCookie: string): Promise<void> {
    // Manually set cookie in this call and let the cookieManager
    // handle it from here
    // If we put it into the cookieManager manually, we get duplicate cookies
    const url = routes.loginCookie
    await this.fetch('login-cookie', url, {
      headers: {
        cookie: sessionCookie,
      },
      redirect: 'manual', // Important! Turn off redirect following. We can get into a redirect loop without this.
    })

    const user = await this.getUser()
    if (!user.isAuthenticated) {
      throw new Error('Session cookie is expired')
    }

    await this.retrieveXsrfToken()

    this.isLoggedIn = true
    this.emit('login')
  }

  private async retrieveSessionCookie(): Promise<void> {
    const url = routes.loginCookie
    await this.fetch('login-cookie', url)
  }

  private async retrieveFrejaSessionCookie(): Promise<void> {
    try {
      const url = routes.frejaReturnUrl
      await this.fetch('freja-login-return-url', url)
    } catch (error) {
      console.log(JSON.stringify(error))
    }

    try {
      const url2 = routes.frejaLoginCookie
      await this.fetch('freja-login-cookie', url2)
    } catch (error2) {
      console.log(JSON.stringify(error2))
    }
  }

  private async retrieveXsrfToken(): Promise<void> {
    const url = routes.hemPage
    const session = this.getRequestInit()
    const response = await this.fetch('hemPage', url, session)
    const text = await response.text()
    const doc = html.parse(decode(text))
    const xsrfToken =
      doc
        .querySelector('input[name="__RequestVerificationToken"]')
        ?.getAttribute('value') || ''

    this.addHeader('x-xsrf-token', xsrfToken)
  }

  private async fakeMode(): Promise<LoginStatusChecker> {
    this.isFake = true

    setTimeout(() => {
      this.isLoggedIn = true
      this.emit('login')
    }, 50)

    const emitter = new DummyStatusChecker()
    emitter.token = 'fake'
    return emitter
  }

  public async getUser(): Promise<User> {
    if (this.isFake) return fakeResponse(fake.user())

    const url = routes.user
    const session = this.getRequestInit()
    const response = await this.fetch('user', url, session)
    const data = await response.json()
    return parse.user(data)
  }

  public async getChildren(): Promise<EtjanstChild[]> {
    if (this.isFake) return fakeResponse(fake.children())

    const url = routes.children
    const session = this.getRequestInit({
      headers: {
        Accept: 'application/json;odata=verbose',
        Host: 'etjanst.stockholm.se',
        Referer: 'https://etjanst.stockholm.se/vardnadshavare/inloggad2/hem',
      },
    })
    const response = await this.fetch('children', url, session)

    if (!response.ok) {
      throw new Error(
        `Server Error [${response.status}] [${response.statusText}] [${url}]`
      )
    }

    const data = await response.json()

    const parsed = parse.children(data)
    const useSpecialQueueModeForFSChildren = parsed.some((c) =>
      (c.status || '').includes('FS')
    )

    if (useSpecialQueueModeForFSChildren) {
      this.fetch = queueFetcherWrapper(this.fetch, (childId) =>
        this.selectChildById(childId)
      )
    }

    return parsed
  }

  public async getCalendar(child: EtjanstChild): Promise<CalendarItem[]> {
    if (this.isFake) return fakeResponse(fake.calendar(child))

    const url = routes.calendar(child.id)
    const session = this.getRequestInit()
    const response = await this.fetch('calendar', url, session, child.id)
    const data = await response.json()
    return parse.calendar(data)
  }

  public async getClassmates(child: EtjanstChild): Promise<Classmate[]> {
    if (this.isFake) return fakeResponse(fake.classmates(child))

    const url = routes.classmates(child.sdsId)
    const session = this.getRequestInit()
    const response = await this.fetch('classmates', url, session)
    const data = await response.json()
    return parse.classmates(data)
  }

  public async getTeachers(child: EtjanstChild): Promise<Teacher[]> {
    if (this.isFake) return fakeResponse(fake.teachers(child))

    const session = this.getRequestInit()

    const schoolForms = (child.status || '').split(';')
    let teachers: Teacher[] = []

    for (let i = 0; i < schoolForms.length; i += 1) {
      const url = routes.teachers(child.sdsId, schoolForms[i])

      const response = await this.fetch(
        `teachers_${schoolForms[i]}`,
        url,
        session
      )

      const data = await response.json()
      teachers = [...teachers, ...parse.teachers(data)]
    }

    return teachers
  }

  public async getSchoolContacts(
    child: EtjanstChild
  ): Promise<SchoolContact[]> {
    if (this.isFake) return fakeResponse(fake.schoolContacts(child))

    const url = routes.schoolContacts(child.sdsId, child.schoolId || '')
    const session = this.getRequestInit()
    const response = await this.fetch('schoolContacts', url, session)
    const data = await response.json()
    return parse.schoolContacts(data)
  }

  public async getSchedule(
    child: EtjanstChild,
    from: DateTime,
    to: DateTime
  ): Promise<ScheduleItem[]> {
    if (this.isFake) return fakeResponse(fake.schedule(child))

    const url = routes.schedule(child.id, from.toISODate(), to.toISODate())
    const session = this.getRequestInit()
    const response = await this.fetch('schedule', url, session)
    const data = await response.json()
    return parse.schedule(data)
  }

  public async getNews(child: EtjanstChild): Promise<NewsItem[]> {
    if (this.isFake) return fakeResponse(fake.news(child))

    const url = routes.news(child.id)
    const session = this.getRequestInit()
    const response = await this.fetch('news', url, session, child.id)

    this.CheckResponseForCorrectChildStatus(response, child)

    const data = await response.json()
    return parse.news(data)
  }

  private CheckResponseForCorrectChildStatus(
    response: Response,
    child: EtjanstChild
  ) {
    const setCookieResp = response.headers.get('Set-Cookie')

    if (
      child.status !== 'FS' &&
      setCookieResp &&
      setCookieResp.includes('Status=FS')
    ) {
      throw new Error('Wrong child in response')
    }
  }

  public async getNewsDetails(
    child: EtjanstChild,
    item: NewsItem
  ): Promise<NewsItem | undefined> {
    if (this.isFake) {
      return fakeResponse(
        fake.news(child).find((ni) => ni.id === item.id) || {
          id: '',
          published: '',
        }
      )
    }
    const url = routes.newsDetails(child.id, item.id)
    const session = this.getRequestInit()
    const response = await this.fetch(`news_${item.id}`, url, session, child.id)

    this.CheckResponseForCorrectChildStatus(response, child)

    const data = await response.json()
    return parse.newsItemDetails(data)
  }

  public async getMenu(child: EtjanstChild): Promise<MenuItem[]> {
    if (this.isFake) return fakeResponse(fake.menu(child).map(parse.menuItem))

    const menuService = await this.getMenuChoice(child)
    if (menuService === 'rss') {
      const url = routes.menuRss(child.id)
      const session = this.getRequestInit()
      const response = await this.fetch('menu-rss', url, session, child.id)

      this.CheckResponseForCorrectChildStatus(response, child)

      const data = await response.json()
      return parse.menu(data)
    }

    const url = routes.menuList(child.id)
    const session = this.getRequestInit()
    const response = await this.fetch('menu-list', url, session, child.id)

    this.CheckResponseForCorrectChildStatus(response, child)

    const data = await response.json()
    return parse.menuList(data)
  }

  private async getMenuChoice(child: EtjanstChild): Promise<string> {
    const url = routes.menuChoice(child.id)
    const session = this.getRequestInit()
    const response = await this.fetch('menu-choice', url, session, child.id)

    this.CheckResponseForCorrectChildStatus(response, child)

    const data = await response.json()
    const etjanstResponse = parse.etjanst(data)
    return etjanstResponse
  }

  public async getNotifications(child: EtjanstChild): Promise<Notification[]> {
    if (this.isFake) return fakeResponse(fake.notifications(child))

    const url = routes.notifications(child.sdsId)
    const session = this.getRequestInit()
    const response = await this.fetch('notifications', url, session)
    const data = await response.json()
    return parse.notifications(data)
  }

  private async readSAMLRequest(targetSystem: string): Promise<string> {
    const url = routes.ssoRequestUrl(targetSystem)
    const session = this.getRequestInit({
      redirect: 'follow',
    })
    const response = await this.fetch('samlRequest', url, session)
    const text = await response.text()
    const samlRequest = /name="SAMLRequest" value="(\S+)">/gm.exec(
      text || ''
    )?.[1]
    if (!samlRequest) {
      throw new Error('Could not parse SAML Request')
    } else {
      return samlRequest
    }
  }

  private async submitSAMLRequest(samlRequest: string): Promise<string> {
    const body = new URLSearchParams({ SAMLRequest: samlRequest }).toString()
    const url = routes.ssoResponseUrl
    const session = this.getRequestInit({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      redirect: 'follow',
      method: 'POST',
      body,
    })
    const response = await this.fetch('samlResponse', url, session)
    const text = await response.text()
    const samlResponse = /name="SAMLResponse" value="(\S+)">/gm.exec(text)?.[1]
    if (!samlResponse) {
      throw new Error('Could not parse SAML Response')
    } else {
      return samlResponse
    }
  }

  private async ssoAuthorize(targetSystem: SSOSystem): Promise<string> {
    if (this.authorizedSystems[targetSystem]) {
      return ''
    }
    const samlRequest = await this.readSAMLRequest(targetSystem)
    const samlResponse = await this.submitSAMLRequest(samlRequest)

    const body = new URLSearchParams({ SAMLResponse: samlResponse }).toString()
    const url = routes.samlResponseUrl
    const session = this.getRequestInit({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      redirect: 'follow',
      method: 'POST',
      body,
    })
    const response = await this.fetch('samlAuthorize', url, session)
    const text = await response.text()
    this.authorizedSystems[targetSystem] = true
    return text
  }

  public async getSkola24Children(): Promise<Skola24Child[]> {
    if (this.isFake) return fakeResponse(fake.skola24Children())

    await this.ssoAuthorize('TimetableViewer')
    const body = {
      getPersonalTimetablesRequest: {
        hostName: 'fns.stockholm.se',
      },
    }
    const session = this.getRequestInit({
      ...s24Init,
      body: JSON.stringify(body),
      method: 'POST',
    })

    const url = routes.timetables
    const response = await this.fetch('s24children', url, session)
    const {
      data: {
        getPersonalTimetablesResponse: { childrenTimetables },
      },
    } = await response.json()

    return childrenTimetables as Skola24Child[]
  }

  private async getRenderKey(): Promise<string> {
    const url = routes.renderKey
    const session = this.getRequestInit(s24Init)
    const response = await this.fetch('renderKey', url, session)
    const {
      data: { key },
    } = await response.json()
    return key as string
  }

  public async getTimetable(
    child: Skola24Child,
    week: number,
    year: number,
    lang: Language
  ): Promise<TimetableEntry[]> {
    if (this.isFake) return fakeResponse(fake.timetable(child))

    if (!child.timetableID) {
      return new Array<TimetableEntry>()
    }

    const url = routes.timetable
    const renderKey = await this.getRenderKey()
    const params = {
      blackAndWhite: false,
      customerKey: '',
      endDate: null,
      height: 1063,
      host: 'fns.stockholm.se',
      periodText: '',
      privateFreeTextMode: null,
      privateSelectionMode: true,
      renderKey,
      scheduleDay: 0,
      selection: child.personGuid,
      selectionType: 5,
      showHeader: false,
      startDate: null,
      unitGuid: child.unitGuid,
      week,
      width: 1227,
      year,
    }
    const session = this.getRequestInit({
      ...s24Init,
      method: 'POST',
      body: JSON.stringify(params),
    })
    const response = await this.fetch(
      `timetable_${child.personGuid}_${year}_${week}`,
      url,
      session
    )
    const json = await response.json()

    return parse.timetable(json, year, week, lang)
  }

  public async selectChild(child: EtjanstChild): Promise<EtjanstChild> {
    const response = await this.selectChildById(child.id)

    const data = await response.json()
    return parse.child(parse.etjanst(data))
  }

  private async selectChildById(childId: string) {
    const requestInit = this.getRequestInit({
      method: 'POST',
      headers: {
        host: 'etjanst.stockholm.se',
        accept: 'application/json, text/plain, */*',
        'accept-Encoding': 'gzip, deflate',
        'content-Type': 'application/json;charset=UTF-8',
        origin: 'https://etjanst.stockholm.se',
        referer: 'https://etjanst.stockholm.se/vardnadshavare/inloggad2/hem',
      },
      body: JSON.stringify({
        id: childId,
      }),
    })

    const response = await this.fetch(
      'selectChild',
      routes.selectChild,
      requestInit
    )
    return response
  }

  public async logout() {
    this.isFake = false
    this.personalNumber = undefined
    this.isLoggedIn = false
    this.authorizedSystems = {}
    this.emit('logout')
    await this.clearSession()
  }
}
