import { Api } from '../../api/lib/api'
import { FetcherOptions } from '../../api/lib/fetcher'
import { Fetch } from '../../api/lib/types'
import {
  RNCookieManager,
  ToughCookieJar,
  wrapReactNativeCookieManager,
  wrapToughCookie,
} from '../../api/lib/cookies'
import { ApiHjarntorget } from './apiHjarntorget'

export { Api, FetcherOptions }
export * from '../../api/lib/types'
export { LoginStatusChecker } from '../../api/lib/loginStatus'

const init = (
  fetch: Fetch,
  cookieManagerImpl: RNCookieManager | ToughCookieJar,
  options?: FetcherOptions
): Api => {
  // prettier-ignore
  const cookieManager = ((cookieManagerImpl as RNCookieManager).get)
    ? wrapReactNativeCookieManager(cookieManagerImpl as RNCookieManager)
    : wrapToughCookie(cookieManagerImpl as ToughCookieJar)
  return new ApiHjarntorget(fetch, cookieManager, options)
}

export default init