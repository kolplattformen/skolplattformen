import {
  Api,
  Fetch,
  FetcherOptions,
  RNCookieManager,
  ToughCookieJar,
  wrapReactNativeCookieManager,
  wrapToughCookie,
} from '@skolplattformen/api'
import { ApiHjarntorget } from './apiHjarntorget'
export { features } from './features'

const init = (
  fetchImpl: Fetch,
  cookieManagerImpl: RNCookieManager | ToughCookieJar,
  options?: FetcherOptions
): Api => {
  // prettier-ignore
  const cookieManager = ((cookieManagerImpl as RNCookieManager).get)
    ? wrapReactNativeCookieManager(cookieManagerImpl as RNCookieManager)
    : wrapToughCookie(cookieManagerImpl as ToughCookieJar)
  return new ApiHjarntorget(fetchImpl as any, cookieManager, options)
}

export default init
