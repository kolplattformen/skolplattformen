import { EventEmitter } from 'events'
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
  RequestInit,
  Response,
  ScheduleItem,
  SchoolContact,
  Skola24Child,
  Teacher,
  TimetableEntry,
  User,
  wrap,
} from '@skolplattformen/api'
import { Language } from '@skolplattformen/curriculum'
import { DateTime } from 'luxon'
import {
  BankidLoginChecker,
  startGrandIdBankidSession,
} from './loginBankid'
import { DummyStatusChecker } from './loginStatusChecker'
import {
  decodeWindows1252,
  isSsLessonEventList,
  parseAbsenceWeek,
  parseMessages,
  parseNewsDetail,
  parseNewsList,
  parseStaffSelect,
  staffToTeachers,
  svDateToIso,
} from './parse'
import { SsAbsenceWeek, SsLessonEvent, SsParentHeader } from './types'

export interface SchoolsoftConfig {
  fetch: Fetch
  cookieManager: CookieManager
  options?: FetcherOptions
  /** Skol-slug under sms.schoolsoft.se, default 'procivitas' */
  school?: string
  /** Full override, t.ex. proxy eller annan Schoolsoft-version */
  baseUrl?: string
  /** DEV: redan etablerad session, hoppar över BankID-flödet */
  sessionCookie?: string
  /** Poll-intervall i ms under BankID-väntan (default 2500; sätt lågt i tester) */
  pollIntervalMs?: number
  /** Timeout i ms för BankID-väntan (default 120000) */
  loginTimeoutMs?: number
}

interface SchoolsoftIdentity {
  childId: number
  orgId: number
  className: string
  schoolName: string
}

/**
 * Naturliga fetch-headers kan exponera fler varianter av set-cookie än den
 * korsplattforms-Headers-typ libs/api deklarerar (getSetCookie i RN 0.73+,
 * .map i äldre whatwg-polyfills).
 */
interface NativeCookieHeaders {
  get(name: string): string | null
  getSetCookie?: () => string[]
  map?: { [name: string]: string[] }
}

type CookieResponse = Omit<Response, 'headers'> & {
  headers: NativeCookieHeaders
}

/**
 * Adapter mot Schoolsoft (parent-vyn).
 *
  * Datakällor:
  * - REST:  /rest-api/parent/calendar/settings,
  *          /rest-api/parent/calendar/lessons/agenda (lektioner),
  *          /rest-api/parent/calendar/event/agenda (manuella händelser)
 * - JSP:   right_student_startpage.jsp (identitet), right_student_news.jsp
 *          (nyheter), right_student_message.jsp (meddelanden + personallista),
 *          right_student_absence.jsp (frånvaro - ännu ej exponerad i Api)
 *
 * Login är medvetet stubbat: utan sessionCookie svarar login() med en
 * DummyStatusChecker som emittar ERROR. Se README.
 */
export class ApiSchoolsoft extends EventEmitter implements Api {
  private fetch: Fetcher

  private rawFetch: Fetch

  private cookieManager: CookieManager

  private baseUrl: string

  private school: string

  private personalNumber?: string

  private sessionCookie?: string

  private identity?: SchoolsoftIdentity

  private startpageCache?: { html: string; at: number }

  private resumeAttempted = false

  private pollIntervalMs: number

  private loginTimeoutMs: number

  public isLoggedIn = false

  public isFake = false

  constructor(config: SchoolsoftConfig) {
    super()
    this.fetch = wrap(config.fetch, config.options)
    this.rawFetch = config.fetch
    this.cookieManager = config.cookieManager
    this.school = config.school || 'procivitas'
    this.baseUrl =
      config.baseUrl || `https://sms.schoolsoft.se/${this.school}`
    this.sessionCookie = config.sessionCookie
    this.pollIntervalMs = config.pollIntervalMs ?? 2500
    this.loginTimeoutMs = config.loginTimeoutMs ?? 120 * 1000
  }

  getPersonalNumber(): string | undefined {
    return this.personalNumber
  }

  private static readonly PNR_COOKIE = 'skf_pnr_v1'

  /**
   * Sparar personnummer som egen cookie i jaren: samma native-lagring som
   * session-cookie:n (överlever JS-omladdningar och app-start) och ger
   * resumeSession() cache-nyckeln (hooks blandar in pnr i alla keys).
   */
  private async persistPersonalNumberCookie(): Promise<void> {
    if (!this.personalNumber) return
    try {
      await this.cookieManager.setCookie(
        { name: ApiSchoolsoft.PNR_COOKIE, value: this.personalNumber },
        this.baseUrl
      )
    } catch {
      /* cookies är optimering - figsize vid nästa lyckade login */
    }
  }

