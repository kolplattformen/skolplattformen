import * as fs from 'fs'
import * as path from 'path'
import { DateTime } from 'luxon'
import { CookieManager, EtjanstChild, Fetch, Response, TimetableEntry } from '@skolplattformen/api'
import { ApiSchoolsoft } from './api'

const fixture = (dir: 'html' | 'json', name: string): string =>
  fs.readFileSync(
    path.join(__dirname, '__mocks__', dir, `${name}.${dir}`),
    'utf-8'
  )

const fakeResponse = (body: string): Response => ({
  ok: true,
  status: 200,
  statusText: 'OK',
  headers: { get: () => null },
  text: async () => body,
  json: async () => JSON.parse(body),
})

/** URL → fixture-mappning som speglar adapterns endpoints. */
const fakeFetch: Fetch = async (url: string) => {
  if (url.includes('/rest-api/parent/header/parent')) {
    return fakeResponse(fixture('json', 'parent-header'))
  }
  if (url.includes('right_student_startpage.jsp')) {
    return fakeResponse(fixture('html', 'startpage'))
  }
  if (url.includes('/rest-api/parent/calendar/settings')) {
    return fakeResponse(fixture('json', 'calendar-settings'))
  }
  if (url.includes('/rest-api/parent/calendar/lessons/agenda')) {
    return fakeResponse(fixture('json', 'lessons-agenda-w36'))
  }
  if (url.includes('/rest-api/parent/calendar/event/agenda')) {
    return fakeResponse(fixture('json', 'event-agenda-w36'))
  }
  if (url.includes('right_student_news.jsp')) {
    // samma fixture för lista och detalj (detaljen för 54267 ligger inline)
    return fakeResponse(fixture('html', 'news'))
  }
  if (url.includes('right_student_message.jsp')) {
    return fakeResponse(fixture('html', 'messages'))
  }
  if (url.includes('right_student_absence.jsp')) {
    return fakeResponse(fixture('html', 'absence-form'))
  }
  throw new Error(`fakeFetch: ovanlig URL ${url}`)
}

const inMemoryCookieManager = (): CookieManager => {
  let store: { [host: string]: string } = {}
  return {
    setCookie: async (cookie, url) => {
      const host = new URL(url).host
      // splitta ev. existerande värde och ersätt med detta cookie-namn
      const parts = (store[host] ? store[host].split('; ') : []).filter(
        (p) => !p.startsWith(`${cookie.name}=`)
      )
      parts.push(`${cookie.name}=${cookie.value}`)
      store[host] = parts.join('; ')
    },
    getCookies: async (url) => {
      const raw = store[new URL(url).host] || ''
      return raw.split('; ').map((p) => {
        const i = p.indexOf('=')
        return { name: p.slice(0, i), value: p.slice(i + 1) }
      })
    },
    setCookieString: async (cookieString: string, url: string) => {
      const host = new URL(url).host
      store[host] = store[host]
        ? `${store[host]}; ${cookieString}`
        : cookieString
    },
    getCookieString: async (url: string) => store[new URL(url).host] || '',
    clearAll: async () => {
      store = {}
    },
  }
}

const createApi = () => {
  const cookieManager = inMemoryCookieManager()
  const api = new ApiSchoolsoft({
    fetch: fakeFetch,
    cookieManager,
    sessionCookie: 'JSESSIONID=test',
  })
  return { api, cookieManager }
}

const isLunch = (entry: TimetableEntry): boolean =>
  entry.code?.toUpperCase() === 'LUNCH'

