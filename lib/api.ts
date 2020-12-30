import { Moment } from 'moment'
import { EventEmitter } from 'events'
import {
  checkStatus, LoginStatusChecker,
} from './loginStatus'
import {
  AsyncishFunction,
  AuthTicket,
  CalendarItem,
  Child,
  Classmate,
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

export class Api extends EventEmitter {
  private fetch: Fetcher

  private session?: RequestInit

  private clearCookies: AsyncishFunction

  public isLoggedIn: boolean = false

  constructor(fetch: Fetch, clearCookies: AsyncishFunction, options?: FetcherOptions) {
    super()
    this.fetch = wrap(fetch, options)
    this.clearCookies = clearCookies
  }

  getSessionCookie() {
    return this.session?.headers?.Cookie
  }

  setSessionCookie(cookie: string) {
    this.session = {
      headers: {
        Cookie: cookie,
      },
    }

    this.isLoggedIn = true
    this.emit('login')
  }

  async login(personalNumber: string): Promise<LoginStatusChecker> {
    const ticketUrl = routes.login(personalNumber)
    const ticketResponse = await this.fetch('auth-ticket', ticketUrl)
    const ticket: AuthTicket = await ticketResponse.json()

    const status = checkStatus(this.fetch, ticket)
    status.on('OK', async () => {
      const cookieUrl = routes.loginCookie
      const cookieResponse = await this.fetch('login-cookie', cookieUrl)
      const cookie = cookieResponse.headers.get('set-cookie') || ''
      this.setSessionCookie(cookie)
    })

    return status
  }

  async getUser(): Promise<User> {
    const url = routes.user
    const response = await this.fetch('user', url, this.session)
    const data = await response.json()
    return parse.user(data)
  }

  async getChildren(): Promise<Child[]> {
    const url = routes.children
    const response = await this.fetch('children', url, this.session)
    const data = await response.json()
    return parse.children(data)
  }

  async getCalendar(child: Child): Promise<CalendarItem[]> {
    const url = routes.calendar(child.id)
    const response = await this.fetch('calendar', url, this.session)
    const data = await response.json()
    return parse.calendar(data)
  }

  async getClassmates(child: Child): Promise<Classmate[]> {
    const url = routes.classmates(child.sdsId)
    const response = await this.fetch('classmates', url, this.session)
    const data = await response.json()
    return parse.classmates(data)
  }

  async getSchedule(child: Child, from: Moment, to: Moment): Promise<ScheduleItem[]> {
    const url = routes.schedule(child.sdsId, from.format('YYYY-MM-DD'), to.format('YYYY-MM-DD'))
    const response = await this.fetch('schedule', url, this.session)
    const data = await response.json()
    return parse.schedule(data)
  }

  async getNews(child: Child): Promise<NewsItem[]> {
    const url = routes.news(child.id)
    const response = await this.fetch('news', url, this.session)
    const data = await response.json()
    return parse.news(data)
  }

  async getMenu(child: Child): Promise<MenuItem[]> {
    const url = routes.menu(child.id)
    const response = await this.fetch('menu', url, this.session)
    const data = await response.json()
    return parse.menu(data)
  }

  async getNotifications(child: Child): Promise<Notification[]> {
    const url = routes.notifications(child.sdsId)
    const response = await this.fetch('notifications', url, this.session)
    const data = await response.json()
    return parse.notifications(data)
  }

  async getImage(imageUrl: string): Promise<Blob> {
    const response = await this.fetch('image', imageUrl, this.session)
    const data = await response.blob()
    return data
  }

  async logout() {
    this.session = undefined
    await this.clearCookies()
    this.isLoggedIn = false
    this.emit('logout')
  }
}
