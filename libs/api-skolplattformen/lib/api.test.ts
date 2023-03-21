import init from './'
import { ApiSkolplattformen } from './api'
import { Fetch, Headers, Response } from '@skolplattformen/api'
import CookieManager from '@react-native-cookies/cookies'

jest.mock('@react-native-cookies/cookies')

describe('api', () => {
  let fetch: jest.Mocked<Fetch>
  let response: jest.Mocked<Response>
  let headers: jest.Mocked<Headers>
  let api: ApiSkolplattformen
  beforeEach(() => {
    headers = { get: jest.fn() }
    response = {
      json: jest.fn(),
      text: jest.fn(),
      ok: true,
      status: 200,
      statusText: 'ok',
      headers,
    }
    fetch = jest.fn().mockResolvedValue(response)
    response.text.mockResolvedValue('<html></html>')
    CookieManager.clearAll()
    api = init(fetch, CookieManager) as ApiSkolplattformen
  })
  describe('#login', () => {
    it('exposes token', async () => {
      const data = {
        token: '9462cf77-bde9-4029-bb41-e599f3094613',
        order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
      }
      response.json.mockResolvedValue(data)

      const personalNumber = 'my personal number'
      const status = await api.login(personalNumber)

      expect(status.token).toEqual(data.token)
      status.cancel()
    })
    it('emits PENDING', (done) => {
      const data = {
        token: '9462cf77-bde9-4029-bb41-e599f3094613',
        order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
      }
      const pending = { state: 'PENDING' }
      response.json.mockResolvedValue(data)
      response.json.mockResolvedValue(pending)

      const personalNumber = 'my personal number'
      api.login(personalNumber).then((status) => {
        status.on('PENDING', async () => {
          status.cancel()
          done()
        })
      })
    })
    it('retries on PENDING', (done) => {
      const data = {
        token: '9462cf77-bde9-4029-bb41-e599f3094613',
        order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
      }
      const pending = { state: 'PENDING' }
      const ok = { state: 'OK' }
      response.json.mockResolvedValue(data)
      response.json.mockResolvedValueOnce(pending)
      response.json.mockResolvedValueOnce(ok)

      const personalNumber = 'my personal number'
      api.login(personalNumber).then((status) => {
        status.on('OK', () => {
          expect(fetch).toHaveBeenCalledTimes(3)
          done()
        })
      })
    })
    it('remembers used personal number', async () => {
      const data = {
        token: '9462cf77-bde9-4029-bb41-e599f3094613',
        order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
      }
      response.json.mockResolvedValue(data)

      const personalNumber = 'my personal number'
      await api.login(personalNumber)

      expect(api.getPersonalNumber()).toEqual(personalNumber)
    })
    it('forgets used personal number if sign in is unsuccessful', (done) => {
      const data = {
        token: '9462cf77-bde9-4029-bb41-e599f3094613',
        order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
      }
      const error = { state: 'ERROR' }
      response.json.mockResolvedValue(data)
      response.json.mockResolvedValue(error)

      const personalNumber = 'my personal number'
      api.login(personalNumber).then((status) => {
        status.on('ERROR', () => {
          expect(api.getPersonalNumber()).toEqual(undefined)
          done()
        })
      })
    })
    it('throws error on external api error', async () => {
      expect.hasAssertions()

      const data = ''
      response.json.mockResolvedValue(data)
      response.ok = false
      response.status = 500
      response.statusText = 'Internal Server Error'

      const personalNumber = 'my personal number'
      try {
        await api.login(personalNumber)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        expect(error.message).toEqual(expect.stringContaining('Server Error'))
      }
    })
  })
  describe('#logout', () => {
    it('clears session', async () => {
      await api.logout()
      const session = await api.getSession('')
      expect(session).toEqual({
        headers: {
          cookie: '',
        },
      })
    })
    it('emits logout event', async () => {
      const listener = jest.fn()
      api.on('logout', listener)
      await api.logout()
      expect(listener).toHaveBeenCalled()
    })
    it('sets .isLoggedIn', async () => {
      api.isLoggedIn = true
      await api.logout()
      expect(api.isLoggedIn).toBe(false)
    })
    it('forgets personalNumber', async () => {
      const data = {
        token: '9462cf77-bde9-4029-bb41-e599f3094613',
        order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
      }
      response.json.mockResolvedValue(data)

      const pnr = 'my personal number'
      await api.login(pnr)
      api.isLoggedIn = true

      await api.logout()

      expect(api.getPersonalNumber()).toEqual(undefined)
    })
  })
  describe('fake', () => {
    it('sets fake mode for the correct pnr:s', async () => {
      let status

      status = await api.login('121212121212')
      expect(status.token).toEqual('fake')

      status = await api.login('201212121212')
      expect(status.token).toEqual('fake')

      status = await api.login('1212121212')
      expect(status.token).toEqual('fake')
    })
    it('delivers fake data', (done) => {
      api.on('login', async () => {
        const user = await api.getUser()
        expect(user).toEqual({
          firstName: 'Namn',
          lastName: 'Namnsson',
          isAuthenticated: true,
          personalNumber: '195001182046',
        })

        const children = await api.getChildren()
        expect(children).toHaveLength(2)

        const calendar1 = await api.getCalendar(children[0])
        expect(calendar1).toHaveLength(20)
        const calendar2 = await api.getCalendar(children[1])
        expect(calendar2).toHaveLength(18)

        const skola24Children = await api.getSkola24Children()
        expect(skola24Children).toHaveLength(1)

        const timetable = await api.getTimetable(
          skola24Children[0],
          2021,
          15,
          'sv'
        )
        expect(timetable).toHaveLength(32)

        done()
      })

      api.login('121212121212')
    })
  })
})