describe('ApiSchoolsoft', () => {
  it('getChildren returnerar barnen från header-API:t (aktiv först)', async () => {
    const { api } = createApi()
    const children = await api.getChildren()
    expect(children).toEqual([
      {
        id: '17149',
        sdsId: '17149',
        name: 'Viggo Ekholm',
        status: 'STUDENT',
        schoolId: '4',
      },
    ])
  })

  it('getUser returnerar vårdnadshavarens namn från header-API:t', async () => {
    const { api } = createApi()
    const user = await api.getUser()
    expect(user.isAuthenticated).toBe(true)
    expect(user.firstName).toEqual('Peter')
    expect(user.lastName).toEqual('Ekholm')
  })

  it('getTimetable mappar vecka 36 till TimetableEntry[]', async () => {
    const { api } = createApi()
    const timetable = await api.getTimetable({}, 36, 2026, 'sv')

    // Fixturen (inspelad v36, mån-fre): 25 händelser varav 5 luncher
    expect(timetable.length).toEqual(25)
    expect(timetable.filter(isLunch).length).toEqual(5)

    // Måndag: dayOfWeek 1 enligt Skola24/luxon-konventionen
    const soLesson = timetable.find((entry) => entry.code === 'SOISOO0')
    expect(soLesson).toBeDefined()
    expect(soLesson?.dayOfWeek).toEqual(1)
    expect(soLesson?.teacher).toEqual('Tilda Ringmar')
    expect(soLesson?.timeStart).toEqual('11:40')
    expect(soLesson?.timeEnd).toEqual('12:50')
    expect(soLesson?.location).toEqual('Stanford')
    expect(soLesson?.dateStart).toEqual('2026-08-31')

    const lunch = timetable.find(isLunch)
    expect(lunch?.name).toEqual('Lunch')
  })

  it('getCalendar mappar samma agenda till CalendarItem[]', async () => {
    const { api } = createApi()
    const calendar = await api.getCalendar({} as EtjanstChild)
    // lessons (25) + event (0 i inspelningen) sorterade på startDate
    expect(calendar.length).toEqual(25)
    expect(calendar[0].id).toEqual(136127)
    expect(calendar[1].location).toEqual('Stanford')
  })

  it('getNews mappar nyhetslistan', async () => {
    const { api } = createApi()
    const news = await api.getNews({} as EtjanstChild)
    expect(news.length).toBeGreaterThanOrEqual(9)
    expect(news[0].id).toEqual('54267')
    expect(news[0].header).toContain('Fagersta')
  })

  it('getNewsDetails berikar med brödtext och avsändare', async () => {
    const { api } = createApi()
    const detail = await api.getNewsDetails({} as EtjanstChild, {
      id: '54267',
      header: 'Med anledning av händelsen i Fagersta',
      published: '2026-08-24',
    })
    expect(detail.body).toContain('Fagersta')
    expect(detail.author).toContain('Mynta Jadelid')
    expect(detail.published).toEqual('2026-08-24')
  })

  it('getNotifications mappar inkorgen', async () => {
    const { api } = createApi()
    const notifications = await api.getNotifications({} as EtjanstChild)
    expect(notifications.length).toBeGreaterThanOrEqual(15)
    expect(notifications[0].id).toEqual('117511')
    expect(notifications[0].sender).toEqual('Nora Wahlin')
    expect(notifications[0].category).toEqual('Meddelande')
    expect(notifications[0].type).toEqual('message')
  })

  it('getTeachers mappar personallistan', async () => {
    const { api } = createApi()
    const teachers = await api.getTeachers({} as EtjanstChild)
    expect(teachers.length).toBeGreaterThanOrEqual(50)
    expect(teachers.some((t) => t.lastname === 'Ringmar')).toBe(true)
  })

  it('getSchedule mappar veckoagendan', async () => {
    const { api } = createApi()
    const from = DateTime.fromISO('2026-08-31')
    const to = DateTime.fromISO('2026-09-06')
    const schedule = await api.getSchedule({} as EtjanstChild, from, to)
    expect(schedule.length).toEqual(25)
    expect(schedule[1].title).toEqual('SOISOO0 Stanford')
    expect(schedule[1].description).toBe(
      'SOISOO0_SA24a · Tilda Ringmar'
    )
    expect(schedule[1].oneDayEvent).toBe(true)
  })

  it('login med sessionCookie lyckas direkt', async () => {
    const { api } = createApi()
    const events: string[] = []
    api.on('login', () => events.push('login'))
    const checker = await api.login('197001011111')
    expect(api.isLoggedIn).toBe(true)
    expect(events).toEqual(['login'])
    expect(checker.token).toEqual('fake')
  })

  it('login utan sessionCookie emittar ERROR utan att krascha', async () => {
    const cookieManager = inMemoryCookieManager()
    const api = new ApiSchoolsoft({ fetch: fakeFetch, cookieManager })
    const checker = await api.login('197001011111')
    const status = await new Promise<string>((resolve) => {
      const timer = setTimeout(() => resolve('timeout'), 1000)
      checker.on('ERROR', () => {
        clearTimeout(timer)
        resolve('ERROR')
      })
    })
    expect(status).toEqual('ERROR')
    expect(api.isLoggedIn).toBe(false)
  })

  it('resumeSession återupptar en levande session', async () => {
    const { api } = createApi()
    const events: string[] = []
    api.on('login', () => events.push('login'))
    const resumed = await api.resumeSession()
    expect(resumed).toBe(true)
    expect(api.isLoggedIn).toBe(true)
    expect(events).toEqual(['login'])
  })

  it('logins sparar pnr-cookie och resumeSession återställer den', async () => {
    const { api, cookieManager } = createApi()
    api.login('199001011234')
    const status = await new Promise<string>((resolve) => {
      api.on('login', () => resolve('login'))
      setTimeout(() => resolve('timeout'), 3000)
    })
    expect(status).toEqual('login')
    const pnrCookie = await cookieManager
      .getCookies('https://sms.schoolsoft.se/procivitas')
      .then((cs) => cs.find((c2) => c2.name === 'skf_pnr_v1'))
    expect(pnrCookie?.value).toEqual('199001011234')
  })

  it('resumeSession återställer personalNumber från pnr-cookien', async () => {
    const cookieManager = inMemoryCookieManager()
    await cookieManager.setCookie(
      { name: 'skf_pnr_v1', value: '191212121212' },
      'https://sms.schoolsoft.se/procivitas'
    )
    const api = new ApiSchoolsoft({
      fetch: fakeFetch,
      cookieManager,
      personalNumber: undefined,
    } as never)
    const events: string[] = []
    api.on('login', () => events.push('login'))
    const resumed = await api.resumeSession()
    expect(resumed).toBe(true)
    expect(api.getPersonalNumber()).toEqual('191212121212')
    expect(events).toEqual(['login'])
  })

  it('logout rensar cookies och login-status', async () => {
    const { api, cookieManager } = createApi()
    await api.setSessionCookie('JSESSIONID=xyz')
    expect(api.isLoggedIn).toBe(true)
    await api.logout()
    expect(api.isLoggedIn).toBe(false)
    const cookies = await cookieManager.getCookieString(
      'https://sms.schoolsoft.se/procivitas'
    )
    expect(cookies).toEqual('')
  })
})
