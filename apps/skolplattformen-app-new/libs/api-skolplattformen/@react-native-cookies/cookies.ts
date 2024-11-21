import { CookieJar, Cookie as TCookie } from 'tough-cookie'

export interface Cookie {
  name: string
  value: string
  path?: string
  domain?: string
  version?: string
  expires?: string
  secure?: boolean
  httpOnly?: boolean
}

export interface Cookies {
  [key: string]: Cookie
}

export interface CookieManagerStatic {
  set(url: string, cookie: Cookie, useWebKit?: boolean): Promise<boolean>
  setFromResponse(url: string, cookie: string): Promise<boolean>

  get(url: string, useWebKit?: boolean): Promise<Cookies>

  clearAll(useWebKit?: boolean): Promise<boolean>
}

const convertTtoC = (cookie: string | TCookie): Cookie => {
  if (typeof cookie === 'string') {
    return convertTtoC(TCookie.parse(cookie) as TCookie)
  }
  return {
    name: cookie.key,
    value: cookie.value,
    domain: cookie.domain || undefined,
    expires:
      cookie.expires === 'Infinity' ? undefined : cookie.expires.toUTCString(),
    httpOnly: cookie.httpOnly || undefined,
    path: cookie.path || undefined,
    secure: cookie.secure,
  }
}
const convertCtoT = (cookie: Cookie): TCookie =>
  new TCookie({
    key: cookie.name,
    value: cookie.value,
    domain: cookie.domain,
    expires: cookie.expires ? new Date(cookie.expires) : undefined,
    httpOnly: cookie.httpOnly || false,
    path: cookie.path,
    secure: cookie.secure || false,
  })
const convertCookies = (cookies: TCookie[]): Cookies =>
  cookies.reduce(
    (map, cookie) => ({
      ...map,
      [cookie.key]: convertTtoC(cookie),
    }),
    {} as Cookies
  )

const jar = new CookieJar()
const CookieManager: CookieManagerStatic = {
  clearAll: async () => {
    await jar.removeAllCookies()
    return true
  },
  get: async (url) => {
    const cookies = await jar.getCookies(url)
    return convertCookies(cookies)
  },
  set: async (url, cookie) => {
    await jar.setCookie(convertCtoT(cookie), url)
    return true
  },
  setFromResponse: async (url, cookie) => {
    await jar.setCookie(cookie, url)
    return true
  },
}

export default CookieManager
