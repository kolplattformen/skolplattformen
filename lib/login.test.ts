import axios, { AxiosInstance } from 'axios'
import { login, checkStatus, getCookie } from './login'

jest.mock('axios')

let client: jest.Mocked<AxiosInstance>

describe('login', () => {
  beforeEach(() => {
    client = axios.create() as jest.Mocked<AxiosInstance>
    client.get.mockReset()
    client.post.mockReset()
  })
  describe('#login', () => {
    it('returns the correct result', async () => {
      const personalNumber = 'my personal number'
      const data = {
        token: '9462cf77-bde9-4029-bb41-e599f3094613',
        order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
      }

      client.post.mockResolvedValue({ data })
      const result = await login(client)(personalNumber)

      expect(result).toEqual({ order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663' })
    })
  })
  describe('#checkStatus', () => {
    const ticket = { order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663' }

    it('emits PENDING', (done) => {
      client.get.mockResolvedValue({ data: 'PENDING' })

      const check = checkStatus(client)(ticket)
      check.on('PENDING', async () => {
        await check.cancel()
        done()
      })
    })
    it('retries on PENDING', (done) => {
      client.get.mockResolvedValueOnce({ data: 'PENDING' })
      client.get.mockResolvedValueOnce({ data: 'OK' })

      const check = checkStatus(client)(ticket)
      check.on('OK', () => {
        expect(client.get).toHaveBeenCalledTimes(2)
        done()
      })
    })
  })
  describe('#getCookie', () => {
    it('sets cookie as client interceptor', async () => {
      client.get.mockResolvedValue({
        headers: {
          'set-cookie': 'cookie',
        },
      })

      const cookie = await getCookie(client)()

      expect(cookie).toEqual('cookie')
    })
  })
})
