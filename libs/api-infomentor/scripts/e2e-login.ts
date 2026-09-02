/* eslint-disable no-console */
/**
 * E2E-testharness för Infomentor SAML/BankID-login.
 *
 * Kör SAMMA adapterkod som appen, men i Node med tough-cookie jar och
 * full loggning av varje redirect-hopp, Set-Cookie (med domän) och
 * response-status. Syfte: se exakt var i cookie-dansen det brister,
 * utan att behöva bygga om appen för varje hypotes.
 *
 * Kör från repots rot:
 *   TS_NODE_PROJECT=tsconfig.base.json npx ts-node --transpile-only \
 *     -r tsconfig-paths/register libs/api-infomentor/scripts/e2e-login.ts
 */
import { CookieJar } from 'tough-cookie'
import { DateTime } from 'luxon'
import init from '../lib'
import { Fetch, RequestInit } from '@skolplattformen/api'

const jar = new CookieJar()
const MAX_HOPS = 12

const short = (url: string, len = 120) =>
  url.length > len ? `${url.substring(0, len)}…` : url

/**
 * Fetch-wrapper som följer redirects MANUELLT (till skillnad från RN/undici
 * default) så att vi ser varje hopp, och som matar tough-cookie-jaren i båda
 * riktningarna. Returnerar slutsvar med .url satt till slut-URL:en (som RN).
 */
const loggedFetch = (async (
  inputUrl: string,
  init: RequestInit = {}
): Promise<any> => {
  let url = inputUrl
  let method = (init.method || 'GET').toUpperCase()
  let body: any = init.body
  let headers: Record<string, string> = { ...((init.headers as any) || {}) }

  for (let hop = 0; hop < MAX_HOPS; hop++) {
    const cookieHeader = await jar.getCookieString(url)
    const finalHeaders: Record<string, string> = { ...headers }
    if (cookieHeader && !finalHeaders.Cookie) {
      finalHeaders.Cookie = cookieHeader
    }

    const res = await fetch(url, {
      method,
      headers: finalHeaders,
      body,
      redirect: 'manual',
    } as any)

    // Spara Set-Cookie i jaren + logga domän-scope
    const setCookies: string[] = (res.headers as any).getSetCookie?.() || []
    for (const c of setCookies) {
      await jar.setCookie(c, url)
      const [nameVal, ...attrs] = c.split(';').map((s) => s.trim())
      const domainAttr = attrs.find((a) => a.toLowerCase().startsWith('domain='))
      const secure = attrs.some((a) => a.toLowerCase() === 'secure')
      const httpOnly = attrs.some((a) => a.toLowerCase() === 'httponly')
      console.log(
        `        🍪 ${nameVal.split('=')[0]}  ${
          domainAttr || 'Domain=(host-only)'
        }${httpOnly ? ' HttpOnly' : ''}${secure ? ' Secure' : ''}  ← ${new URL(url).host}`
      )
    }

    console.log(`  [${method}] ${short(url)}`)
    console.log(`       → ${res.status} ${res.statusText}`)

    if ([301, 302, 303, 307, 308].includes(res.status)) {
      const location = res.headers.get('location')
      await res.text().catch(() => undefined) // konsumera body (connection reuse)
      if (!location) throw new Error(`Redirect utan Location från ${url}`)
      url = new URL(location, url).toString()
      // Webbläsarbeteende: 301/302/303 efter POST => GET utan body
      if ([301, 302, 303].includes(res.status) && method !== 'GET') {
        method = 'GET'
        body = undefined
        headers = {}
      }
      continue
    }

    if (!res.url) {
      try {
        Object.defineProperty(res, 'url', { value: url })
      } catch {
        /* ignore */
      }
    }
    return res
  }
  throw new Error(`För många redirects (${MAX_HOPS}) från ${inputUrl}`)
}) as unknown as Fetch

