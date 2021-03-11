import { camelCase, pascalCase } from 'change-case'
import { Cookie, CookieManager } from './types'

interface IndexableCookie extends Cookie {
  [key: string]: string|boolean|undefined
}
interface Serializer {
  (cookie: Cookie): string
}
interface Deserializer {
  (cookieString: string): Cookie
}
export const serialize: Serializer = (cookie) => {
  const ic = <IndexableCookie>cookie
  const tokens = [`${ic.name}=${ic.value}`]

  const keyVals = ['expires', 'domain', 'path']
  keyVals.filter((key) => ic[key]).forEach((key) => {
    tokens.push(`${pascalCase(key)}=${ic[key]}`)
  })

  const bools = ['secure', 'httpOnly']
  bools.filter((key) => ic[key]).forEach((key) => {
    tokens.push(pascalCase(key))
  })

  return tokens.join('; ')
}
export const deserialize: Deserializer = (cookieString) => {
  const [nameVal, ...others] = cookieString.split(';').map((token) => token.trim())
  const [name, value] = nameVal.split('=')

  const cookie: Cookie = {
    name,
    value,
  }

  others.map((keyVal) => keyVal.split('=')).forEach(([key, val]) => {
    const prop = camelCase(key)
    // eslint-disable-next-line default-case
    switch (prop) {
      case 'expires':
      case 'domain':
      case 'path':
        cookie[prop] = val
        break
      case 'secure':
      case 'httpOnly':
        cookie[prop] = true
        break
    }
  })

  return cookie
}

interface ToughCookie {
  toString: () => string
}
export interface ToughCookieJar {
  getCookieString: (url: string) => Promise<string>
  getCookies: (url: string) => Promise<ToughCookie[]>
  setCookie: (cookie: string, url: string) => Promise<any>
  removeAllCookies: () => Promise<void>
}
export const wrapToughCookie = (jar: ToughCookieJar): CookieManager => ({
  getCookieString: (url) => jar.getCookieString(url),
  getCookies: async (url) => {
    const cookies = await jar.getCookies(url)
    return cookies.map((cookie) => deserialize(cookie.toString()))
  },
  setCookie: async (cookie, url) => {
    await jar.setCookie(serialize(cookie), url)
  },
  setCookieString: async (cookieString, url) => {
    await jar.setCookie(cookieString, url)
  },
  clearAll: () => jar.removeAllCookies(),
})

interface RNCookies {
  [key: string]: Cookie
}
export interface RNCookieManager {
  set(url: string, cookie: Cookie, useWebKit?: boolean): Promise<boolean>
  setFromResponse(url: string, cookie: string): Promise<boolean>
  get(url: string, useWebKit?: boolean): Promise<RNCookies>
  clearAll(useWebKit?: boolean): Promise<boolean>
}
export const wrapReactNativeCookieManager = (rnc: RNCookieManager): CookieManager => ({
  clearAll: () => rnc.clearAll().then(),
  getCookieString: async (url) => {
    const cookies = await rnc.get(url)
    return Object.values(cookies)
      .map((c) => `${c.name}=${c.value}`).join('; ')
  },
  getCookies: async (url) => {
    const cookies = await rnc.get(url)
    return Object.values(cookies)
  },
  setCookie: async (cookie, url) => {
    await rnc.setFromResponse(url, serialize(cookie))
  },
  setCookieString: async (cookieString, url) => {
    await rnc.setFromResponse(url, cookieString)
  },
})
