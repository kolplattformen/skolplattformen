import { DateTime } from 'luxon'
import { EventEmitter } from 'events'
import { decode } from 'he'
import * as html from 'node-html-parser'
import {
  checkStatus,
  LoginStatusChecker,
} from './loginStatus'
import {
  AuthTicket,
  CalendarItem,
  Child,
  Classmate,
  CookieManager,
  Fetch,
  MenuItem,
  NewsItem,
  Notification,
  RequestInit,
  ScheduleItem,
  User,
} from './types'
import * as routes from './routes'
import * as parse from './parse'
import wrap, { Fetcher, FetcherOptions } from './fetcher'
import * as fake from './fakeData'

const fakeResponse = <T>(data: T): Promise<T> => new Promise((res) => (
  setTimeout(() => res(data), 200 + Math.random() * 800)
))

export class Api extends EventEmitter {
  private fetch: Fetcher

  private personalNumber?: string

  private headers: any

  private cookieManager: CookieManager

  public isLoggedIn: boolean = false

  public isFake: boolean = false

  constructor(fetch: Fetch, cookieManager: CookieManager, options?: FetcherOptions) {
    super()
    this.fetch = wrap(fetch, options)
    this.cookieManager = cookieManager
    this.headers = {}
  }

  getPersonalNumber() {
    return this.personalNumber
  }

