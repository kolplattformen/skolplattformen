import { Api } from './api'
import { FetcherOptions } from './fetcher'
import { Fetch } from './types'
import {
  RNCookieManager,
  ToughCookieJar,
  wrapReactNativeCookieManager,
  wrapToughCookie,
} from './cookies'

export { Api, FetcherOptions }
export * from './types'
export { LoginStatusChecker } from './loginStatus'

const init = (
  fetch: Fetch,
  cookieManagerImpl: RNCookieManager | ToughCookieJar,
  options?: FetcherOptions
): Api => {
  // prettier-ignore
  const cookieManager = ((cookieManagerImpl as RNCookieManager).get)
    ? wrapReactNativeCookieManager(cookieManagerImpl as RNCookieManager)
    : wrapToughCookie(cookieManagerImpl as ToughCookieJar)
  return new Api(fetch, cookieManager, options)
}

export default init
