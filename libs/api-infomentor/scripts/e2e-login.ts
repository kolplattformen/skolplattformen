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
import * as fs from 'fs'
import init from '../lib'
import { Fetch, RequestInit } from '@skolplattformen/api'

let jar = new CookieJar()
const MAX_HOPS = 12
const JAR_PATH = '/tmp/infomentor-jar.json'
const REUSE = process.env.REUSE_JAR === '1'

if (REUSE && fs.existsSync(JAR_PATH)) {
  jar = CookieJar.deserializeSync(
    JSON.parse(fs.readFileSync(JAR_PATH, 'utf8'))
  ) as CookieJar
  console.log(`♻️  Återanvänder sparad session från ${JAR_PATH}`)
}

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

  if (REUSE) {
    ;(api as any).isLoggedIn = true
    console.log('Hoppar över login (återanvänd jar)')
  } else {
    console.log('\n--- STEG 1-2: SSO + BankID via QR ---')

    const checker = await api.login()

    if ((checker as any).token === 'fake') {
      console.log('(session redan gick igenom – ingen BankID krävdes)')
    } else {
      // QR-mode: serverns qrData renderas som QR -> skanna med BankID-appen
      // (ingen länk-klick-dans, ingen timingpress - skannar när du är redo)
      const loginPageUrl = (await (api as any).getBankLoginPageUrl(
        'https://sso.infomentor.se/login.ashx?idp=stockholm_par'
      )) as string
      const res = (await loggedFetch(
        `${loginPageUrl}&initialize=qr&_=${Date.now()}`,
        { redirect: 'manual' }
      )) as any
      const qrInit = JSON.parse(await res.text())
      console.log(
        'QR init ok, order:',
        String(qrInit.order).substring(0, 12) + '...'
      )
      const code = qrInit.qrData || `bankid.${qrInit.token}`

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const qrcode = require('qrcode-terminal')
      qrcode.generate(code, { small: true })
      console.log('📱 Skanna QR-koden med BankID-appens QR-läsare...')
      console.log('(BankID-appen -> QR-ikonen uppe till vänster)')

      let ok = false
      let consecutiveErrors = 0
      for (let t = 0; t < 90 && !ok; t++) {
        await new Promise((r) => setTimeout(r, 2000))
        try {
          const st = (await loggedFetch(
            `${loginPageUrl}&verifyorder=${qrInit.order}&_=${Date.now()}`,
            { redirect: 'manual' }
          )) as any
          if (st.status !== 200) {
            // ordern kan ha hunnit utgå server-side - avsluta tyst
            consecutiveErrors++
            if (consecutiveErrors >= 2) break
            continue
          }
          consecutiveErrors = 0
          const data = JSON.parse(await st.text())
          if (data.state && data.state !== 'PENDING') {
            console.log(`  QR BankID-state: ${data.state}`)
          }
          if (data.state === 'OK') {
            try {
              await (api as any).completeSamlFlow(loginPageUrl)
              ok = true
            } catch (e) {
              console.error('completeSamlFlow fel:', (e as Error).message)
              break
            }
          }
          if (data.state === 'ERROR' || data.state === 'CANCELLED') break
        } catch (e) {
          console.error('poll error:', (e as Error).message)
          break
        }
      }
      if (!ok) throw new Error('QR-login misslyckades')
      ;(api as any).isLoggedIn = true
    }

    fs.writeFileSync(JAR_PATH, JSON.stringify(jar.serializeSync(), null, 2))
    console.log(`💾 Session sparad till ${JAR_PATH} (REUSE_JAR=1 för att återanvända)`)

    // Skriv ut färska hub-cookies som dev-session-sträng för appen
    const hubCookies = await jar.getCookies('https://hub.infomentor.se/')
    const devSession = hubCookies
      .map((c) => `${c.key}=${c.value}`)
      .join('; ')
    console.log('\n=== DEV-SESSION FÖR APPEN (klistra in i schoolPlatforms.ts) ===')
    console.log(devSession)
    console.log('=== SLUT DEV-SESSION ===')
  }

  await dumpCookies()

  // Rå-dumpar: se faktiska JSON-strukturer utan adapter-parsers
  const rawPost = async (endpoint: string, payload?: any) => {
    const url = `https://hub.infomentor.se${endpoint}`
    const cookie = await jar.getCookieString(url)
    const res = await loggedFetch(url, {
      method: 'POST',
      headers: {
        Cookie: cookie,
        'Content-Type': 'application/json',
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(payload || {}),
    } as any)
    const text = await res.text()
    console.log(`\nRAW ${endpoint} [${res.status}] (${text.length} tecken):`)
    console.log(text.substring(0, 3000))
    return text
  }

  console.log('\n--- STEG 3: getChildren (appData) ---')
  const children = await api.getChildren()
  console.log('Children:', JSON.stringify(children, null, 2))

  console.log('\n--- STEG 3b: RAW appData ---')
  await rawPost('/timetable/timetable/appData')

  const child = children[0]
  if (child) {
    console.log('\n--- STEG 4: RAW GetNewsList ---')
    await rawPost('/Communication/News/GetNewsList')

    console.log('\n--- STEG 5: RAW calendar getentries ---')
    await rawPost('/calendarv2/calendarv2/getentries')

    console.log('\n--- STEG 6: parsers (news/schedule/notifications) ---')
    try {
      const news = await api.getNews(child)
      console.log(`News: ${news.length} st`, JSON.stringify(news[0] || null, null, 2).substring(0, 400))
    } catch (e) {
      console.error('getNews kastade:', e)
    }
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
    try {
      const notifications = await api.getNotifications(child)
      console.log(`Notifications: ${notifications.length} st`)
    } catch (e) {
      console.error('getNotifications kastade:', e)
    }
    try {
      const calendar = await api.getCalendar(child)
      console.log(`Calendar: ${calendar.length} st`, JSON.stringify(calendar[0] || null))
    } catch (e) {
      console.error('getCalendar kastade:', e)
    }
  }

  console.log('\n=== KLART ===')
  process.exit(0)
}

main().catch((error) => {
  console.error('\n❌ FEL:', error)
  process.exit(1)
})
