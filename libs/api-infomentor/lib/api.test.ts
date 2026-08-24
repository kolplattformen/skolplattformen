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
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        children: [
          {
            id: '123',
            firstName: 'Test',
            lastName: 'Testsson',
          },
        ],
      }),
    })

    api.isLoggedIn = true
    const children = await api.getChildren()
    expect(children).toHaveLength(1)
    expect(children[0].name).toBe('Test Testsson')
  })

  it('should get calendar', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        entries: [
          {
            id: '1',
            title: 'Test Event',
            startDate: '2024-01-01T10:00:00',
            endDate: '2024-01-01T11:00:00',
            allDay: false,
          },
        ],
      }),
    })

    api.isLoggedIn = true
    const calendar = await api.getCalendar({ id: '123' } as any)
    expect(calendar).toHaveLength(1)
    expect(calendar[0].title).toBe('Test Event')
  })

  it('should get news', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        newsItems: [
          {
            id: '1',
            title: 'Test News',
            publishedDate: '2024-01-01',
          },
        ],
      }),
    })

    api.isLoggedIn = true
    const news = await api.getNews({ id: '123' } as any)
    expect(news).toHaveLength(1)
    expect(news[0].header).toBe('Test News')
  })

  it('should get notifications', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        notifications: [
          {
            id: '1',
            sender: 'Test Sender',
            message: 'Test Message',
            dateCreated: '2024-01-01',
            dateModified: '2024-01-01',
            url: 'https://test.com',
            type: 'info',
          },
        ],
      }),
    })

    api.isLoggedIn = true
    const notifications = await api.getNotifications({ id: '123' } as any)
    expect(notifications).toHaveLength(1)
    expect(notifications[0].message).toBe('Test Message')
  })

  it('should logout', async () => {
    api.isLoggedIn = true
    await api.logout()
    expect(mockCookieManager.clearAll).toHaveBeenCalled()
    expect(api.isLoggedIn).toBe(false)
  })
})