  private async restorePersonalNumberFromCookies(): Promise<void> {
    if (this.personalNumber) return
    try {
      const cookies = await this.cookieManager.getCookies(this.baseUrl)
      const saved = cookies.find((c) => c.name === ApiSchoolsoft.PNR_COOKIE)
      if (saved?.value) this.personalNumber = saved.value
    } catch {
      /* ingen restore - t.ex. tomt jar */
    }
  }

  /**
   * Fetch med explicit cookie-hantering (samma semantik som api-infomentor,
   * utan SAML-kedjorna): skickar jarens cookies per request och lagrar alla
   * Set-Cookie-headrar (inkl. ihopslagna RN-strängar) tillbaka i jaren.
   */
  private async cookieFetch(
    url: string,
    init: RequestInit & { skipAutoCookie?: boolean } = {}
  ): Promise<Response> {
    const storeCookies = async (response: CookieResponse): Promise<void> => {
      const responseHeaders = response.headers
      let raw: string[] = []
      if (typeof responseHeaders.getSetCookie === 'function') {
        raw = responseHeaders.getSetCookie()
      } else if (Array.isArray(responseHeaders.map?.['set-cookie'])) {
        raw = (responseHeaders.map as { [name: string]: string[] })[
          'set-cookie'
        ]
      } else {
        const single = responseHeaders.get('set-cookie')
        if (single) raw = [single]
      }
      // RN-fetch (whatwg-polyfill) slår ihop flera Set-Cookie-headrar till
      // EN sträng separerad med ", " - splitta så varje cookie lagras var
      // för sig.
      const splitCombined = (entry: string): string[] =>
        entry.split(/,(?=[^;]+?=)/g).map((c) => c.trim())
      const cookies = raw.flatMap(splitCombined).filter(Boolean)
      for (const cookie of cookies) {
        try {
          await this.cookieManager.setCookieString(cookie, url)
        } catch (error) {
          console.warn('Could not store cookie:', (error as Error).message)
        }
      }
    }

    const { skipAutoCookie, ...rest } = init
    const headers: Record<string, string> = {
      ...((rest.headers as Record<string, string> | undefined) || {}),
    }
    if (!headers.Cookie && !skipAutoCookie) {
      const cookieHeader = await this.cookieManager.getCookieString(url)
      if (cookieHeader) {
        headers.Cookie = cookieHeader
      }
    }

    const response = await this.rawFetch(url, {
      redirect: 'manual',
      ...rest,
      headers,
    })
    await storeCookies(response)

    console.log(
      `[schoolsoft] ${init.method || 'GET'} ${url} → ${response.status}`
    )
    return response
  }

  private async fetchHtml(url: string): Promise<string> {
    const response = await this.cookieFetch(url)
    if (!response.ok) {
      throw new Error(`Schoolsoft error: ${response.status} ${response.statusText}`)
    }
    // JSP deklarerar iso-8859-1 (i praktiken windows-1252): avkoda bytes
    // själva när plattformen tillåter, annars fallback (mojibake i RN annars).
    const withBuffer = response as Response & {
      arrayBuffer?: () => Promise<ArrayBuffer>
    }
    if (typeof withBuffer.arrayBuffer === 'function') {
      return decodeWindows1252(await withBuffer.arrayBuffer.call(response))
    }
    return response.text()
  }

  private async fetchJson<T>(url: string): Promise<T> {
    const response = await this.cookieFetch(url)
    if (!response.ok) {
      throw new Error(`Schoolsoft error: ${response.status} ${response.statusText}`)
    }
    return response.json()
  }