  async getSession(url: string, options: RequestInit = {}): Promise<RequestInit> {
    const cookie = await this.cookieManager.getCookieString(url)
    return {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
        cookie,
      },
    }
  }

  async clearSession(): Promise<void> {
    this.headers = {}
    await this.cookieManager.clearAll()
  }

  addHeader(name: string, value: string): void {
    this.headers[name] = value
  }

  async login(personalNumber: string): Promise<LoginStatusChecker> {
    if (personalNumber.endsWith('1212121212')) return this.fakeMode()

    this.isFake = false

    const ticketUrl = routes.login(personalNumber)
    const ticketResponse = await this.fetch('auth-ticket', ticketUrl)

    if (!ticketResponse.ok) {
      throw new Error(`Server Error [${ticketResponse.status}] [${ticketResponse.statusText}] [${ticketUrl}]`)
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
    status.on('ERROR', () => { this.personalNumber = undefined })

    return status
  }

  async retrieveSessionCookie(): Promise<void> {
    const url = routes.loginCookie
    await this.fetch('login-cookie', url)
  }

  async retrieveXsrfToken(): Promise<void> {
    const url = routes.hemPage
    const session = await this.getSession(url)
    const response = await this.fetch('hemPage', url, session)
    const text = await response.text()
    const doc = html.parse(decode(text))
    const xsrfToken = doc.querySelector('input[name="__RequestVerificationToken"]').getAttribute('value') || ''
    this.addHeader('X-XSRF-Token', xsrfToken)
  }

  async retrieveApiKey(): Promise<void> {
    const url = routes.startBundle
    const session = await this.getSession(url)
    const response = await this.fetch('startBundle', url, session)
    const text = await response.text()

    const apiKeyRegex = /"API-Key": "([\w\d]+)"/gm
    const apiKeyMatches = apiKeyRegex.exec(text)
    const apiKey = apiKeyMatches && apiKeyMatches.length > 1 ? apiKeyMatches[1] : ''

    this.addHeader('API-Key', apiKey)
  }

  async retrieveCdnUrl(): Promise<string> {
    const url = routes.cdn
    const session = await this.getSession(url)
    const response = await this.fetch('cdn', url, session)
    const cdnUrl = await response.text()
    return cdnUrl
  }

  async retrieveAuthBody(): Promise<string> {
    const url = routes.auth
    const session = await this.getSession(url)
    const response = await this.fetch('auth', url, session)
    const authBody = await response.text()
    return authBody
  }

  async retrieveAuthToken(url: string, authBody: string): Promise<string> {
    const cdnHost = new URL(url).host
    const session = await this.getSession(url, {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
        Host: cdnHost,
        Origin: 'https://etjanst.stockholm.se',
        Referer: 'https://etjanst.stockholm.se/',
        Connection: 'keep-alive',
      },
      body: authBody,
    })

    // Delete cookies from session and empty cookie manager
    delete session.headers.cookie
    const cookies = await this.cookieManager.getCookies(url)
    this.cookieManager.clearAll()

    // Perform request
    const response = await this.fetch('createItem', url, session)

    // Refill cookie manager
    cookies.forEach((cookie) => {
      this.cookieManager.setCookie(cookie, url)
    })

    if (!response.ok) {
      throw new Error(`Server Error [${response.status}] [${response.statusText}] [${url}]`)
    }

    const authData = await response.json()
    return authData.token
  }

  async fakeMode(): Promise<LoginStatusChecker> {
    this.isFake = true

    setTimeout(() => {
      this.isLoggedIn = true
      this.emit('login')
    }, 50)

    const emitter: any = new EventEmitter()
    emitter.token = 'fake'
    return emitter
  }

  async getUser(): Promise<User> {
    if (this.isFake) return fakeResponse(fake.user())

    const url = routes.user
    const session = await this.getSession(url)
    const response = await this.fetch('user', url, session)
    const data = await response.json()
    return parse.user(data)
  }

  async getChildren(): Promise<Child[]> {
    if (this.isFake) return fakeResponse(fake.children())

    const cdnUrl = await this.retrieveCdnUrl()
    const authBody = await this.retrieveAuthBody()
    const token = await this.retrieveAuthToken(cdnUrl, authBody)

    const url = routes.children
    const session = await this.getSession(url, {
      headers: {
        Accept: 'application/json;odata=verbose',
        Auth: token,
        Host: 'etjanst.stockholm.se',
        Referer: 'https://etjanst.stockholm.se/Vardnadshavare/inloggad2/hem',
      },
    })
    const response = await this.fetch('children', url, session)

    console.log(session.headers)
    console.log('children response', response)
    if (!response.ok) {
      throw new Error(`Server Error [${response.status}] [${response.statusText}] [${url}]`)
    }

    const data = await response.json()
    return parse.children(data)
  }

  async getCalendar(child: Child): Promise<CalendarItem[]> {
    if (this.isFake) return fakeResponse(fake.calendar(child))

    const url = routes.calendar(child.id)
    const session = await this.getSession(url)
    const response = await this.fetch('calendar', url, session)
    const data = await response.json()
    return parse.calendar(data)
  }

  async getClassmates(child: Child): Promise<Classmate[]> {
    if (this.isFake) return fakeResponse(fake.classmates(child))

    const url = routes.classmates(child.sdsId)
    const session = await this.getSession(url)
    const response = await this.fetch('classmates', url, session)
    const data = await response.json()
    return parse.classmates(data)
  }

  async getSchedule(child: Child, from: DateTime, to: DateTime): Promise<ScheduleItem[]> {
    if (this.isFake) return fakeResponse(fake.schedule(child))

    const url = routes.schedule(child.sdsId, from.toISODate(), to.toISODate())
    const session = await this.getSession(url)
    const response = await this.fetch('schedule', url, session)
    const data = await response.json()
    return parse.schedule(data)
  }

  async getNews(child: Child): Promise<NewsItem[]> {
    if (this.isFake) return fakeResponse(fake.news(child))

    const url = routes.news(child.id)
    const session = await this.getSession(url)
    const response = await this.fetch('news', url, session)
    const data = await response.json()
    return parse.news(data)
  }

  async getNewsDetails(child: Child, item: NewsItem): Promise<any> {
    if (this.isFake) {
      return fakeResponse(fake.news(child).find((ni) => ni.id === item.id))
    }
    const url = routes.newsDetails(child.id, item.id)
    const session = await this.getSession(url)
    const response = await this.fetch(`news_${item.id}`, url, session)
    const data = await response.json()
    return parse.newsItemDetails(data)
  }

  async getMenu(child: Child): Promise<MenuItem[]> {
    if (this.isFake) return fakeResponse(fake.menu(child))

    const url = routes.menu(child.id)
    const session = await this.getSession(url)
    const response = await this.fetch('menu', url, session)
    const data = await response.json()
    return parse.menu(data)
  }

  async getNotifications(child: Child): Promise<Notification[]> {
    if (this.isFake) return fakeResponse(fake.notifications(child))

    const url = routes.notifications(child.sdsId)
    const session = await this.getSession(url)
    const response = await this.fetch('notifications', url, session)
    const data = await response.json()
    return parse.notifications(data)
  }

  async logout() {
    this.isFake = false
    this.personalNumber = undefined
    this.isLoggedIn = false
    this.emit('logout')
    await this.clearSession()
  }
}
