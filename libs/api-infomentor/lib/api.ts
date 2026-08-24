import { EventEmitter } from 'events'
import {
  Api,
  CalendarItem,
  EtjanstChild,
  NewsItem,
  Notification,
  ScheduleItem,
  User,
  Fetch,
  Fetcher,
  FetcherOptions,
  CookieManager,
  wrap,
  Classmate,
  Teacher,
  SchoolContact,
  MenuItem,
  RequestInit,
  LoginStatusChecker,
  AuthTicket,
} from '@skolplattformen/api'
import { DateTime } from 'luxon'
import * as html from 'node-html-parser'
import { decode } from 'he'
import { checkStatus, DummyStatusChecker } from './loginStatusChecker'
import * as routes from './routes'

export interface InfomentorConfig {
  fetch: Fetch
  cookieManager: CookieManager
  options?: FetcherOptions
  baseUrl?: string
  idp?: string // t.ex. 'stockholm_par'
}

interface InfomentorChild {
  id: string
  name: string
  firstName: string
  lastName: string
  schoolId?: string
  className?: string
}

interface InfomentorCalendarEntry {
  id: string
  title: string
  description?: string
  location?: string
  startDate: string
  endDate: string
  allDay: boolean
}

interface InfomentorNewsItem {
  id: string
  title: string
  intro?: string
  body?: string
  author?: string
  publishedDate: string
  modifiedDate?: string
  imageUrl?: string
  fullImageUrl?: string
  imageAltText?: string
}

interface InfomentorNotification {
  id: string
  sender: string
  dateCreated: string
  dateModified: string
  message: string
  url: string
  category?: string
  type: string
}

export class ApiInfomentor extends EventEmitter implements Api {
  private fetch: Fetcher
  private cookieManager: CookieManager
  private baseUrl: string
  private idp: string
  private personalNumber?: string
  private headers: any
  private children: InfomentorChild[] = []

  public isLoggedIn = false
  public isFake = false

  constructor(config: InfomentorConfig) {
    super()
    this.fetch = wrap(config.fetch, config.options)
    this.cookieManager = config.cookieManager
    this.baseUrl = config.baseUrl || 'https://hub.infomentor.se'
    this.idp = config.idp || 'stockholm_par'
    this.headers = {}
  }

