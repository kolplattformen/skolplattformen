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

  // Återuppta session ur native cookie-jar vid varje boot: RN-cookie:n
  // lever kvar mellan omstart/JS-reload. Ser den döda ut (redirect till
  // Login.jsp) sker ingen login-event - inloggningsskärmen visas som vanligt.
  void api.resumeSession()

  return api
}

export default init
