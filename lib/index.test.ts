import init, { Api } from './'
import { list } from './children'
import { Fetch } from './types'

jest.mock('./login', () => {
  login: jest.fn()
})

describe('api', () => {
  let fetch: jest.Mocked<Fetch>
  let clearCookies: jest.Mock
  let api: Api
  beforeEach(() => {
    fetch = jest.fn()
    clearCookies = jest.fn()
    api = init(fetch, clearCookies)
  })
  describe('#logout', () => {
    it('clears cookies', async () => {
      await api.logout()
      expect(clearCookies).toHaveBeenCalled()
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
  })
})
