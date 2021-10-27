import { Api } from './api'
import {
  RNCookieManager,
  ToughCookieJar,
  wrapReactNativeCookieManager,
  wrapToughCookie,
} from './cookies'
import { FetcherOptions } from './fetcher'
import { Fetch } from './types'

export { LoginStatusChecker } from './loginStatus'
export * from './types'
export { Api, FetcherOptions }

const init = (
  fetchImpl: Fetch,
  cookieManagerImpl: RNCookieManager | ToughCookieJar,
  options?: FetcherOptions
): Api => {
  // prettier-ignore
  const cookieManager = ((cookieManagerImpl as RNCookieManager).get)
    ? wrapReactNativeCookieManager(cookieManagerImpl as RNCookieManager)
    : wrapToughCookie(cookieManagerImpl as ToughCookieJar)
  return new Api(fetchImpl, cookieManager, options)
}

export default init
