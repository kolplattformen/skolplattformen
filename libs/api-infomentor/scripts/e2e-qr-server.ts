/* eslint-disable no-console */
/**
 * LIVE QR-BankID-server:
 * 1. SSO-kedjan → BankID-sida → initialize=qr
 * 2. Pollar verifyorder varje sekund (svaret bär nästa QR-frame)
 * 3. Serverar en animerad QR (HTML+canvas) på http://localhost:4712
 *    - öppnas automatiskt i webbläsaren på Macen
 * 4. Skanna med BankID-appens QR-läsare -> state=OK -> SAML-kedjan ->
 *    hub-session -> DEV-SESSION utskrift + API-verifikation
 *
 * Kör från repots rot:
 *   TS_NODE_PROJECT=tsconfig.base.json TS_NODE_TRANSPILE_ONLY=true \
 *   TS_NODE_COMPILER_OPTIONS='{"module":"commonjs"}' \
 *   node -r ts-node/register -r tsconfig-paths/register \
 *   libs/api-infomentor/scripts/e2e-qr-server.ts
 */
import { CookieJar } from 'tough-cookie'
import * as fs from 'fs'
import { exec } from 'child_process'
import init from '../lib'
import { Fetch, RequestInit } from '@skolplattformen/api'

const jar = new CookieJar()
const JAR_PATH = '/tmp/infomentor-jar.json'
const PORT = 4712
const MAX_HOPS = 12

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
    if (cookieHeader && !finalHeaders.Cookie) finalHeaders.Cookie = cookieHeader
    const res = await fetch(url, {
      method,
      headers: finalHeaders,
      body,
      redirect: 'manual',
    } as any)
    const setCookies: string[] = (res.headers as any).getSetCookie?.() || []
    for (const c of setCookies) await jar.setCookie(c, url)
    console.log(`  [${method}] ${url.substring(0, 110)}\n       → ${res.status}`)
    if ([301, 302, 303, 307, 308].includes(res.status)) {
      const location = res.headers.get('location')
      await res.text().catch(() => undefined)
      if (!location) throw new Error(`Redirect utan Location från ${url}`)
      url = new URL(location, url).toString()
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
      } catch {}
    }
    return res
  }
  throw new Error(`För många redirects från ${inputUrl}`)
}) as unknown as Fetch

// QR-matrix ( vendors's QRCode, samma som qrcode-terminal använda internt )
// eslint-disable-next-line @typescript-eslint/no-var-requires
const QRCodeMatrix = require('qrcode-terminal/vendor/QRCode')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const QRErrorCorrectLevel = require('qrcode-terminal/vendor/QRCode/QRErrorCorrectLevel')

const renderMatrix = (text: string): boolean[][] => {
  const qr = new QRCodeMatrix(-1, QRErrorCorrectLevel.L)
  qr.addData(text)
  qr.make()
  const count = qr.getModuleCount()
  const matrix: boolean[][] = []
  for (let row = 0; row < count; row++) {
    const line: boolean[] = []
    for (let col = 0; col < count; col++) line.push(qr.isDark(row, col))
    matrix.push(line)
  }
  return matrix
}

const state = {
  matrix: null as boolean[][] | null,
  status: 'Väntar på initialization…',
  done: false,
}

const page = (): string => `<!doctype html>
<html><head><meta charset="utf-8"><title>Infomentor QR-login</title>
<style>
 body { background:#111; color:#eee; font-family:-apple-system,sans-serif;
        display:flex; flex-direction:column; align-items:center;
        justify-content:center; min-height:95vh; margin:0 }
 h1 { font-size:1.4em; font-weight:normal; margin-bottom:8px }
 #qr { background:#fff; padding:24px; border-radius:12px; display:inline-block }
 canvas { display:block }
 #status { margin-top:18px; font-size:1.3em }
 .ok { color:#4caf50 } .err { color:#ff5252 }
</style></head><body>
<h1>Infomentor-login – skanna med BankID-appens QR-läsare</h1>
<div id="qr"><canvas width="480" height="480"></canvas></div>
<div id="status">Startar…</div>
<script>
 const draw = (m, size, pad) => {
   const canvas = document.querySelector('canvas')
   const ctx = canvas.getContext('2d')
   const count = m.length
   const cell = (size - pad * 2) / count
   ctx.fillStyle = '#fff'
   ctx.fillRect(0, 0, size, size)
   ctx.fillStyle = '#000'
   for (let r = 0; r < count; r++)
     for (let c = 0; c < count; c++)
       if (m[r][c]) ctx.fillRect(pad + c * cell, pad + r * cell, cell + 0.5, cell + 0.5)
 }
 const tick = async () => {
   try {
     const res = await fetch('/frame.json')
     const data = await res.json()
     if (data.matrix) draw(data.matrix, 480, 16)
     const s = document.querySelector('#status')
     s.textContent = data.status
     s.className = data.done ? 'ok' : ''
   } catch (e) {}
   if (!document.querySelector('#status').classList.contains('done'))
     setTimeout(tick, 600)
 }
 tick()
</script></body></html>`

const frameJson = () =>
  JSON.stringify({
    matrix: state.matrix,
    status: state.status,
    done: state.done,
  })

