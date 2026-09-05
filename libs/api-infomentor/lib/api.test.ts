import { ApiInfomentor } from './api'

describe('ApiInfomentor', () => {
  let api: ApiInfomentor
  let mockFetch: jest.Mock
  let mockCookieManager: any

  beforeEach(() => {
    mockFetch = jest.fn()
    mockCookieManager = {
      setCookieString: jest.fn(),
      getCookieString: jest.fn().mockResolvedValue(''),
      clearAll: jest.fn(),
    }

    api = new ApiInfomentor({
      fetch: mockFetch,
      cookieManager: mockCookieManager,
    })
  })

  it('should create an instance', () => {
    expect(api).toBeTruthy()
    expect(api.isLoggedIn).toBe(false)
  })

  it('should set session cookie', async () => {
    await api.setSessionCookie('test-cookie')
    expect(mockCookieManager.setCookieString).toHaveBeenCalledWith(
      'test-cookie',
      'https://hub.infomentor.se'
    )
    expect(api.isLoggedIn).toBe(true)
  })

  it('should get children', async () => {
    // 1) appData-anrop (bevisar inloggning)  2) hub-root HTML med IMHome.init
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => '{"maxDate":"30-07-27","minDate":"01-08-26"}',
        json: async () => ({ maxDate: '30-07-27', minDate: '01-08-26' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () =>
          "<script>IMHome = { init: { firstName: 'Landgren, Christian', selectedPupilName: 'Landgren, Sixten', userRole: 'parent' } }</script>",
        json: async () => ({}),
      })

    api.isLoggedIn = true
    const children = await api.getChildren()
    expect(children).toHaveLength(1)
    expect(children[0].name).toBe('Sixten Landgren')
  })

  it('should get calendar', async () => {
    // Verifierad struktur: ren array
    const data = [
      {
        id: '1',
        title: 'Test Event',
        text: '',
        isAllDayEvent: false,
        startDateFull: '2024-01-01T10:00:00',
        endDateFull: '2024-01-01T11:00:00',
      },
    ]
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify(data),
      json: async () => data,
    })

    api.isLoggedIn = true
    const calendar = await api.getCalendar({ id: '123' } as any)
    expect(calendar).toHaveLength(1)
    expect(calendar[0].title).toBe('Test Event')
  })

  it('should get news', async () => {
    // Verifierad struktur: { items: [...] }
    const data = {
      items: [
        {
          id: '1',
          title: 'Test News',
          content: 'Innehall',
          publishedDate: '2024-01-01',
          publishedBy: 'Skolan',
        },
      ],
    }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify(data),
      json: async () => data,
    })

    api.isLoggedIn = true
    const news = await api.getNews({ id: '123' } as any)
    expect(news).toHaveLength(1)
    expect(news[0].header).toBe('Test News')
  })

  it('should get notifications', async () => {
    // Verifierad struktur: { notifications: [{ id, title, subTitle, dateSent,
    // appType, state, url, type }] }
    const data = {
      notifications: [
        {
          id: 69301346,
          title: 'Frånvaro registrerad',
          subTitle: 'Naturorienterande ämnen',
          subjectsCourses: 'Naturorienterande ämnen',
          dateSent: '2026-08-31T07:34:05',
          appType: 'Attendance',
          state: 'Seen',
          url: '/#/attendance/tab/pastAttendance/show/243829437',
          type: 'AbsenceRecorded',
        },
      ],
    }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify(data),
      json: async () => data,
    })

    api.isLoggedIn = true
    const notifications = await api.getNotifications({ id: '123' } as any)
    expect(notifications).toHaveLength(1)
    expect(notifications[0].message).toBe(
      'Frånvaro registrerad — Naturorienterande ämnen'
    )
    expect(notifications[0].sender).toBe('Frånvaro')
    expect(notifications[0].url).toBe(
      'https://hub.infomentor.se/#/attendance/tab/pastAttendance/show/243829437'
    )
  })

  it('should logout', async () => {
    api.isLoggedIn = true
    await api.logout()
    expect(mockCookieManager.clearAll).toHaveBeenCalled()
    expect(api.isLoggedIn).toBe(false)
  })
})
