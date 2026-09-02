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
import { DummyStatusChecker } from './loginStatusChecker'
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
  private rawFetch: Fetch
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
    this.rawFetch = config.fetch
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

    // Steg 1: Starta Infomentor SSO - följer 302-kedjan till Stockholms BankID-sida
    console.log('Starting Infomentor SSO flow...')
    const ssoUrl = `https://sso.infomentor.se/login.ashx?idp=${this.idp}`
    const loginPageUrl = await this.getBankLoginPageUrl(ssoUrl)
    console.log('BankID login page URL:', loginPageUrl.substring(0, 120))

    // Steg 2: Initiera BankID på inloggningssidan (samma som webben: initialize=bankid)
    const initUrl = `${loginPageUrl}&initialize=bankid&_=${Date.now()}`
    try {
      const ticketResponse = await this.rawFetch(initUrl)
      console.log('BankID init status:', ticketResponse.status)
      if (!ticketResponse.ok) {
        const errorText = await ticketResponse.text()
        console.error('BankID init error body:', errorText.substring(0, 300))
        throw new Error(
          `BankID Error [${ticketResponse.status}] [${ticketResponse.statusText}]`
        )
      }
      const ticket: AuthTicket = await ticketResponse.json()
      console.log('BankID ticket received')

      this.personalNumber = personalNumber || 'unknown'

      // Steg 3: Polla status. Efter OK: hämta SAMLResponse och POSTa till Infomentor
      return this.createStatusChecker(loginPageUrl, ticket)
    } catch (error) {
      console.error('BankID init failed:', error)
      throw error
    }
  }

  private async getBankLoginPageUrl(ssoUrl: string): Promise<string> {
    // Steg A: följ hela SSO-kedjan till metodväljaren (amedborgare.jsp)
    const firstResponse = (await this.rawFetch(ssoUrl, {
      redirect: 'follow',
    })) as any
    let pageUrl: string = firstResponse.url || ssoUrl
    let body = await firstResponse.text()

    // Steg B: metodväljaren har länk till BankID-vägen (NECSadc/mbid/...)
    if (body.includes('NECSadc/mbid')) {
      const doc = html.parse(decode(body))
      const mbidHref = doc
        .querySelector('a[href*="NECSadc/mbid"]')
        ?.getAttribute('href')
      if (mbidHref) {
        const mbidUrl = new URL(mbidHref, pageUrl).toString()
        console.log('Following mbid link:', mbidUrl.substring(0, 100))
        const mbidResponse = (await this.rawFetch(mbidUrl, {
          redirect: 'follow',
        })) as any
        pageUrl = mbidResponse.url || mbidUrl
        body = await mbidResponse.text()
      }
    }

    console.log('BankID page:', pageUrl.substring(0, 120))
    return pageUrl
  }

  private createStatusChecker(
    loginPageUrl: string,
    ticket: AuthTicket
  ): LoginStatusChecker {
    const checker = new EventEmitter() as any
    checker.token = ticket.token
    let cancelled = false

    checker.cancel = () => {
      cancelled = true
    }

    const poll = async () => {
      while (!cancelled) {
        try {
          const statusUrl = `${loginPageUrl}&verifyorder=${ticket.order}&_=${Date.now()}`
          const response = await this.rawFetch(statusUrl)
          const data = await response.json()
          const state = data?.state
          if (state) checker.emit(state)

          if (state === 'OK') {
            try {
              await this.completeSamlFlow(loginPageUrl)
            } catch (error) {
              console.error('SAML completion error:', error)
            }
            this.isLoggedIn = true
            this.emit('login')
            console.log('Login event emitted')
            return
          }
          if (state === 'ERROR' || state === 'CANCELLED') {
            return
          }
        } catch (error) {
          console.error('Status poll error:', error)
          checker.emit('ERROR')
          return
        }
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }
    }
    poll()
    return checker
  }

  private async completeSamlFlow(loginPageUrl: string): Promise<void> {
    // Steg 4: Hämta inloggningssidan igen - nu autentiserad -> SAML auto-POST-formulär
    const response = await this.rawFetch(loginPageUrl, { redirect: 'follow' })
    const body = await response.text()
    const doc = html.parse(decode(body))
    const form = doc.querySelector('form')
    const samlResponseValue = doc
      .querySelector('input[name="SAMLResponse"]')
      ?.getAttribute('value')

    if (!form || !samlResponseValue) {
      throw new Error('No SAMLResponse received')
    }

    // Steg 5: POSTa SAMLResponse till Infomentor för att få sessioncookie
    const action = new URL(form.getAttribute('action') || '', loginPageUrl).toString()
    console.log('Posting SAMLResponse to Infomentor...')
    await this.rawFetch(action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        SAMLResponse: samlResponseValue,
        ...(doc.querySelector('input[name="RelayState"]')
          ? {
              RelayState:
                doc
                  .querySelector('input[name="RelayState"]')
                  ?.getAttribute('value') || '',
            }
          : {}),
      }).toString(),
      redirect: 'follow',
    })
    console.log('Infomentor session established')
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

    // OBS: Fetcher-signaturen är (cacheKey, url, init)
    const response = await this.fetch(endpoint, url, init as any)

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
    console.log('getChildren called')
    try {
      console.log('Fetching appData...')
      const data = await this.post<any>('/timetable/timetable/appData')
      console.log('appData response status: OK')

      // Om vi kan hämta schema är vi inloggade - skapa en placeholder child
      const defaultChild: EtjanstChild = {
        id: 'default',
        sdsId: 'default',
        name: 'Mitt barn',
        schoolId: 'infomentor',
        status: 'GR',
      }
      console.log('Returning default child:', defaultChild)

      return [defaultChild]
    } catch (error) {
      console.error('Error fetching children:', error)
      // Returnera en placeholder även vid fel så att appen inte kraschar
      const defaultChild: EtjanstChild = {
        id: 'default',
        sdsId: 'default',
        name: 'Mitt barn',
        schoolId: 'infomentor',
        status: 'GR',
      }
      console.log('Returning default child (after error):', defaultChild)
      return [defaultChild]
    }
  }

  async getCalendar(child: EtjanstChild): Promise<CalendarItem[]> {
    try {
      // Infomentor använder inte pupilId - hämta alla entries för inloggad användare
      const data = await this.post<any>('/calendarv2/calendarv2/getentries', {})

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
      // Infomentor använder inte pupilId - hämta alla nyheter för inloggad användare
      const data = await this.post<any>('/Communication/News/GetNewsList', {})

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
      // Infomentor använder inte pupilId - hämta alla notiser för inloggad användare
      const data = await this.post<any>(
        '/NotificationApp/NotificationApp/GetNotifications',
        {}
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
      // Infomentor använder inte pupilId - hämta schema för inloggad användare
      const data = await this.post<any>('/timetable/timetable/appData', {
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
