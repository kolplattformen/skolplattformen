import { login, checkStatus, getSessionCookie } from './login'
import { Fetch, Headers, Response } from './types'

describe('login', () => {
  let fetch: jest.Mocked<Fetch>
  let response: jest.Mocked<Response>
  let headers: jest.Mocked<Headers>
  beforeEach(() => {
    headers = { get: jest.fn() }
    response = {
      json: jest.fn(),
      text: jest.fn(),
      headers,
    }
    fetch = jest.fn().mockResolvedValue(response)
  })
  describe('#login', () => {
    it('returns the correct result', async () => {
      const personalNumber = 'my personal number'
      const data = {
        token: '9462cf77-bde9-4029-bb41-e599f3094613',
        order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
      }

      response.json.mockResolvedValue(data)
      const result = await login(fetch)(personalNumber)

      expect(result).toEqual(data)
    })
  })
  describe('#checkStatus', () => {
    const ticket = {
      token: '9462cf77-bde9-4029-bb41-e599f3094613',
      order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
    }
    it('exposes token', () => {
      response.text.mockResolvedValue('PENDING')

      const check = checkStatus(fetch)(ticket)
      expect(check.token).toEqual(ticket.token)
      check.cancel()
    })
    it('emits PENDING', (done) => {
      response.text.mockResolvedValue('PENDING')

      const check = checkStatus(fetch)(ticket)
      check.on('PENDING', async () => {
        await check.cancel()
        done()
      })
    })
    it('retries on PENDING', (done) => {
      response.text.mockResolvedValueOnce('PENDING')
      response.text.mockResolvedValueOnce('OK')

      const check = checkStatus(fetch)(ticket)
      check.on('OK', () => {
        expect(fetch).toHaveBeenCalledTimes(2)
        done()
      })
    })
  })
  describe('#getSessionCookie', () => {
    it('returns session cookie', async () => {
      headers.get.mockReturnValue('cookie')

      const cookie = await getSessionCookie(fetch)()

      expect(cookie).toEqual('cookie')
    })
  })
})
