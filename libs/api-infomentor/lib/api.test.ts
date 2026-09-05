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

  it('should get classmates (class group, not staff)', async () => {
    // Verifierad struktur: groupConfig med title-field, staff-grupp först
    const data = {
      groupConfig: [
        {
          id: -1,
          title: 'Skolans personal',
          isStaffGroup: false,
          items: [
            { id: '869265', name: 'Abbasi, Ashwagh', email: null, phone: null },
          ],
        },
        {
          id: 3238366,
          title: '8C',
          isStaffGroup: false,
          items: [
            { id: '1385205', name: 'Ainasoja Ojeda, Mateo', establishmentId: null },
          ],
        },
      ],
    }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify(data),
      json: async () => data,
    })

    api.isLoggedIn = true
    const classmates = await api.getClassmates({ id: '123' } as any)
    expect(classmates).toHaveLength(1)
    expect(classmates[0].className).toBe('8C')
    expect(classmates[0].firstname).toBe('Mateo')
    expect(classmates[0].lastname).toBe('Ainasoja Ojeda')
  })

  it('should get teachers (staff group by title)', async () => {
    const data = {
      groupConfig: [
        {
          id: -1,
          title: 'Skolans personal',
          isStaffGroup: false,
          items: [
            {
              id: '869265',
              name: 'Abbasi, Ashwagh',
              email: 'ashwagh@skolan.se',
              phone: '08-123456',
            },
          ],
        },
      ],
    }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify(data),
      json: async () => data,
    })

    api.isLoggedIn = true
    const teachers = await api.getTeachers({ id: '123' } as any)
    expect(teachers).toHaveLength(1)
    expect(teachers[0].firstname).toBe('Ashwagh')
    expect(teachers[0].lastname).toBe('Abbasi')
    expect(teachers[0].email).toBe('ashwagh@skolan.se')
  })

  it('should refresh session silently on empty body and retry', async () => {
    // 1) appData -> tom body (död session)  2) retry efter refresh -> data
    // 3) hub-root HTML (barnnamn)
    // OBS: wrap() anropar båda metoderna (json/text) på svaret - mocken
    // måste efterlikna en riktig Fetch-response.
    const html =
      "<script>IMHome = { init: { selectedPupilName: 'Landgren, Sixten' } }</script>"
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => '',
        json: async () => ({}),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => '{"maxDate":"30-07-27"}',
        json: async () => ({ maxDate: '30-07-27' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => html,
        json: async () => ({}),
      })

    api.isLoggedIn = true
    const refreshSpy = jest
      .spyOn(api, 'silentSessionRefresh')
      .mockResolvedValue(true)

    const children = await api.getChildren()
    expect(refreshSpy).toHaveBeenCalledTimes(1)
    expect(children[0].name).toBe('Sixten Landgren')

    // Fortfarande tom body i nästa anrop: recovery försöker EN gång per
    // anrop (ingen loop - retry efter refresh körs utan recovery). Misslyckas
    // refreshen (t.ex. användaren godkänner ej BankID-pushen) ska API:et
    // logga ut (isLoggedIn=false + logout-event) så att appen hamnar på
    // inloggningsskärmen.
    refreshSpy.mockClear()
    refreshSpy.mockResolvedValue(false)
    mockFetch.mockReset()
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => '',
      json: async () => ({}),
    })
    const emitSpy = jest.spyOn(api, 'emit')
    const afterRefresh = await api.getChildren()
    expect(refreshSpy).toHaveBeenCalledTimes(1)
    expect(afterRefresh[0].name).toBe('Mitt barn')
    expect(api.isLoggedIn).toBe(false)
    expect(emitSpy).toHaveBeenCalledWith('logout')
  })

  it('should logout', async () => {
    api.isLoggedIn = true
    await api.logout()
    expect(mockCookieManager.clearAll).toHaveBeenCalled()
    expect(api.isLoggedIn).toBe(false)
  })
})
