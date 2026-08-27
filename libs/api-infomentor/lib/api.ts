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

    // Steg 1: Starta Infomentor SSO-flöde - följ redirects automatiskt
    console.log('Starting Infomentor SSO flow...')
    const ssoUrl = `https://sso.infomentor.se/login.ashx?idp=${this.idp}`
    console.log('SSO URL:', ssoUrl)

    try {
      // Följ redirects - SSO redirectar till Stockholms IdP
      const ssoResponse = await this.fetch('sso-init', ssoUrl, {
        redirect: 'follow',
      })
      console.log('SSO response status:', ssoResponse.status)

      // Nu är vi på Stockholms inloggningssida - extrahera SAMLRequest
      const samlHtml = await ssoResponse.text()
      const doc = html.parse(decode(samlHtml))
      const samlRequest = doc
        .querySelector('input[name="SAMLRequest"]')
        ?.getAttribute('value')

      if (!samlRequest) {
        console.log('No SAMLRequest found in HTML')
        // Kolla om vi redan är på BankID-sidan genom att kolla HTML
        if (samlHtml.includes('bankid') || samlHtml.includes('BankID')) {
          console.log('Already on BankID page, starting BankID...')
          return this.startBankIdLogin(ssoUrl, personalNumber)
        }
        throw new Error('Could not find SAMLRequest or BankID page')
      }

      console.log('SAML Request extracted, starting BankID...')
      return this.startBankIdLogin(ssoUrl, personalNumber)
    } catch (error) {
      console.error('SSO fetch error:', error)
      throw error
    }
  }

  private async startBankIdLogin(baseUrl: string, personalNumber?: string): Promise<LoginStatusChecker> {
    // Starta BankID på Stockholms egen URL (inte Infomentor SSO)
    const stockholmBankIdUrl = 'https://login003.stockholm.se/NECSadcmbid/authenticate/NECSadcmbid?TYPE=33554433&REALMOID=06-42f40edd-0c5b-4dbc-b714-1be1e907f2de&GUID=1&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=IfNE0iMOtzq2TcxFADHylR6rkmFtwzoxRKh5nRMO9NBqIxHrc38jFyt56FASdxk1&TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0ZXIuc3RvY2tob2xtLnNlL3ZhcmRuYWRzaGF2YXJlL2lubG9nZ2FkMi9oZW0%3d'
    const bankIdInitUrl = `${stockholmBankIdUrl}&initialize=bankid${
      personalNumber ? `&personalNumber=${personalNumber}` : ''
    }&_=${Date.now()}`

    console.log('Starting BankID...')
    console.log('BankID URL:', bankIdInitUrl)
    
    const ticketResponse = await this.fetch('auth-ticket', bankIdInitUrl)
    console.log('BankID response status:', ticketResponse.status)
    console.log('BankID response ok:', ticketResponse.ok)

    if (!ticketResponse.ok) {
      const errorText = await ticketResponse.text()
      console.error('BankID error response:', errorText.substring(0, 500))
      throw new Error(
        `BankID Error [${ticketResponse.status}] [${ticketResponse.statusText}]`
      )
    }

    const ticket: AuthTicket = await ticketResponse.json()
    console.log('BankID ticket received, order:', ticket.order?.substring(0, 20))
    this.personalNumber = personalNumber

    const status = checkStatus(this.fetch, ticket)
    status.on('OK', async () => {
      console.log('BankID OK, retrieving session...')
      await this.retrieveSessionCookie()
      console.log('Session retrieved, getting user...')

      // Sätt personalNumber om det inte redan är satt (t.ex. vid BankID utan personnummer)
      if (!this.personalNumber) {
        // Försök hämta från användardata eller sätt ett placeholder
        this.personalNumber = 'unknown'
      }

      const user = await this.getUser()
      console.log('User retrieved:', user.personalNumber)

      this.isLoggedIn = true
      this.emit('login')
      console.log('Login event emitted')
    })
    status.on('ERROR', (err) => {
      console.error('BankID ERROR:', err)
      this.personalNumber = undefined
    })

    return status
  }

  private async completeSamlFlow(samlUrl: string, ticket: AuthTicket): Promise<void> {
    // Steg 5: Hämta SAML Response från Stockholms IdP
    const samlResponseUrl = `${samlUrl}&verifyorder=${ticket.order}&_=${Date.now()}`
    const samlResponse = await this.fetch('saml-response', samlResponseUrl, {
      redirect: 'manual',
    })

    // Steg 6: Extrahera SAMLResponse
    const samlHtml = await samlResponse.text()
    const doc = html.parse(decode(samlHtml))
    const samlResponseValue = doc
      .querySelector('input[name="SAMLResponse"]')
      ?.getAttribute('value')

    if (!samlResponseValue) {
      throw new Error('Could not parse SAML Response')
    }
    console.log('SAML Response extracted')

    // Steg 7: Skicka SAML Response till Infomentor
    const infomentorSamlUrl = 'https://sso.infomentor.se/login.ashx'
    const formData = new URLSearchParams()
    formData.append('SAMLResponse', samlResponseValue)

    const infomentorResponse = await this.fetch('infomentor-saml', infomentorSamlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      redirect: 'follow',
    })

    console.log('Infomentor SAML response status:', infomentorResponse.status)
  }

  private async retrieveSessionCookie(): Promise<void> {
    // Efter BankID OK, hämta Stockholms session cookie
    try {
      console.log('Fetching Stockholm session cookie...')
      const cookieUrl =
        'https://login003.stockholm.se/NECSadcmbid/authenticate/SiteMinderAuthADC?TYPE=33554433&REALMOID=06-42f40edd-0c5b-4dbc-b714-1be1e907f2de&GUID=1&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=IfNE0iMOtzq2TcxFADHylR6rkmFtwzoxRKh5nRMO9NBqIxHrc38jFyt56FASdxk1&TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0ZXIuc3RvY2tob2xtLnNlL3ZhcmRuYWRzaGF2YXJlL2lubG9nZ2FkMi9oZW0%3d'
      const response = await this.fetch('session-cookie', cookieUrl, {
        redirect: 'follow',
      })
      console.log('Session cookie response status:', response.status)
    } catch (error) {
      console.error('Error retrieving session cookie:', error)
      // Fortsätt ändå - vi kan ha cookies redan
    }
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
      console.log('getChildren called, fetching appData...')
      // Infomentor hub returnerar inte barn separat - vi skapar en "default" child
      // baserat på att användaren är inloggad
      const data = await this.post<any>('/timetable/timetable/appData')
      console.log('appData response:', JSON.stringify(data).substring(0, 200))

      // Om vi kan hämta schema är vi inloggade - skapa en placeholder child
      // Infomentor visar all data direkt utan att välja barn
      const defaultChild: EtjanstChild = {
        id: 'default',
        sdsId: 'default',
        name: 'Mitt barn',
        schoolId: 'infomentor',
        status: 'GR',
      }

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
