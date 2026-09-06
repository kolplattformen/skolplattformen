import {
  Api,
  Fetch,
  FetcherOptions,
  RNCookieManager,
  ToughCookieJar,
  wrapReactNativeCookieManager,
  wrapToughCookie,
} from '@skolplattformen/api'
import { ApiSchoolsoft } from './api'
export { features } from './features'

// prettier-ignore
const init = (
  fetchImpl: Fetch,
  cookieManagerImpl: RNCookieManager | ToughCookieJar,
  options?: FetcherOptions,
  config?: {
    school?: string
    baseUrl?: string
    sessionCookie?: string
    pollIntervalMs?: number
    loginTimeoutMs?: number
  }
): Api => {
  // prettier-ignore
  const cookieManager = ((cookieManagerImpl as RNCookieManager).get)
    ? wrapReactNativeCookieManager(cookieManagerImpl as RNCookieManager)
    : wrapToughCookie(cookieManagerImpl as ToughCookieJar)

  const api = new ApiSchoolsoft({
    fetch: fetchImpl,
    cookieManager,
    options,
    school: config?.school,
    baseUrl: config?.baseUrl,
    sessionCookie: config?.sessionCookie,
    pollIntervalMs: config?.pollIntervalMs,
    loginTimeoutMs: config?.loginTimeoutMs,
  })

  // Schoolsoft saknar native-store-flöde - sessionen finns bara om en
  // sessionCookie matats in (dev-harness), då återupptas den direkt.
  if (config?.sessionCookie) {
    void api.resumeSession()
  }

  return api
}

export default init