const dumpCookies = async (): Promise<void> => {
  console.log('\n=== COOKIE-JAR PER DOMÄN ===')
  const domains = [
    'https://sso.infomentor.se/',
    'https://hub.infomentor.se/',
    'https://www.infomentor.se/',
    'https://login001.stockholm.se/',
    'https://login003.stockholm.se/',
  ]
  for (const d of domains) {
    const cookies = await jar.getCookies(d)
    console.log(`${new URL(d).host}: ${cookies.length} st`)
    cookies.forEach((c) => console.log(`   - ${c.toString().split(';')[0]}`))
  }
}

const main = async (): Promise<void> => {
  console.log('=== START: Infomentor e2e-login ===\n')
  const api = init(loggedFetch, jar as any, undefined, 'stockholm_par')

  console.log('\n--- STEG 1: login() (SAML-kedja) ---')
  const checker = await api.login()

  if ((checker as any).token === 'fake') {
    console.log('\n(redan autentiserad – ingen BankID krävdes)')
  } else {
    const bankidUrl = `bankid:///?autostarttoken=${
      (checker as any).token
    }&redirect=null`
    console.log('\n--- STEG 2: SIGNERA MED BANKID PÅ TELEFONEN ---')

    // Liten lokal server: telefonen öppnar http://<mac-ip>:4711 -> 302 -> bankid://
    // (pålitligt, till skillnad från att klistra bankid:// i Safari)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const http = require('http')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const os = require('os')
    const nets = os.networkInterfaces()
    const macIp =
      (nets.en0 || []).find((n: any) => n.family === 'IPv4')?.address ||
      'localhost'
    const server = http.createServer((req: any, res: any) => {
      console.log(
        `  📶 Request från telefon? UA: ${req.headers['user-agent']}`
      )
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(
        `<html><head><meta http-equiv="refresh" content="0;url=${bankidUrl}"></head>` +
          `<body style="font-family:sans-serif;padding:2em">` +
          `<a href="${bankidUrl}" style="font-size:2em">Öppna BankID</a></body></html>`
      )
    })
    await new Promise<void>((r) => server.listen(4711, '0.0.0.0', () => r()))
    console.log(`\n📱 Öppna på telefonen:  http://${macIp}:4711\n`)

    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const qrcode = require('qrcode-terminal')
      qrcode.generate(`http://${macIp}:4711`, { small: true })
    } catch {
      /* qr-valfritt */
    }
    console.log('')

    await new Promise<void>((resolve, reject) => {
      const states = [
        'OUTSTANDING_TRANSACTION',
        'USER_SIGN',
        'STARTED',
        'PENDING',
        'NO_CLIENT',
      ]
      states.forEach((s) =>
        checker.on(s, () => console.log(`  BankID-state: ${s}`))
      )
      checker.on('OK', () => resolve())
      checker.on('ERROR', () => reject(new Error('BankID ERROR')))
      checker.on('CANCELLED', () => reject(new Error('BankID CANCELLED')))
      setTimeout(() => reject(new Error('Timeout: 180s')), 180000)
    })
    server.close()
  }

  await dumpCookies()

  console.log('\n--- STEG 3: getChildren (appData) ---')
  const children = await api.getChildren()
  console.log('Children:', JSON.stringify(children, null, 2))

  const child = children[0]
  if (child) {
    console.log('\n--- STEG 4: getNews ---')
    try {
      const news = await api.getNews(child)
      console.log(`News: ${news.length} st`, JSON.stringify(news[0] || null, null, 2))
    } catch (e) {
      console.error('getNews kastade:', e)
    }

    console.log('\n--- STEG 5: getSchedule ---')
    try {
      const schedule = await api.getSchedule(
        child,
        DateTime.now(),
        DateTime.now().plus({ weeks: 1 })
      )
      console.log(`Schedule: ${schedule.length} st`, JSON.stringify(schedule[0] || null, null, 2))
    } catch (e) {
      console.error('getSchedule kastade:', e)
    }

    console.log('\n--- STEG 6: getNotifications ---')
    try {
      const notifications = await api.getNotifications(child)
      console.log(`Notifications: ${notifications.length} st`)
    } catch (e) {
      console.error('getNotifications kastade:', e)
    }
  }

  console.log('\n=== KLART ===')
  process.exit(0)
}

main().catch((error) => {
  console.error('\n❌ FEL:', error)
  process.exit(1)
})
