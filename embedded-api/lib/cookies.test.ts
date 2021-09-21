import {
  deserialize,
  serialize,
  wrapToughCookie,
  wrapReactNativeCookieManager,
} from './cookies'
import { Cookie, CookieManager } from './types'
import { CookieJar } from 'tough-cookie'
import RNCookieManager from '@react-native-cookies/cookies'

describe('CookieManager', () => {
  describe('deserialize', () => {
    it('deserializes cookies with only name and value', () => {
      const cookieStr = 'foo=bar'
      const cookie: Cookie = {
        name: 'foo',
        value: 'bar',
      }

      expect(deserialize(cookieStr)).toEqual(cookie)
    })
    it('deserializes cookies with Expires', () => {
      const cookieStr = 'foo=bar; Expires=Tue, 09 Mar 2021 08:27:48 GMT'
      const cookie: Cookie = {
        name: 'foo',
        value: 'bar',
        expires: 'Tue, 09 Mar 2021 08:27:48 GMT',
      }

      expect(deserialize(cookieStr)).toEqual(cookie)
    })
    it('deserializes cookies with Domain', () => {
      const cookieStr = 'foo=bar; Domain=.stockholm.se'
      const cookie: Cookie = {
        name: 'foo',
        value: 'bar',
        domain: '.stockholm.se',
      }

      expect(deserialize(cookieStr)).toEqual(cookie)
    })
    it('deserializes cookies with Path', () => {
      const cookieStr = 'foo=bar; Path=/'
      const cookie: Cookie = {
        name: 'foo',
        value: 'bar',
        path: '/',
      }

      expect(deserialize(cookieStr)).toEqual(cookie)
    })
    it('deserializes cookies with Secure', () => {
      const cookieStr = 'foo=bar; Secure'
      const cookie: Cookie = {
        name: 'foo',
        value: 'bar',
        secure: true,
      }

      expect(deserialize(cookieStr)).toEqual(cookie)
    })
    it('deserializes cookies with HttpOnly', () => {
      const cookieStr = 'foo=bar; HttpOnly'
      const cookie: Cookie = {
        name: 'foo',
        value: 'bar',
        httpOnly: true,
      }

      expect(deserialize(cookieStr)).toEqual(cookie)
    })
    it('deserializes cookies with HTTPOnly', () => {
      const cookieStr = 'foo=bar; HTTPOnly'
      const cookie: Cookie = {
        name: 'foo',
        value: 'bar',
        httpOnly: true,
      }

      expect(deserialize(cookieStr)).toEqual(cookie)
    })
    it('deserializes cookies with all properties', () => {
      const cookieStr =
        'foo=bar; Expires=Tue, 09 Mar 2021 08:27:48 GMT; Domain=.stockholm.se; Path=/; Secure; HTTPOnly'
      const cookie: Cookie = {
        name: 'foo',
        value: 'bar',
        expires: 'Tue, 09 Mar 2021 08:27:48 GMT',
        domain: '.stockholm.se',
        path: '/',
        secure: true,
        httpOnly: true,
      }

      expect(deserialize(cookieStr)).toEqual(cookie)
    })
  })
  describe('serialize', () => {
    it('serializes cookies with only name and value', () => {
      const cookieStr = 'foo=bar'
      const cookie: Cookie = {
        name: 'foo',
        value: 'bar',
      }

      expect(serialize(cookie)).toEqual(cookieStr)
    })
    it('serializes cookies with Expires', () => {
      const cookieStr = 'foo=bar; Expires=Tue, 09 Mar 2021 08:27:48 GMT'
      const cookie: Cookie = {
        name: 'foo',
        value: 'bar',
        expires: 'Tue, 09 Mar 2021 08:27:48 GMT',
      }

      expect(serialize(cookie)).toEqual(cookieStr)
    })
    it('serializes cookies with Domain', () => {
      const cookieStr = 'foo=bar; Domain=.stockholm.se'
      const cookie: Cookie = {
        name: 'foo',
        value: 'bar',
        domain: '.stockholm.se',
      }

      expect(serialize(cookie)).toEqual(cookieStr)
    })
    it('serializes cookies with Path', () => {
      const cookieStr = 'foo=bar; Path=/'
      const cookie: Cookie = {
        name: 'foo',
        value: 'bar',
        path: '/',
      }

      expect(serialize(cookie)).toEqual(cookieStr)
    })
    it('serializes cookies with Secure', () => {
      const cookieStr = 'foo=bar; Secure'
      const cookie: Cookie = {
        name: 'foo',
        value: 'bar',
        secure: true,
      }

      expect(serialize(cookie)).toEqual(cookieStr)
    })
    it('serializes cookies with HttpOnly', () => {
      const cookieStr = 'foo=bar; HttpOnly'
      const cookie: Cookie = {
        name: 'foo',
        value: 'bar',
        httpOnly: true,
      }

      expect(serialize(cookie)).toEqual(cookieStr)
    })
    it('serializes cookies with all properties', () => {
      const cookieStr =
        'foo=bar; Expires=Tue, 09 Mar 2021 08:27:48 GMT; Domain=.stockholm.se; Path=/; Secure; HttpOnly'
      const cookie: Cookie = {
        name: 'foo',
        value: 'bar',
        expires: 'Tue, 09 Mar 2021 08:27:48 GMT',
        domain: '.stockholm.se',
        path: '/',
        secure: true,
        httpOnly: true,
      }

      expect(serialize(cookie)).toEqual(cookieStr)
    })
  })
  describe('wrap', () => {
    describe('tough cookie', () => {
      let jar: CookieJar
      let manager: CookieManager
      beforeEach(() => {
        jar = new CookieJar()
        manager = wrapToughCookie(jar)
      })
      it('handles getCookieString', async () => {
        const url = 'https://etjanster.stockholm.se/'
        const cookieStr =
          'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly'

        await jar.setCookie(cookieStr, url)
        const storedCookies = await manager.getCookieString(
          'https://foo.stockholm.se/bar/baz'
        )
        expect(storedCookies).toEqual('foo=bar')
      })
      it('handles getCookies', async () => {
        const url = 'https://etjanster.stockholm.se/'
        const cookieStr =
          'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly'
        const cookie: Cookie = {
          name: 'foo',
          value: 'bar',
          domain: 'stockholm.se',
          path: '/',
          secure: true,
          httpOnly: true,
        }

        await jar.setCookie(cookieStr, url)
        const storedCookies = await manager.getCookies(
          'https://foo.stockholm.se/bar/baz'
        )

        expect(storedCookies).toHaveLength(1)
        expect(storedCookies[0]).toEqual(cookie)
      })
      it('handles setCookie', async () => {
        const url = 'https://etjanster.stockholm.se/'
        const cookie: Cookie = {
          name: 'foo',
          value: 'bar',
          domain: 'stockholm.se',
          path: '/',
          secure: true,
          httpOnly: true,
        }

        await manager.setCookie(cookie, url)

        const cookies = await jar.getCookieString(url)
        expect(cookies).toEqual('foo=bar')
      })
      it('handles setCookieString', async () => {
        const url = 'https://etjanster.stockholm.se/'
        const cookieStr =
          'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly'

        await manager.setCookieString(cookieStr, url)

        const cookies = await jar.getCookieString(url)
        expect(cookies).toEqual('foo=bar')
      })
      it('handles clearAll', async () => {
        const url = 'https://etjanster.stockholm.se/'
        const cookieStr =
          'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly'

        await manager.setCookieString(cookieStr, url)
        await manager.clearAll()
        const cookies = await jar.getCookieString(url)

        expect(cookies).toEqual('')
      })
    })
    describe('@react-native-cookies/cookies', () => {
      let manager: CookieManager
      beforeEach(async () => {
        await RNCookieManager.clearAll()
        manager = wrapReactNativeCookieManager(RNCookieManager)
      })
      it('handles getCookieString', async () => {
        const url = 'https://etjanster.stockholm.se/'
        const cookieStr =
          'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly'

        await RNCookieManager.setFromResponse(url, cookieStr)
        const storedCookies = await manager.getCookieString(
          'https://foo.stockholm.se/bar/baz'
        )
        expect(storedCookies).toEqual('foo=bar')
      })
      it('handles getCookies', async () => {
        const url = 'https://etjanster.stockholm.se/'
        const cookieStr =
          'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly'
        const cookie: Cookie = {
          name: 'foo',
          value: 'bar',
          domain: 'stockholm.se',
          path: '/',
          secure: true,
          httpOnly: true,
        }

        await RNCookieManager.setFromResponse(url, cookieStr)
        const storedCookies = await manager.getCookies(
          'https://foo.stockholm.se/bar/baz'
        )

        expect(storedCookies).toHaveLength(1)
        expect(storedCookies[0]).toEqual(cookie)
      })
      it('handles setCookie', async () => {
        const url = 'https://etjanster.stockholm.se/'
        const cookie: Cookie = {
          name: 'foo',
          value: 'bar',
          domain: 'stockholm.se',
          path: '/',
          secure: true,
          httpOnly: true,
        }

        await manager.setCookie(cookie, url)
        const cookies = await RNCookieManager.get(url)

        expect(cookies).toHaveProperty('foo')
        expect(cookies['foo'].value).toEqual('bar')
      })
      it('handles setCookieString', async () => {
        const url = 'https://etjanster.stockholm.se/'
        const cookieStr =
          'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly'

        await manager.setCookieString(cookieStr, url)
        const cookies = await RNCookieManager.get(url)

        expect(cookies).toHaveProperty('foo')
        expect(cookies['foo'].value).toEqual('bar')
      })
      it('handles clearAll', async () => {
        const url = 'https://etjanster.stockholm.se/'
        const cookieStr =
          'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly'

        await manager.setCookieString(cookieStr, url)
        await manager.clearAll()
        const cookies = await RNCookieManager.get(url)

        expect(cookies).toEqual({})
      })
    })
  })
})
