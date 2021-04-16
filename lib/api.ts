import { DateTime } from 'luxon'
import { EventEmitter } from 'events'
import { decode } from 'he'
import * as html from 'node-html-parser'
import { URLSearchParams } from './URLSearchParams'
import { checkStatus, LoginStatusChecker } from './loginStatus'
import {
  AuthTicket,
  CalendarItem,
  Classmate,
  CookieManager,
  Fetch,
  MenuItem,
  NewsItem,
  Notification,
  RequestInit,
  ScheduleItem,
  User,
  Skola24Child,
  EtjanstChild,
  SSOSystem,
} from './types'
import * as routes from './routes'
import * as parse from './parse/index'
import wrap, { Fetcher, FetcherOptions } from './fetcher'
import * as fake from './fakeData'

const fakeResponse = <T>(data: T): Promise<T> =>
  new Promise((res) => setTimeout(() => res(data), 200 + Math.random() * 800))

const s24Init = {
  headers: {
    accept: 'application/json, text/javascript, */*; q=0.01',
    referer: 'https://fns.stockholm.se/ng/timetable/timetable-viewer/fns.stockholm.se/',
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

export class Api extends EventEmitter {
  private fetch: Fetcher

  private personalNumber?: string

  private headers: any

  private cookieManager: CookieManager

  public isLoggedIn: boolean = false

  public isFake: boolean = false

  public childControllerUrl?: string

  private authorizedSystems: SSOSystems = {}

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

  public async login(personalNumber: string): Promise<LoginStatusChecker> {
    if (personalNumber.endsWith('1212121212')) return this.fakeMode()

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
      await this.retrieveXsrfToken()
      await this.retrieveApiKey()

      this.isLoggedIn = true
      this.emit('login')
    })
    status.on('ERROR', () => {
      this.personalNumber = undefined
    })

    return status
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
    await this.retrieveApiKey()

    this.isLoggedIn = true
    this.emit('login')
  }

  private async retrieveSessionCookie(): Promise<void> {
    const url = routes.loginCookie
    await this.fetch('login-cookie', url)
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
    const scriptTags = doc.querySelectorAll('script')
    const childControllerScriptTag = scriptTags.find((elem) => {
      const srcAttr = elem.getAttribute('src')
      return srcAttr?.startsWith('/vardnadshavare/bundles/childcontroller')
    })
    this.childControllerUrl =
      routes.baseEtjanst + childControllerScriptTag?.getAttribute('src')
    this.addHeader('x-xsrf-token', xsrfToken)
  }

  private async retrieveApiKey(): Promise<void> {
    const url = routes.childcontrollerScript
    const session = this.getRequestInit()
    const response = await this.fetch('startBundle', url, session)
    const text = await response.text()

    const apiKeyRegex = /"API-Key": "([\w\d]+)"/gm
    const apiKeyMatches = apiKeyRegex.exec(text)
    const apiKey =
      apiKeyMatches && apiKeyMatches.length > 1 ? apiKeyMatches[1] : ''

    this.addHeader('API-Key', apiKey)
  }

  private async retrieveCdnUrl(): Promise<string> {
    const url = routes.cdn
    const session = this.getRequestInit()
    const response = await this.fetch('cdn', url, session)
    const cdnUrl = await response.text()
    return cdnUrl
  }

  private async retrieveAuthBody(): Promise<string> {
    const url = routes.auth
    const session = this.getRequestInit()
    const response = await this.fetch('auth', url, session)
    const authBody = await response.text()
    return authBody
  }

  private async retrieveCreateItemHeaders() {
    const response = await this.fetch(
      'createItemConfig',
      routes.createItemConfig
    )
    const json = await response.json()
    return json
  }

  private async retrieveAuthToken(
    url: string,
    authBody: string
  ): Promise<string> {
    const session = this.getRequestInit({
      method: 'POST',
      headers: {
        Accept: 'text/plain',
        Origin: 'https://etjanst.stockholm.se',
        Referer: 'https://etjanst.stockholm.se/',
        Connection: 'keep-alive',
      },
      body: authBody,
    })
    delete session.headers['API-Key']

    // Temporarily remove cookies
    const cookies = await this.cookieManager.getCookies(url)
    this.cookieManager.clearAll()

    // Perform request
    let scriptUrl = this.childControllerUrl
    if (!scriptUrl) {
      scriptUrl = routes.childcontrollerScript
    }
    const createItemHeaders = await this.retrieveCreateItemHeaders()
    const response = await this.fetch('createItem', url, {
      method: 'POST',
      ...createItemHeaders,
      body: authBody,
    })
    // Restore cookies
    cookies.forEach((cookie) => {
      this.cookieManager.setCookie(cookie, url)
    })

    if (!response.ok) {
      throw new Error(
        `Server Error [${response.status}] [${response.statusText}] [${url}]`
      )
    }

    const authData = await response.json()
    return authData.token
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

    const cdnUrl = await this.retrieveCdnUrl()
    const authBody = await this.retrieveAuthBody()
    const token = await this.retrieveAuthToken(cdnUrl, authBody)

    const url = routes.children
    const session = this.getRequestInit({
      headers: {
        Accept: 'application/json;odata=verbose',
        Auth: token,
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
    return parse.children(data)
  }

  public async getCalendar(child: EtjanstChild): Promise<CalendarItem[]> {
    if (this.isFake) return fakeResponse(fake.calendar(child))

    const url = routes.calendar(child.id)
    const session = this.getRequestInit()
    const response = await this.fetch('calendar', url, session)
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

  public async getSchedule(
    child: EtjanstChild,
    from: DateTime,
    to: DateTime
  ): Promise<ScheduleItem[]> {
    if (this.isFake) return fakeResponse(fake.schedule(child))

    const url = routes.schedule(child.sdsId, from.toISODate(), to.toISODate())
    const session = this.getRequestInit()
    const response = await this.fetch('schedule', url, session)
    const data = await response.json()
    return parse.schedule(data)
  }

  public async getNews(child: EtjanstChild): Promise<NewsItem[]> {
    if (this.isFake) return fakeResponse(fake.news(child))

    const url = routes.news(child.id)
    const session = this.getRequestInit()
    const response = await this.fetch('news', url, session)
    const data = await response.json()
    return parse.news(data)
  }

  public async getNewsDetails(child: EtjanstChild, item: NewsItem): Promise<any> {
    if (this.isFake) {
      return fakeResponse(fake.news(child).find((ni) => ni.id === item.id))
    }
    const url = routes.newsDetails(child.id, item.id)
    const session = this.getRequestInit()
    const response = await this.fetch(`news_${item.id}`, url, session)
    const data = await response.json()
    return parse.newsItemDetails(data)
  }

  public async getMenu(child: EtjanstChild): Promise<MenuItem[]> {
    if (this.isFake) return fakeResponse(fake.menu(child).map(parse.menuItem))

    const menuService = await this.getMenuChoice(child)
    if (menuService === 'rss') {
      const url = routes.menuRss(child.id)
      const session = this.getRequestInit()
      const response = await this.fetch('menu-rss', url, session)
      const data = await response.json()
      return parse.menu(data)
    }

    const url = routes.menuList(child.id)
    const session = this.getRequestInit()
    const response = await this.fetch('menu-list', url, session)
    const data = await response.json()
    return parse.menuList(data)
  }

  private async getMenuChoice(child: EtjanstChild): Promise<string> {
    const url = routes.menuChoice(child.id)
    const session = this.getRequestInit()
    const response = await this.fetch('menu-choice', url, session)
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
    const samlRequest = /name="SAMLRequest" value="(\S+)">/gm.exec(text || '')?.[1]
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
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      redirect: 'follow', 
      method: 'POST',
      body,
    })
    const response = await this.fetch('samlResponse',  url, session)
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

  public async getSkola24Children(): Promise<Skola24Child[]>{
    if (this.isFake) return fakeResponse(fake.skola24Children())

    await this.ssoAuthorize('TimetableViewer')
    const body = { getPersonalTimetablesRequest: {
      hostName: 'fns.stockholm.se'
    }}
    const session = this.getRequestInit({
      ...s24Init,
      body: JSON.stringify(body),
      method: 'POST',
    })

    const url = routes.timetables
    const response = await this.fetch('s24children', url, session)
    const {
      data: {
        getPersonalTimetablesResponse: {
          childrenTimetables
        }
      }
    } = await response.json()

    return childrenTimetables as Skola24Child[]
  }

  private async getRenderKey(): Promise<string> {
    const url = routes.renderKey
    const session = this.getRequestInit(s24Init)
    const response = await this.fetch('renderKey', url, session)
    const { data: { key } } = await response.json()
    return key as string
  }

  public async getTimetable(child: Skola24Child, week: number, year: number): Promise<any> {
    if (this.isFake) return fakeResponse(fake.timetable(child))
    
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
    const response = await this.fetch(`timetable_${child.personGuid}_${year}_${week}`, url, session)
    const json = await response.json()

    return parse.timetable(json, year, week)
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