const main = async (): Promise<void> => {
  console.log('=== Infomentor QR-server startar ===')
  const api = init(loggedFetch, jar as any, undefined, 'stockholm_par')

  let loginPageUrl: string | null = null
  let qrInit: { order: string; qrData: string } | null = null
  // Om-startsloop: serverns ADC bouncar ibland ordern direkt (state:ERROR)
  for (let restart = 0; restart < 5 && !loginPageUrl; restart++) {
    if (restart > 0) {
      console.log(`\n=== Omstart ${restart}/5 av SSO-kedjan ===`)
    }
    console.log('\nSSO-kedjan till BankID-sidan…')
    loginPageUrl = (await (api as any).getBankLoginPageUrl(
      'https://sso.infomentor.se/login.ashx?idp=stockholm_par'
    )) as string

    try {
      const initRes = (await loggedFetch(
        `${loginPageUrl}&initialize=qr&_=${Date.now()}`,
        { redirect: 'manual' }
      )) as any
      const raw = await initRes.text()
      qrInit = JSON.parse(raw)
      // Snabb sanity-poll: returnerar ordern ERROR direkt, starta om
      const sanity = (await loggedFetch(
        `${loginPageUrl}&verifyorder=${qrInit.order}&_=${Date.now()}`,
        { redirect: 'manual' }
      )) as any
      const sanityData = JSON.parse(await sanity.text())
      if (sanityData.state === 'ERROR') {
        console.log('Ordern dödfödd (sanity:ERROR) - provar ny kedja…')
        loginPageUrl = null
        qrInit = null
      }
    } catch {
      console.log('Init-fel - provar ny kedja…')
      loginPageUrl = null
      qrInit = null
    }
  }
  if (!qrInit) throw new Error('Kunde inte skapa fungerande QR-order')

  console.log('QR-order startad:', String(qrInit.order).substring(0, 12) + '…')

  state.matrix = renderMatrix(qrInit.qrData)
  state.status = 'Skanna med BankID-appens QR-läsare…'

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const http = require('http')
  const server = http
    .createServer((req: any, res: any) => {
      if (req.url.startsWith('/frame.json')) {
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        })
        res.end(frameJson())
      } else if (req.url.startsWith('/done')) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end('OK')
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(page())
      }
    })
    .listen(PORT, '0.0.0.0')

  const openUrl = `http://localhost:${PORT}`
  console.log(`\n📺 QR öppnas i webbläsaren: ${openUrl}`)
  exec(`open ${openUrl}`)
  console.log('📱 Håll telefonen mot Mac-skärmen och skanna…\n')

  // Polla verifyorder varje sekund - svaret bär nästa QR-frame
  let ok = false
  let lastFrame = qrInit.qrData
  for (let t = 0; t < 240 && !ok; t++) {
    await new Promise((r) => setTimeout(r, 1000))
    try {
      const st = (await loggedFetch(
        `${loginPageUrl}&verifyorder=${qrInit.order}&_=${Date.now()}`,
        { redirect: 'manual' }
      )) as any
      if (st.status === 500) {
        state.status = 'Ordern gick ut - starta om scriptet!'
        state.matrix = null
        break
      }
      const data = JSON.parse(await st.text())
      if (data.qrData && data.qrData !== lastFrame) {
        lastFrame = data.qrData
        try {
          state.matrix = renderMatrix(data.qrData)
        } catch {}
      }
      if (data.state && data.state !== 'PENDING') {
        console.log(`BankID-state: ${data.state}`)
      }
      if (data.state === 'OK') {
        ok = true
        try {
          await (api as any).completeSamlFlow(loginPageUrl)
          ;(api as any).isLoggedIn = true
          state.status = '✅ Inloggad! Hämtar data…'
          state.done = true
        } catch (e) {
          state.status = `SAML-fel: ${(e as Error).message}`
          console.error('completeSamlFlow:', e)
        }
      }
      if (data.state === 'ERROR' || data.state === 'CANCELLED') {
        console.log(
          `BankID ${data.state} - startar om hela kedjan (flaky server)...`
        )
        break // bryt poll-loopen - yttre omstart-pårymmer
      }
    } catch (e) {
      console.error('poll error:', (e as Error).message)
    }
  }

  // Stäng avsökningen även om server kan fortsätta några sekunder
  if (ok) {
    fs.writeFileSync(JAR_PATH, JSON.stringify(jar.serializeSync(), null, 2))
    console.log(`\n💾 Jar sparad: ${JAR_PATH}`)
    const hubCookies = await jar.getCookies('https://hub.infomentor.se/')
    const devSession: string = hubCookies
      .map((c) => `${c.key}=${c.value}`)
      .join('; ')
    console.log('\n=== DEV-SESSION FÖR APPEN ===')
    console.log(devSession)
    console.log('=== SLUT DEV-SESSION ===\n')

    console.log('Verificerar API:et med sessionen…')
    try {
      const children = await api.getChildren()
      console.log('Children:', children.length)
      const news = await api.getNews(children[0])
      console.log('News:', news.length)
      const cal = await api.getCalendar(children[0])
      console.log('Calendar:', cal.length)
      const notif = await api.getNotifications(children[0])
      console.log('Notifications:', notif.length)
      state.status = '✅ KLART - data verifierad!'
    } catch (e) {
      console.error('API-verifikation-fel:', e)
    }
    await new Promise((r) => setTimeout(r, 6000))
    process.exit(0)
  } else {
    console.log('\n❌ QR-login misslyckades')
    process.exit(1)
  }

  void server
}

main().catch((e) => {
  console.error('\n❌ FEL:', e)
  process.exit(1)
})
