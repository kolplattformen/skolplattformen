import { ApiHjarntorget } from './apiHjarntorget'
import { Api, FetcherOptions, Fetch, RNCookieManager,
  ToughCookieJar,
  wrapReactNativeCookieManager,
  wrapToughCookie } from '@skolplattformen/api'

const init = (
  fetchImpl: Fetch,
  cookieManagerImpl: any,
  options?: FetcherOptions
): Api => {
  // prettier-ignore
  const cookieManager = ((cookieManagerImpl as RNCookieManager).get)
    ? wrapReactNativeCookieManager(cookieManagerImpl as RNCookieManager)
    : wrapToughCookie(cookieManagerImpl as ToughCookieJar)
  return new ApiHjarntorget(fetchImpl, cookieManager, options)
}

export default init
