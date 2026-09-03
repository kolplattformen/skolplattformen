/* eslint-disable no-console */
/** Probe 2: innehåller verifyorder-svaret nästa QR-frame? + hur ser state ut */
import { CookieJar } from 'tough-cookie'
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
      if (!location) throw new Error('redirect utan location')
      url = new URL(location, url).toString()
      if ([301, 302, 303].includes(res.status) && method !== 'GET') {
        method = 'GET'; body = undefined; headers = {}
      }
      continue
    }
    if (!res.url) { try { Object.defineProperty(res, 'url', { value: url }) } catch { } }
    return res
  }
  throw new Error('för många redirects')
}) as unknown as Fetch

const main = async (): Promise<void> => {
  // färsk SSO-kedja till BankID-sidan (samma stil som probe-qr.ts)
  let pageUrl = 'https://sso.infomentor.se/login.ashx?idp=stockholm_par'
  for (let i = 0; i < 8; i++) {
    const response = (await loggedFetch(pageUrl, { redirect: 'follow' })) as any
    pageUrl = response.url || pageUrl
    const body = await response.text()
    if (body.includes('NECSadc/mbid')) {
      const m = body.match(/href="([^"]*NECSadc\/mbid[^"]*)"/)
      if (m) {
        const mbid = new URL(m[1], pageUrl).toString()
        const r = (await loggedFetch(mbid, { redirect: 'follow' })) as any
        pageUrl = r.url || mbid
        continue
      }
    }
    break
  }
  console.log('BankID-sida klar')
  const res = (await loggedFetch(`${pageUrl}&initialize=qr&_=${Date.now()}`, { redirect: 'manual' })) as any
  const init = JSON.parse(await res.text())
  console.log('qrData frame0:', init.qrData)

  for (let i = 0; i < 3; i++) {
    await new Promise((r) => setTimeout(r, 1200))
    const st = (await loggedFetch(`${pageUrl}&verifyorder=${init.order}&_=${Date.now()}`, { redirect: 'manual' })) as any
    const text = await st.text()
    console.log(`poll ${i + 1} [${st.status}]:`, text.substring(0, 300))
    if (st.status !== 200) break
    const data = JSON.parse(text)
    if (data.qrData && data.qrData !== init.qrData) {
      console.log('>>> NIU QR-DATA I POLL:', data.qrData)
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