  async setSessionCookie(sessionCookie: string): Promise<void> {
    for (const pair of sessionCookie.split('; ')) {
      await this.cookieManager.setCookieString(pair, this.baseUrl)
    }
    if (!this.personalNumber) this.personalNumber = 'unknown'
    await this.persistPersonalNumberCookie()
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

  /**
   * BankID-login via AcadeMedias SAML-IdP (GrandID):
   *   samlLogin.jsp → login.grandid.com → ?bankid=1 → POST pnr →
   *   poll → SAML-kedja tillbaka → schoolsoft-session.
   * Se loginBankid.ts för detaljer. Med injicerad sessionCookie (DEV)
   * kortsluts flödet helt.
   */
  async login(personalNumber?: string): Promise<LoginStatusChecker> {
    this.isFake = false

    if (this.sessionCookie) {
      try {
        await this.cookieManager.clearAll()
      } catch {
        /* fortsätt */
      }
      try {
        for (const pair of this.sessionCookie.split('; ')) {
          await this.cookieManager.setCookieString(pair, this.baseUrl)
        }
      } catch (error) {
        console.warn('Dev cookie injection failed:', (error as Error).message)
      }
      this.personalNumber = personalNumber || 'unknown'
      await this.persistPersonalNumberCookie()
      this.isLoggedIn = true
      this.emit('login')
      const checker = new DummyStatusChecker()
      checker.token = 'fake'
      setTimeout(() => checker.emit('OK'), 0)
      return checker
    }

    if (!personalNumber || personalNumber.replace(/\D/g, '').length !== 12) {
      const checker = new DummyStatusChecker()
      const message =
        'Schoolsoft kräver personnummer (ÅÅÅÅMMDDNNNN) för BankID-login'
      console.warn(message)
      setTimeout(() => checker.emit('ERROR', message), 0)
      return checker
    }

    const normalizedPnr = personalNumber.replace(/\D/g, '')
    const ctx = {
      cookieFetch: (url: string, init?: Parameters<typeof this.cookieFetch>[1]) =>
        this.cookieFetch(url, init),
      baseUrl: this.baseUrl,
      pollIntervalMs: this.pollIntervalMs,
      timeoutMs: this.loginTimeoutMs,
      consoleTag: '[schoolsoft]',
    }

    let session
    try {
      session = await startGrandIdBankidSession(ctx, normalizedPnr)
    } catch (error) {
      // diagnos: släpp undantaget i Metro-loggen också (kan följas live)
      console.warn(
        '[schoolsoft] startGrandIdBankidSession kastade:',
        (error as Error)?.stack || (error as Error)?.message || error
      )
      const checker = new DummyStatusChecker()
      setTimeout(() => checker.emit('ERROR', (error as Error).message), 0)
      return checker
    }

    const checker = new BankidLoginChecker(ctx, session, () => {
      this.personalNumber = normalizedPnr
      this.resumeAttempted = true
      this.isLoggedIn = true
      this.startpageCache = undefined
      this.headerCache = undefined
      void this.persistPersonalNumberCookie()
      this.emit('login')
    })
    checker.start()
    return checker
  }

  async loginFreja(): Promise<FrejaLoginStatusChecker> {
    throw new Error('LOGIN_FREJA_EID ej stött av Schoolsoft-adaptern')
  }

  /**
   * Återupptar en session från cookiejaren: GET startpage - inloggad sida
   * innehåller #parent-header-root och redirectar INTE till
   * Login.jsp/samlLogin. Kallas från init (endast i sessionCookie-läge).
   */
  async resumeSession(): Promise<boolean> {
    if (this.resumeAttempted) return this.isLoggedIn
    this.resumeAttempted = true
    try {
      const response = await this.cookieFetch(this.startpageUrl())
      const finalUrl = (response as Response & { url?: string }).url || ''
      if (
        finalUrl.includes('Login.jsp') ||
        finalUrl.includes('samlLogin')
      ) {
        console.log('[schoolsoft] session död - redirect till login')
        return false
      }
      const body = await response.text()
      if (body.includes('parent-header-root')) {
        await this.restorePersonalNumberFromCookies()
        this.isLoggedIn = true
        void this.persistPersonalNumberCookie()
        console.log('[schoolsoft] session återupptagen från jaren')
        this.emit('login')
        return true
      }
      console.log('[schoolsoft] ingen giltig session i jaren')
    } catch (error) {
      console.warn('resumeSession failed:', (error as Error).message)
    }
    return false
  }

  private startpageUrl(): string {
    return `${this.baseUrl}/jsp/student/right_student_startpage.jsp`
  }

  /** Kortlivad cache - används bara för session-koll/meddelanderäknare. */
  private async getStartpageHtml(): Promise<string> {
    if (
      this.startpageCache &&
      Date.now() - this.startpageCache.at < 30 * 1000
    ) {
      return this.startpageCache.html
    }
    const html = await this.fetchHtml(this.startpageUrl())
    this.startpageCache = { html, at: Date.now() }
    return html
  }

  /**
   * Header-API:t (React-appens egen källa): förälder + ALLA barn med
   * skolanknytningar. Svarar som rå-JSON utan browser-DOM - den enda
   * identity-källa som fungerar i RN (startpage-headern är klientrenderad).
   */
  private headerCache?: { data: SsParentHeader; at: number }

  private async getParentHeader(): Promise<SsParentHeader> {
    if (this.headerCache && Date.now() - this.headerCache.at < 30 * 1000) {
      return this.headerCache.data
    }
    const data = await this.fetchJson<SsParentHeader>(
      `${this.baseUrl}/rest-api/parent/header/parent`
    )
    this.headerCache = { data, at: Date.now() }
    return data
  }

  async getUser(): Promise<User> {
    const header = await this.getParentHeader()
    return {
      personalNumber: this.personalNumber,
      isAuthenticated: true,
      firstName: header.firstName || undefined,
      lastName: header.lastName || undefined,
    }
  }

  async getChildren(): Promise<EtjanstChild[]> {
    const header = await this.getParentHeader()
    if (!header.children?.length) {
      throw new Error('Header-API:t returnerade inga barn')
    }
    const current = header.children.find(
      (c) => c.id === header.currentChildId
    )
    const school = current?.schools?.find(
      (s) => s.orgId === header.currentOrgId
    ) ?? current?.schools?.[0]
    if (current && school) {
      this.identity = {
        childId: current.id,
        orgId: school.orgId,
        className: school.className.trim(),
        schoolName: school.schoolName.trim(),
      }
    }
    // Aktuellt barn först (serverns state styr vilken kontext övriga API:er
    // returnerar; barnbyte sker via parent/header/parent?childId=..&orgId=..
    // men exponeras ännu inte - se README).
    const ordered = [...header.children].sort((a, b) =>
      a.id === header.currentChildId ? -1 : b.id === header.currentChildId ? 1 : 0
    )
    return ordered.map((child) => {
      const childSchool =
        child.schools?.find((s) => s.orgId === header.currentOrgId) ??
        child.schools?.[0]
      return {
        id: String(child.id),
        sdsId: String(child.id),
        name: `${child.firstName} ${child.lastName}`.trim(),
        status: 'STUDENT',
        schoolId: String(childSchool?.orgId ?? ''),
      }
    })
  }

  /**
   * Kalender-REST:en har två agenda-endpoints: "lessons" (lektioner + lunch)
   * och "event" (manuella händelser - tom i parent-vyn vi spelat in).
   * Båda svarar med en BAR array av SsLessonEvent.
   */
  private async fetchAgenda(
    kind: 'lessons' | 'event',
    from: DateTime,
    to: DateTime
  ): Promise<SsLessonEvent[]> {
    const url = `${this.baseUrl}/rest-api/parent/calendar/${kind}/agenda?start_date=${from.toISODate()}&end_date=${to.toISODate()}`
    const json = await this.fetchJson<unknown>(url)
    if (!isSsLessonEventList(json)) {
      throw new Error('Oväntat svar från Schoolsoft agenda-endpoint')
    }
    return json
  }

  async getCalendar(child: EtjanstChild): Promise<CalendarItem[]> {
    try {
      const now = DateTime.now()
      const from = now.startOf('week')
      const to = now.endOf('week')
      const [lessons, events] = await Promise.all([
        this.fetchAgenda('lessons', from, to),
        this.fetchAgenda('event', from, to),
      ])
      return [...lessons, ...events]
        .sort((a, b) => a.startDate.localeCompare(b.startDate))
        .map((lesson) => ({
          id: lesson.eventId,
          title: lesson.name,
          description: lesson.description,
          location: lesson.room || undefined,
          startDate: lesson.startDate,
          endDate: lesson.endDate,
          allDay: lesson.allDay,
        }))
    } catch (error) {
      console.error('Error fetching calendar:', error)
      return []
    }
  }

  async getSchedule(
    child: EtjanstChild,
    from: DateTime,
    to: DateTime
  ): Promise<ScheduleItem[]> {
    try {
      const lessons = await this.fetchAgenda('lessons', from, to)
      return lessons.map((lesson) => ({
        title: `${lesson.name} ${lesson.room}`.trim(),
        description:
          lesson.teachingGroup + (lesson.teacher ? ` · ${lesson.teacher}` : ''),
        location: lesson.room,
        startDate: lesson.startDate,
        endDate: lesson.endDate,
        oneDayEvent: true,
        allDayEvent: lesson.allDay,
      }))
    } catch (error) {
      console.error('Error fetching schedule:', error)
      return []
    }
  }

  async getTimetable(
    child: Skola24Child,
    week: number,
    year: number,
    lang: Language
  ): Promise<TimetableEntry[]> {
    try {
      // ISO-vecka -> måndag..söndag (dag 1/7, luxon-konvention)
      const from = DateTime.fromObject({
        weekYear: year,
        weekNumber: week,
        weekday: 1,
      })
      const to = from.plus({ days: 6 })
      const lessons = await this.fetchAgenda('lessons', from, to)

      return lessons.map((lesson) => {
        const start = DateTime.fromISO(lesson.startDate)
        const end = DateTime.fromISO(lesson.endDate)
        // Samma Subject-form som api-skolplattformens fakeData: appens
        // week.component känner igen lunch på code.toUpperCase() === 'LUNCH'
        const subject =
          lesson.name === 'Lunch'
            ? { code: 'Lunch', name: 'Lunch', category: '' }
            : { code: lesson.name, name: lesson.name, category: '' }
        return {
          ...subject,
          id: String(lesson.eventId),
          teacher: lesson.teacher,
          location: lesson.room,
          timeStart: start.toFormat('HH:mm'),
          timeEnd: end.toFormat('HH:mm'),
          // dayOfWeek-konvention från api-skolplattformens timetable-parse:
          // 1 = måndag ... 7 = söndag (luxon weekday, identisk med Skola24:s
          // dayOfWeekNumber)
          dayOfWeek: start.weekday,
          blockName: '',
          dateStart: start.toISODate() || '',
          dateEnd: end.toISODate() || '',
          // Schoolsofts egen färg per lektion - extra fält, ignorerat av appen
          color: lesson.eventColor,
        } as TimetableEntry
      })
    } catch (error) {
      console.error('Error fetching timetable:', error)
      return []
    }
  }

  async getNews(child: EtjanstChild): Promise<NewsItem[]> {
    try {
      const html = await this.fetchHtml(
        `${this.baseUrl}/jsp/student/right_student_news.jsp?type=1`
      )
      const now = new Date()
      return parseNewsList(html).map((item) => ({
        id: item.id,
        header: item.title,
        intro: item.excerpt,
        published: svDateToIso(item.dateText || '', now),
        modified: svDateToIso(item.dateText || '', now),
      }))
    } catch (error) {
      console.error('Error fetching news:', error)
      return []
    }
  }

  async getNewsDetails(
    child: EtjanstChild,
    item: NewsItem
  ): Promise<NewsItem> {
    try {
      const html = await this.fetchHtml(
        `${this.baseUrl}/jsp/student/right_student_news.jsp?requestid=${item.id}&type=1&action=view`
      )
      const detail = parseNewsDetail(html)
      return {
        ...item,
        body: detail?.bodyText ?? '',
        author: detail?.author ?? item.author,
        published: detail?.publishedText
          ? svDateToIso(detail.publishedText) || item.published
          : item.published,
      }
    } catch (error) {
      console.error('Error fetching news details:', error)
      return item
    }
  }

  async getNotifications(child: EtjanstChild): Promise<Notification[]> {
    try {
      const html = await this.fetchHtml(
        `${this.baseUrl}/jsp/student/right_student_message.jsp?folder=inbox`
      )
      return parseMessages(html).map((message) => ({
        id: message.id,
        sender: message.from,
        dateCreated: message.dateText,
        dateModified: message.dateText,
        message: message.preview,
        url: `${this.baseUrl}/jsp/student/right_student_message.jsp`,
        category: 'Meddelande',
        type: 'message',
      }))
    } catch (error) {
      console.error('Error fetching notifications:', error)
      return []
    }
  }

  async getTeachers(child: EtjanstChild): Promise<Teacher[]> {
    try {
      // Personallistan ligger i meddelandesidans mottagar-select
      const html = await this.fetchHtml(
        `${this.baseUrl}/jsp/student/right_student_message.jsp?folder=inbox`
      )
      return staffToTeachers(parseStaffSelect(html))
    } catch (error) {
      console.error('Error fetching teachers:', error)
      return []
    }
  }

  /**
   * Frånvaroveckan - parsad men ännu inte exponerad via Api-gränssnittet
   * (setAbsent saknas där). Publik för kommande brygga/README-dokumentation.
   */
  async getAbsenceWeek(): Promise<SsAbsenceWeek> {
    const html = await this.fetchHtml(
      `${this.baseUrl}/jsp/student/right_student_absence.jsp`
    )
    return parseAbsenceWeek(html)
  }

  async getClassmates(child: EtjanstChild): Promise<Classmate[]> {
    return []
  }

  async getMenu(child: EtjanstChild): Promise<MenuItem[]> {
    return []
  }

  async getSchoolContacts(child: EtjanstChild): Promise<SchoolContact[]> {
    return []
  }

  async getSkola24Children(): Promise<Skola24Child[]> {
    return []
  }

  async logout(): Promise<void> {
    await this.cookieManager.clearAll()
    this.startpageCache = undefined
    this.identity = undefined
    this.isLoggedIn = false
    this.emit('logout')
  }
}
