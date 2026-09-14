/* eslint-disable no-console */
/** Probe: finns initialize=qr på BankID-sidan? (UI3 QR-kod-flow) */
import { CookieJar } from 'tough-cookie'
import init from '../lib'
import { Fetch, RequestInit } from '@skolplattformen/api'

const jar = new CookieJar()
const MAX_HOPS = 12

const loggedFetch = (async (inputUrl: string, init: RequestInit = {}): Promise<any> => {
  let url = inputUrl
  let method = (init.method || 'GET').toUpperCase()
  let body: any = init.body
  let headers: Record<string, string> = { ...((init.headers as any) || {}) }
  for (let hop = 0; hop < MAX_HOPS; hop++) {
    const cookieHeader = await jar.getCookieString(url)
    const finalHeaders: Record<string, string> = { ...headers }
    if (cookieHeader && !finalHeaders.Cookie) finalHeaders.Cookie = cookieHeader
    const res = await fetch(url, { method, headers: finalHeaders, body, redirect: 'manual' } as any)
    const setCookies: string[] = (res.headers as any).getSetCookie?.() || []
    for (const c of setCookies) await jar.setCookie(c, url)
    if ([301, 302, 303, 307, 308].includes(res.status)) {
      const location = res.headers.get('location')
      await res.text().catch(() => undefined)
      if (!location) throw new Error(`Redirect utan Location från ${url}`)
      url = new URL(location, url).toString()
      if ([301, 302, 303].includes(res.status) && method !== 'GET') {
        method = 'GET'; body = undefined; headers = {}
      }
      continue
    }
    if (!res.url) { try { Object.defineProperty(res, 'url', { value: url }) } catch { } }
    return res
  }
  throw new Error(`För många redirects från ${inputUrl}`)
}) as unknown as Fetch

const main = async (): Promise<void> => {
  const api = init(loggedFetch, jar as any, undefined, 'stockholm_par')
  console.log('Starting SSO to BankID page...')
  // Reproducera login()-kedjan fram till BankID-sidan (utan initializering)
  const ssoUrl = `https://sso.infomentor.se/login.ashx?idp=stockholm_par`
  let pageUrl = ssoUrl
  for (let i = 0; i < 8; i++) {
    const response = (await loggedFetch(pageUrl, { redirect: 'follow' })) as any
    pageUrl = response.url || pageUrl
    const body = await response.text()
    const hasForm = body.includes('<form')
    const saml = body.includes('SAMLResponse') || body.includes('SAMLRequest')
    if (hasForm && saml) {
      console.log('SAML form page - stoppar här (behövs inte för probe)')
      return
    }
    if (body.includes('NECSadc/mbid')) {
      const href = pageUrl // följ via regex är robust nog: extrahera href
      const m = body.match(/href="([^"]*NECSadc\/mbid[^"]*)"/)
      const mbidUrl = new URL(m ? m[1] : href, pageUrl).toString()
      const r = (await loggedFetch(mbidUrl, { redirect: 'follow' })) as any
      pageUrl = r.url || mbidUrl
      continue
    }
    break
  }
  console.log('BankID-sida:', pageUrl.substring(0, 100))

  // testa initialize=qr
  for (const param of ['qr', 'initializeqr', 'startqr']) {
    const url = `${pageUrl}&initialize=${param}&_=${Date.now()}`
    const res = (await loggedFetch(url, { redirect: 'manual' })) as any
    const text = await res.text()
    let parsed: any = null
    try { parsed = JSON.parse(text) } catch { /* not json */ }
    console.log(`initialize=${param}: ${res.status} json-keys: ${parsed ? Object.keys(parsed).join(',') : 'icke-JSON'} body(120): ${text.replace(/\s+/g, ' ').substring(0, 400)}`)
  }
}

main().catch((e) => { console.error('FEL:', e); process.exit(1) })