  getPersonalNumber(): string | undefined {
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

  private addHeader(name: string, value: string): void {
    this.headers[name] = value
  }

  async login(personalNumber?: string): Promise<LoginStatusChecker> {
    if (personalNumber !== undefined && personalNumber.endsWith('1212121212'))
      return this.fakeMode()

    this.isFake = false

    // Starta SAML-flödet via Infomentor SSO
    const ssoUrl = routes.ssoLogin(this.idp)
    const ssoResponse = await this.fetch('sso-init', ssoUrl, {
      redirect: 'manual',
    })

    if (!ssoResponse.ok && ssoResponse.status !== 302) {
      throw new Error(
        `SSO Error [${ssoResponse.status}] [${ssoResponse.statusText}]`
      )
    }

    // Följ redirect till SAML IdP (login001.stockholm.se)
    const samlUrl = ssoResponse.headers.get('Location') || ''
    if (!samlUrl) {
      throw new Error('No SAML redirect URL found')
    }

    const samlResponse = await this.fetch('saml-request', samlUrl, {
      redirect: 'manual',
    })

    // Extrahera SAMLRequest från HTML-formulär
    const samlHtml = await samlResponse.text()
    const doc = html.parse(decode(samlHtml))
    const samlRequest = doc
      .querySelector('input[name="SAMLRequest"]')
      ?.getAttribute('value')

    if (!samlRequest) {
      throw new Error('Could not parse SAML Request')
    }

    // Skicka SAMLRequest till IdP och starta BankID
    const idpUrl = samlResponse.headers.get('Location') || samlUrl
    const bankIdInitUrl = `${idpUrl}&initialize=bankid${
      personalNumber ? `&personalNumber=${personalNumber}` : ''
    }&_=${Date.now()}`

    const ticketResponse = await this.fetch('auth-ticket', bankIdInitUrl)

    if (!ticketResponse.ok) {
      throw new Error(
        `BankID Error [${ticketResponse.status}] [${ticketResponse.statusText}]`
      )
    }

    const ticket: AuthTicket = await ticketResponse.json()

    this.personalNumber = personalNumber

    const status = checkStatus(this.fetch, ticket)
    status.on('OK', async () => {
      await this.retrieveSessionCookie()

      const user = await this.getUser()
      this.personalNumber = user.personalNumber

      this.isLoggedIn = true
      this.emit('login')
    })
    status.on('ERROR', () => {
      this.personalNumber = undefined
    })

    return status
  }

  private async retrieveSessionCookie(): Promise<void> {
    // Hämta Infomentor session cookie via SAML response
    const url = routes.samlResponseUrl
    await this.fetch('saml-response', url, {
      redirect: 'manual',
    })
  }

  async loginFreja(): Promise<any> {
    throw new Error('Freja login not implemented for Infomentor')
  }

  async setSessionCookie(sessionCookie: string): Promise<void> {
    await this.cookieManager.setCookieString(sessionCookie, this.baseUrl)
    this.isLoggedIn = true
    this.emit('login')
  }

  async getSessionHeaders(url: string): Promise<{ [index: string]: string }> {
    const cookies = await this.cookieManager.getCookieString(url)
    return {
      Cookie: cookies,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'X-Requested-With': 'XMLHttpRequest',
    }
  }

  private async post<T>(endpoint: string, body?: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = await this.getSessionHeaders(url)

    const init: RequestInit = {
      method: 'POST',
      headers,
    }

    if (body) {
      init.body = JSON.stringify(body)
    }

    const response = await this.fetch(url, init as any)

    if (!response.ok) {
      throw new Error(
        `Infomentor API error: ${response.status} ${response.statusText}`
      )
    }

    return response.json()
  }

  async getUser(): Promise<User> {
    return {
      personalNumber: this.personalNumber,
      isAuthenticated: this.isLoggedIn,
    }
  }

  async getChildren(): Promise<EtjanstChild[]> {
    try {
      const data = await this.post<any>('/timetable/timetable/appData')

      if (data.children && Array.isArray(data.children)) {
        this.children = data.children.map((child: any) => ({
          id: child.id || child.pupilId,
          name: `${child.firstName} ${child.lastName}`,
          firstName: child.firstName,
          lastName: child.lastName,
          schoolId: child.schoolId,
          className: child.className,
        }))
      }

      return this.children.map((child) => ({
        id: child.id,
        sdsId: child.id,
        name: child.name,
        schoolId: child.schoolId,
        status: 'GR',
      }))
    } catch (error) {
      console.error('Error fetching children:', error)
      return []
    }
  }

  async getCalendar(child: EtjanstChild): Promise<CalendarItem[]> {
    try {
      const data = await this.post<any>('/calendarv2/calendarv2/getentries', {
        pupilId: child.id,
      })

      const entries: InfomentorCalendarEntry[] = data.entries || []

      return entries.map((entry) => ({
        id: parseInt(entry.id, 10),
        title: entry.title,
        description: entry.description,
        location: entry.location,
        startDate: entry.startDate,
        endDate: entry.endDate,
        allDay: entry.allDay,
      }))
    } catch (error) {
      console.error('Error fetching calendar:', error)
      return []
    }
  }

  async getClassmates(child: EtjanstChild): Promise<Classmate[]> {
    return []
  }

  async getNews(child: EtjanstChild): Promise<NewsItem[]> {
    try {
      const data = await this.post<any>('/Communication/News/GetNewsList', {
        pupilId: child.id,
      })

      const items: InfomentorNewsItem[] = data.newsItems || data || []

      return items.map((item) => ({
        id: item.id,
        author: item.author,
        header: item.title,
        intro: item.intro,
        body: item.body,
        published: item.publishedDate,
        modified: item.modifiedDate,
        imageUrl: item.imageUrl,
        fullImageUrl: item.fullImageUrl,
        imageAltText: item.imageAltText,
      }))
    } catch (error) {
      console.error('Error fetching news:', error)
      return []
    }
  }

  async getNewsDetails(child: EtjanstChild, item: NewsItem): Promise<any> {
    return item
  }

  async getMenu(child: EtjanstChild): Promise<MenuItem[]> {
    return []
  }

  async getNotifications(child: EtjanstChild): Promise<Notification[]> {
    try {
      const data = await this.post<any>(
        '/NotificationApp/NotificationApp/GetNotifications',
        {
          pupilId: child.id,
        }
      )

      const notifications: InfomentorNotification[] = data.notifications || []

      return notifications.map((notif) => ({
        id: notif.id,
        sender: notif.sender,
        dateCreated: notif.dateCreated,
        dateModified: notif.dateModified,
        message: notif.message,
        url: notif.url,
        category: notif.category || null,
        type: notif.type,
      }))
    } catch (error) {
      console.error('Error fetching notifications:', error)
      return []
    }
  }

  async getTeachers(child: EtjanstChild): Promise<Teacher[]> {
    return []
  }

  async getSchedule(
    child: EtjanstChild,
    from: DateTime,
    to: DateTime
  ): Promise<ScheduleItem[]> {
    try {
      const data = await this.post<any>('/timetable/timetable/appData', {
        pupilId: child.id,
        startDate: from.toISODate(),
        endDate: to.toISODate(),
      })

      const items = data.scheduleItems || data.lessons || []

      return items.map((item: any) => ({
        title: item.title || item.subject,
        description: item.description || item.comment,
        location: item.location || item.room,
        startDate: item.startDate || item.start,
        endDate: item.endDate || item.end,
        oneDayEvent: item.oneDayEvent || false,
        allDayEvent: item.allDayEvent || false,
      }))
    } catch (error) {
      console.error('Error fetching schedule:', error)
      return []
    }
  }

  async getSchoolContacts(child: EtjanstChild): Promise<SchoolContact[]> {
    return []
  }

  async getSkola24Children(): Promise<any[]> {
    return []
  }

  async getTimetable(
    child: any,
    week: number,
    year: number,
    lang: any
  ): Promise<any[]> {
    return []
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

  async logout(): Promise<void> {
    await this.cookieManager.clearAll()
    this.isLoggedIn = false
    this.emit('logout')
  }
}
