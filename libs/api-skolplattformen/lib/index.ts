import { ApiSkolplattformen } from './api'
import { FetcherOptions } from '../../api/lib/fetcher'
import { Fetch } from '../../api/lib/types'
import {
  RNCookieManager,
  ToughCookieJar,
  wrapReactNativeCookieManager,
  wrapToughCookie,
} from '../../api/lib/cookies'

export { ApiSkolplattformen as Api, FetcherOptions }
export * from '../../api/lib/types'
export { LoginStatusChecker } from '../../api/lib/loginStatus'

const init = (
  fetch: Fetch,
  cookieManagerImpl: RNCookieManager | ToughCookieJar,
  options?: FetcherOptions
): ApiSkolplattformen => {
  // prettier-ignore
  const cookieManager = ((cookieManagerImpl as RNCookieManager).get)
    ? wrapReactNativeCookieManager(cookieManagerImpl as RNCookieManager)
    : wrapToughCookie(cookieManagerImpl as ToughCookieJar)
  return new ApiSkolplattformen(fetch, cookieManager, options)
}

export default init
