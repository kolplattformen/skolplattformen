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

/**
 * Base64-dekodering utan Buffer/atob (Hermes-säker).
 * Hanterar URL-säker b64 (- _) och saknad padding.
 */
const decodeBase64 = (value: string): string => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  const clean = normalized.replace(/=+$/, '')
  let result = ''
  let bits = 0
  let accumulated = 0
  for (let i = 0; i < clean.length; i++) {
    const idx = chars.indexOf(clean[i])
    if (idx === -1) continue
    accumulated = ((accumulated << 6) | idx) & 0xffffff
    bits += 6
    if (bits >= 8) {
      bits -= 8
      result += String.fromCharCode((accumulated >> bits) & 0xff)
    }
  }
  return result
}

export interface InfomentorConfig {
  fetch: Fetch
  cookieManager: CookieManager
  options?: FetcherOptions
  baseUrl?: string
  idp?: string // t.ex. 'stockholm_par'
  sessionCookie?: string // DEV: redan etablerad hub-session, hoppar över SAML/BankID
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
  private sessionCookie?: string
  private samlTargetUrl?: string

  public isLoggedIn = false
  public isFake = false

  constructor(config: InfomentorConfig) {
    super()
    this.fetch = wrap(config.fetch, config.options)
    this.rawFetch = config.fetch
    this.cookieManager = config.cookieManager
    this.baseUrl = config.baseUrl || 'https://hub.infomentor.se'
    this.idp = config.idp || 'stockholm_par'
    this.sessionCookie = config.sessionCookie
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

  /**
   * Fetch med explicit cookie-hantering (samma semantik som Node-harnessen):
   * - skickar Cookie-header utifrån cookie-jaren
   * - sparar Set-Cookie från varje svar i jaren
   * RN:s nativa auto-cookie-hantering räcker inte här - SM-kontexten går
   * annars förlorad mellan stegen (servern svarar 200 istället för 302).
   */
  private async cookieFetch(
    url: string,
    init: RequestInit = {}
  ): Promise<Response> {
    // Samla inkommande Set-Cookie och lagra i jaren
    const storeCookies = async (response: any): Promise<void> => {
      let raw: string[] = []
      if (typeof response.headers?.getSetCookie === 'function') {
        raw = response.headers.getSetCookie()
      } else if (Array.isArray(response.headers?.map?.['set-cookie'])) {
        raw = response.headers.map['set-cookie']
      } else {
        const single = response.headers?.get?.('set-cookie')
        if (single) raw = [single]
      }
      for (const cookie of raw) {
        try {
          await this.cookieManager.setCookieString(cookie, url)
        } catch (error) {
          console.warn('Could not store cookie:', (error as Error).message)
        }
      }
    }

    const headers: Record<string, string> = { ...((init.headers as any) || {}) }
    if (!headers.Cookie) {
      const cookieHeader = await this.cookieManager.getCookieString(url)
      if (cookieHeader) {
        headers.Cookie = cookieHeader
      }
    }

    const response = await (this.rawFetch as any)(url, {
      ...init,
      headers,
    })
    await storeCookies(response)

    const sentNames = (headers.Cookie || '')
      .split(';')
      .map((c: string) => c.split('=')[0].trim())
      .filter(Boolean)
    const gotCookies = (response.headers as any)?.map?.['set-cookie'] || []
    const gotNames = (Array.isArray(gotCookies) ? gotCookies : [])
      .map((c: string) => c.split('=')[0].trim())
    if (sentNames.length || gotNames.length) {
      console.log(
        `[cookieFetch] ${new URL(url).host} ${(init.method || 'GET')} → ${
          response.status
        } sent:[${sentNames.join(',')}] set-cookie:[${gotNames.join(',')}]`
      )
    } else {
      console.log(
        `[cookieFetch] ${new URL(url).host} ${init.method || 'GET'} → ${response.status}`
      )
    }

    return response as Response
  }

  async login(personalNumber?: string): Promise<LoginStatusChecker> {
    if (personalNumber !== undefined && personalNumber.endsWith('1212121212'))
      return this.fakeMode()

    this.isFake = false

    // DEV-session: redan etablerad hub-session, hoppa över SAML/BankID
    if (this.sessionCookie) {
      console.log('Using injected dev session cookie')
      const cookies = await this.cookieManager.getCookieString(this.baseUrl)
      try {
        for (const pair of this.sessionCookie.split('; ')) {
          await this.cookieManager.setCookieString(pair, this.baseUrl)
        }
      } catch (error) {
        console.warn('Dev cookie injection failed:', (error as Error).message)
      }
      console.log('Dev cookies:', cookies ? 'had old' : 'none before')
      this.personalNumber = personalNumber || 'unknown'
      this.isLoggedIn = true
      this.emit('login')
      const instant = new EventEmitter() as any
      instant.token = 'fake'
      instant.cancel = () => {}
      return instant
    }

    // rensa cookies (gamla SM/Phx-sessioner gör att servern ser fel
    // kontext - I Node fungerade allt med en färsk jar, dvs samma
    // första-villkor som ett rent webbläsarfönster)
    try {
      await this.cookieManager.clearAll()
      console.log('Cleared all cookies before login')
    } catch (error) {
      console.warn('Could not clear cookies:', (error as Error).message)
    }

    // Steg 1: Starta Infomentor SSO - följer 302-kedjan till Stockholms BankID-sida
    console.log('Starting Infomentor SSO flow...')
    const ssoUrl = `https://sso.infomentor.se/login.ashx?idp=${this.idp}`
    const loginPageUrl = await this.getBankLoginPageUrl(ssoUrl)

    // Redan autentiserad (levande session) - SAML-redan POSTad av loopen
    if (loginPageUrl === null) {
      console.log('Session already valid - skipping BankID')
      this.personalNumber = personalNumber || 'unknown'
      this.isLoggedIn = true
      this.emit('login')
      const instant = new EventEmitter() as any
      instant.token = 'fake'
      instant.cancel = () => {}
      return instant
    }

    console.log('BankID login page URL:', loginPageUrl.substring(0, 120))

    // Steg 2: Initiera BankID på inloggningssidan (samma som webben: initialize=bankid)
    const initUrl = `${loginPageUrl}&initialize=bankid&_=${Date.now()}`
    try {
      const ticketResponse = await this.cookieFetch(initUrl)
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

  private async getBankLoginPageUrl(ssoUrl: string): Promise<string | null> {
    let pageUrl = ssoUrl

    for (let i = 0; i < 8; i++) {
      // RN-fetch följer redirects själv; response.url = slutgiltiga sidan
      const response = (await this.cookieFetch(pageUrl, {
        redirect: 'follow',
      })) as any
      pageUrl = response.url || pageUrl
      const body = await response.text()
      const doc = html.parse(decode(body))
      const form = doc.querySelector('form')

      // SAML auto-POST med SAMLResponse = redan autentiserad (t.ex.levande
      // SM-session) -> POSTa till Infomentor så sätts sessioncookies
      const samlResponse = doc
        .querySelector('input[name="SAMLResponse"]')
        ?.getAttribute('value')
      if (form && samlResponse) {
        const action = new URL(
          form.getAttribute('action') || pageUrl,
          pageUrl
        ).toString()
        console.log('Already authenticated - posting SAMLResponse...')
        const params = new URLSearchParams()
        doc.querySelectorAll('input').forEach((input) => {
          const name = input.getAttribute('name')
          if (name) params.append(name, input.getAttribute('value') || '')
        })
        try {
          await this.followInfomentorLoginChain(action, params)
          return null // ingen BankID behövs
        } catch (error) {
          console.warn(
            'Pre-auth SAML failed, falling back to BankID:',
            (error as Error).message
          )
          pageUrl = ssoUrl // starta om SSO-kedjan från början
          continue
        }
      }

      // Får vi SAML auto-POST-sida med SAMLRequest? POSTa formuläret vidare
      const samlRequest = doc
        .querySelector('input[name="SAMLRequest"]')
        ?.getAttribute('value')
      if (form && samlRequest) {
        const action = new URL(form.getAttribute('action') || pageUrl, pageUrl)
          .toString()
        const params = new URLSearchParams()
        doc.querySelectorAll('input').forEach((input) => {
          const name = input.getAttribute('name')
          if (name) params.append(name, input.getAttribute('value') || '')
        })
        console.log('POSTing SAMLRequest form...')
        const postResponse = (await this.cookieFetch(action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
          redirect: 'follow',
        })) as any
        pageUrl = postResponse.url || action
        continue
      }

      // Metodväljaren? Följ BankID-länken (NECSadc/mbid)
      if (body.includes('NECSadc/mbid')) {
        const mbidHref = doc
          .querySelector('a[href*="NECSadc/mbid"]')
          ?.getAttribute('href')
        if (mbidHref) {
          const mbidUrl = new URL(mbidHref, pageUrl).toString()
          console.log('Following mbid link...')
          // B64startpage-parametern avkodar SAML-målet (medborgareonly.jsp
          // ?SAMLRequest=...) - kan behövas direkt vid fallback (servern
          // bouncar ibland auth-handoffen tillbaka till UI-sidan)
          try {
            const startpage = new URL(mbidUrl).searchParams.get('startpage')
            if (startpage) {
              this.samlTargetUrl = decodeBase64(startpage)
              console.log(
                'SAML target saved:',
                this.samlTargetUrl.substring(0, 90)
              )
            }
          } catch (error) {
            console.warn(
              'Could not decode SAML target:',
              (error as Error).message
            )
          }
          const mbidResponse = (await this.cookieFetch(mbidUrl, {
            redirect: 'follow',
          })) as any
          pageUrl = mbidResponse.url || mbidUrl
          continue // evaluera slutsidan på nästa varv
        }
      }

      // Annars: anta att vi är på BankID-sidan (UI3 med initialize=bankid)
      break
    }

    console.log('BankID page:', pageUrl.substring(0, 130))
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
          const response = await this.cookieFetch(statusUrl)
          const data = await response.json()
          const state = data?.state

          if (state === 'OK') {
            // Vänta in hela SAML-slutsteget INNAN OK signaleras -
            // annars börjar appen hämta data innan hub-sessionen finns
            try {
              await this.completeSamlFlow(loginPageUrl)
            } catch (error) {
              console.error('SAML completion error:', error)
              checker.emit('ERROR')
              return
            }
            this.isLoggedIn = true
            checker.emit('OK')
            this.emit('login')
            console.log('Login event emitted')
            return
          }
          if (state) checker.emit(state)
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
    const response = (await this.cookieFetch(loginPageUrl, {
      redirect: 'follow',
    })) as any
    const finalUrl: string = response.url || loginPageUrl
    console.log('SAML re-fetch final URL:', finalUrl.substring(0, 140))
    console.log('SAML re-fetch status:', response.status)
    const body = await response.text()
    console.log(
      'SAML re-fetch body (300):',
      body.replace(/\s+/g, ' ').substring(0, 300)
    )
    let doc = html.parse(decode(body))
    let form = doc.querySelector('form')
    let samlResponseValue = doc
      .querySelector('input[name="SAMLResponse"]')
      ?.getAttribute('value')

    // FALLBACK: servern bouncar ibland auth-handoffen tillbaka till
    // BankID-UI-sidan (ny GUID) trots OK-signering. Vi har ändå SMSESSION
    // (.stockholm.se) - hoppa över mellansteget och hämta SAML-målet
    // (medborgareonly.jsp?SAMLRequest=...) direkt.
    if ((!form || !samlResponseValue) && this.samlTargetUrl) {
      console.log(
        'Re-fetch sans SAMLResponse - försöker SAML-target direkt:',
        this.samlTargetUrl.substring(0, 90)
      )
      const targetResponse = (await this.cookieFetch(this.samlTargetUrl, {
        redirect: 'follow',
      })) as any
      const targetBody = await targetResponse.text()
      const targetUrl: string = targetResponse.url || this.samlTargetUrl
      console.log(
        `SAML target → ${targetResponse.status} @ ${targetUrl.substring(0, 100)}`
      )
      console.log(
        'SAML target body (200):',
        targetBody.replace(/\s+/g, ' ').substring(0, 200)
      )
      doc = html.parse(decode(targetBody))
      form = doc.querySelector('form')
      samlResponseValue = doc
        .querySelector('input[name="SAMLResponse"]')
        ?.getAttribute('value')
    }

    if (!form || !samlResponseValue) {
      throw new Error('No SAMLResponse received')
    }

    // Steg 5: POSTa SAMLResponse till Infomentor och följ hela kedjan
    // (hub svarar med ytterligare auto-post-steg innan sessionen är klar)
    const action = new URL(
      form.getAttribute('action') || '',
      finalUrl
    ).toString()
    console.log('Posting SAMLResponse to Infomentor...')
    const params = new URLSearchParams()
    doc.querySelectorAll('input').forEach((input) => {
      const name = input.getAttribute('name')
      if (name) params.append(name, input.getAttribute('value') || '')
    })
    await this.followInfomentorLoginChain(action, params)

    // Dumpa hub-cookies (användbara för dev-session/-feldebuggning)
    try {
      const hubCookie = await this.cookieManager.getCookieString(this.baseUrl)
      console.log('HUB-COOKIES:', hubCookie.substring(0, 200))
    } catch {
      /* loggning enbart */
    }

    console.log('Infomentor session established')
  }

  /**
   * Infomentors inloggning är inte klar efter SAML-POST:en - hub svarar med
   * en "Login in progress"-sida innehållande ännu ett auto-POST-formulär som
   * måste skickas vidare för att hub-sessioncookien ska sättas. Följ kedjan
   * tills vi landar på en sida utan interstitial-formulär.
   */
  private async followInfomentorLoginChain(
    action: string,
    params: URLSearchParams
  ): Promise<void> {
    let postAction: string = action
    let postParams: URLSearchParams = params

    for (let i = 0; i < 6; i++) {
      const response = (await this.cookieFetch(postAction, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: postParams.toString(),
        redirect: 'follow',
      })) as any
      const pageUrl: string = response.url || postAction
      const bodyText = await response.text()
      console.log(
        `Chain POST → ${response.status} @ ${pageUrl.substring(0, 100)}`
      )

      const doc = html.parse(decode(bodyText))
      const nextForm = doc.querySelector('form')

      // Felsidor (t.ex. UserNotAuthenticated) - kedjan har INTE lyckats
      if (pageUrl.includes('/Error/')) {
        throw new Error(
          `Infomentor login chain ended at error page: ${pageUrl}`
        )
      }

      const isInterstitial =
        bodyText.includes('Login in progress') ||
        bodyText.includes('login in progress') ||
        doc.querySelector('input[name="SAMLResponse"]') ||
        doc.querySelector('input[name="SAMLRequest"]')

      if (!nextForm || !isInterstitial) {
        console.log('Login chain complete at:', pageUrl.substring(0, 100))
        return
      }

      postAction = new URL(
        nextForm.getAttribute('action') || pageUrl,
        pageUrl
      ).toString()
      const nextParams = new URLSearchParams()
      doc.querySelectorAll('input').forEach((input) => {
        const name = input.getAttribute('name')
        if (name) nextParams.append(name, input.getAttribute('value') || '')
      })
      postParams = nextParams
      console.log('Following interstitial auto-post form...')
    }
    console.warn('Login chain did not complete within 6 steps')
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
    const sentCookie = (init.headers as any)?.Cookie || ''
    console.log(
      `[hub] ${endpoint} status=${response.status} cookieNames=[${sentCookie
        .split(';')
        .map((c) => c.split('=')[0].trim())
        .join(',')}]`
    )

    const responseBody = await response.text()
    console.log(
      `[hub-body] ${endpoint} len=${responseBody.length} start=${responseBody
        .replace(/\s+/g, ' ')
        .substring(0, 80)}`
    )

    if (!response.ok) {
      console.error(
        `Infomentor API ${endpoint} failed: ${response.status} body:`,
        responseBody.replace(/\s+/g, ' ').substring(0, 200)
      )
      throw new Error(
        `Infomentor API error: ${response.status} ${response.statusText}`
      )
    }

    if (!responseBody) {
      console.error(`Infomentor API ${endpoint} returned EMPTY body`)
      throw new Error(`Infomentor API ${endpoint} returned empty body`)
    }

    try {
      return JSON.parse(responseBody)
    } catch (error) {
      console.error(
        `Infomentor API ${endpoint} non-JSON:`,
        responseBody.replace(/\s+/g, ' ').substring(0, 200)
      )
      throw error
    }
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
      // Verifierad struktur: ren array [{ id, title, text, isAllDayEvent, startDateFull, endDateFull, ... }]
      // Kräver startDate/endDate i payload (annars 500)
      const data = await this.post<any[]>('/calendarv2/calendarv2/getentries', {
        startDate: DateTime.now().toISODate(),
        endDate: DateTime.now().plus({ months: 2 }).toISODate(),
      })

      const entries: any[] = Array.isArray(data) ? data : []

      return entries.map((entry) => ({
        id: Number(entry.id),
        title: entry.title,
        description: entry.text || entry.description || '',
        location: '',
        startDate: entry.startDateFull || entry.startDate,
        endDate: entry.endDateFull || entry.endDate,
        allDay: entry.isAllDayEvent || false,
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

      // Verifierad struktur: { items: [{ id, title, content, publishedDate, publishedBy, newsImageUrl, ... }] }
      const items: any[] = data.items || []

      return items.map((item) => ({
        id: String(item.id),
        author: item.publishedBy,
        header: item.title,
        intro: '',
        body: item.content,
        published: item.publishedDate,
        modified: undefined,
        imageUrl: item.newsImageUrl || undefined,
        fullImageUrl: item.newsImageUrl || undefined,
        imageAltText: undefined,
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

      // Verifierad struktur: { items: [{ start, end, title, notes: { roomInfo, tutors, timetableNotes }, allDay }] }
      const items = data.items || []

      return items.map((item: any) => ({
        title: item.title,
        description: item.notes?.timetableNotes || item.notes?.tutors || '',
        location: item.notes?.roomInfo || item.details || '',
        startDate: item.start,
        endDate: item.end,
        oneDayEvent: false,
        allDayEvent: item.allDay || false,
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
