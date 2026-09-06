/**
 * LIVE-TEST (tillfällig fil - commitas ej, raderas efter körning)
 * Schoolsoft BankID-login mot GrandID-kedjan.
 *
 * Kör från repo-rot:  npx tsx live-schoolsoft-login.ts
 * 1. Skriv personnummer (ÅÅÅÅMMDDNNNN)
 * 2. Godkänn i Mobilt BankID på telefonen
 * 3. Skriptet rapporterar och hämtar exempeldata via adaptern
 *
 * Request-meta (inga bodies) → /tmp/schoolsoft-login-live.jsonl
 */
import * as fs from 'fs'
import * as readline from 'readline'
import { CookieJar } from 'tough-cookie'
import init from './libs/api-schoolsoft/lib/index'

const LOG = '/tmp/schoolsoft-login-live.jsonl'
fs.writeFileSync(LOG, '')

const logMeta = (entry: Record<string, unknown>): void => {
  fs.appendFileSync(
    LOG,
    JSON.stringify({ t: new Date().toISOString(), ...entry }) + '\n'
  )
}

let dumpCount = 0
let qrOpened = false

const QR_PAGE = '/tmp/schoolsoft-qr.html'

const writeQrPage = (svg: string): void => {
  fs.writeFileSync(
    QR_PAGE,
    `<!doctype html><meta charset="utf-8">
<meta http-equiv="refresh" content="1">
<title>Skanna med Mobilt BankID</title>
<body style="text-align:center;font-family:sans-serif">
<h3>Skanna QR-koden i Mobilt BankID-appen</h3>
${svg}
<p style="color:#666">QR-koden roterar — sidan uppdateras automatiskt.</p>`
  )
  if (!qrOpened) {
    qrOpened = true
    // öppna QR-sidan i standardbrowsern (Safari laddar om filen varje sekund)
    void import('child_process').then(({ exec }) => exec(`open ${QR_PAGE}`))
  }
}

const loggingFetch = (inner: typeof fetch): typeof fetch => {
  return (async (url: string, init2?: RequestInit): Promise<Response> => {
    const res = await inner(url, init2)
    logMeta({
      method: init2?.method || 'GET',
      url,
      status: res.status,
      location: res.headers.get('location') || undefined,
      hadBody: !!init2?.body,
    })
    // Dumpa grandid-sidor för analys av status-sidan (kan innehålla pnr-eko;
    // ligger bara lokalt i /tmp på din egen maskin)
    if (url.includes('grandid.com') && dumpCount < 6) {
      const clone = res.clone()
      const body = await clone.text()
      fs.writeFileSync(
        `/tmp/schoolsoft-grandid-${++dumpCount}-${
          (init2?.method || 'GET').toLowerCase()
        }.html`,
        body
      )
    }
    // Fånga collect-JSON och materialisera QR-koden som uppdaterbar lokal sida
    if (url.includes('&collect=1')) {
      const clone = res.clone()
      try {
        const data = JSON.parse(await clone.text())
        if (data?.QRCode) {
          const svg = Buffer.from(data.QRCode, 'base64').toString('utf-8')
          writeQrPage(svg)
        }
        if (data?.hintCode === 'userSign') {
          console.log('✍️  userSign - skriv under i BankID-appen…')
        }
      } catch {
        /* icke-JSON hanteras av libben */
      }
    }
    return res
  }) as typeof fetch
}

const ask = (q: string): Promise<string> =>
  new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    rl.question(q, (a) => {
      rl.close()
      resolve(a.trim())
    })
  })

const main = async () => {
  const pnr = await ask('Personnummer (ÅÅÅÅMMDDNNNN): ')
  const jar = new CookieJar()
  const api = init(loggingFetch(fetch) as never, jar as never, undefined, {
    pollIntervalMs: 2000,
    loginTimeoutMs: 90000,
  })

  console.log('\n[schoolsoft] startar login-kedja...\n')
  const checker = await api.login(pnr)

  const done = new Promise<string>((resolve) => {
    checker.on('PENDING', () => console.log('… PENDING (kedjan startar)'))
    checker.on('USER_SIGN', () =>
      console.log('👉 USER_SIGN - BankID öppnat, väntar på signering…')
    )
    checker.on('OK', () => resolve('OK'))
    checker.on('ERROR', (msg: string) => resolve('ERROR: ' + msg))
    checker.on('CANCELLED', () => resolve('CANCELLED'))
  })
  const result = await done
  console.log('\nResultat:', result)

  if (result !== 'OK') {
    console.log('Logg:', LOG)
    process.exit(1)
  }

  const user = await api.getUser()
  const children = await api.getChildren()
  console.log('\nUser:', JSON.stringify(user))
  console.log('Barn:', JSON.stringify(children))

  const child = children[0]
  const { DateTime } = await import('luxon')
  const now = DateTime.now()
  const timetable = await api.getTimetable(
    child as never,
    now.weekNumber,
    now.weekYear,
    'sv' as never
  )
  const news = await api.getNews(child)
  const notifs = await api.getNotifications(child)
  const teachers = await api.getTeachers(child)

  console.log(
    `Timetable v${now.weekNumber}: ${timetable.length} poster; första: ${JSON.stringify(
      timetable[0]
    )}`
  )
  console.log(`Nyheter: ${news.length}; första: ${news[0]?.header}`)
  console.log(`Meddelanden: ${notifs.length}; Lärare: ${teachers.length}`)
  console.log('\nLogg (meta):', LOG)
}

main().catch((e) => {
  console.error('KRASCH:', e)
  process.exit(1)
})
