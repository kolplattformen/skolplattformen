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

// prettier-ignore
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

  const api = new ApiInfomentor({
    fetch: fetchImpl as any,
    cookieManager,
    options,
    idp: idp || 'stockholm_par',
    sessionCookie,
  })

  // Vid kallstart: prova återuppta sessionen ur den nativa cookie-store:n
  // (BankID behövs bara när sessionen verkligen dött - tyst refresh med
  // BankID-push sker annars automatiskt, fallback login-skärm).
  // Hoppas över i dev-session-läge (env-sessionen injiceras vid login).
  if (!sessionCookie) {
    void api.resumeSession()
  }

  return api
}

export default init
