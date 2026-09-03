import {
  Api,
  Fetch,
  FetcherOptions,
  RNCookieManager,
  ToughCookieJar,
  wrapReactNativeCookieManager,
  wrapToughCookie,
} from '@skolplattformen/api'
import { ApiInfomentor } from './api'
export { features } from './features'

const init = (
  fetchImpl: Fetch,
  cookieManagerImpl: RNCookieManager | ToughCookieJar,
  options?: FetcherOptions,
  idp?: string,
  sessionCookie?: string
): Api => {
  // prettier-ignore
  const cookieManager = ((cookieManagerImpl as RNCookieManager).get)
    ? wrapReactNativeCookieManager(cookieManagerImpl as RNCookieManager)
    : wrapToughCookie(cookieManagerImpl as ToughCookieJar)

  return new ApiInfomentor({
    fetch: fetchImpl as any,
    cookieManager,
    options,
    idp: idp || 'stockholm_par',
    sessionCookie,
  })
}

export default init
