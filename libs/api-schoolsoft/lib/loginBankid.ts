import { EventEmitter } from 'events'
import { decode } from 'he'
import { LoginStatusChecker, RequestInit, Response } from '@skolplattformen/api'

/**
 * BankID-login mot Schoolsoft via AcadeMedias SAML-IdP (GrandID).
 *
 * Protokollet är liveverifierat 2026-09-06 mot sms.schoolsoft.se/procivitas:
 *
 *   1. GET {baseUrl}/samlLogin.jsp
 *      → 302 via Shibboleth + saml2.grandid.com SSO
 *      → login.grandid.com/?sessionid={SID}&ReturnTo={RT}
 *   2. GET  ?sessionid={SID}&bankid=1        → personnummer-sida
 *   3. POST ?sessionid={SID}&bankid=1   body: pnr={12 siffror}
 *      → status-sida med:
 *        - bankid:///?autostarttoken={T}&redirect=null  (same-device-länk)
 *        - inline QR-SVG (roterande BankID-QR, uppdateras varje collect)
 *        - JS-pollare: GET ?sessionid={SID}&collect=1
 *   4. Poll ?sessionid={SID}&collect=1 (JSON):
 *        {"response":"outstandingTransaction","status":"pending",
 *         "hintCode":"outstandingTransaction","QRCode":"<b64-svg>"}  → vänta
 *        {...,"hintCode":"userSign"}                                  → USER_SIGN
 *        {"response":"complete"}                                      → klart!
 *        ej JSON / http-fel                                           → session bruten
 *      Avbryt via GET ?sessionid={SID}&cancel-bankid=1.
 *   5. Vid complete: GET ?sessionid={SID} → 302-kedja via resume.php
 *      + auto-submit SAML-form → schoolsoft-session.
 *
 * AD-validering: GrandID svarar "Ditt personnummer {pnr} kunde inte hittas i
 * AD eller så är ditt konto inaktiverat." om pnr saknas i AcadeMedias katalog
 * - mappas till tydligt ERROR direkt.
 *
 * Events: PENDING direkt, USER_SIGN när användaren öppnat BankID (hintCode
 * userSign), OK vid klar kedja, CANCELLED vid cancel()/avbrott, ERROR vid
 * fel/timeout. `token` = autostarttoken (matchar appens openBankId:
 * bankid:///?autostarttoken={token}&redirect=null).
 */

export const LOGIN_FAKE_TOKEN = 'fake'

const MAX_REDIRECT_HOPS = 15

export interface LoginChainContext {
  /** Samma cookieFetch som adaptern använder (redirect: 'manual' under huven) */
  cookieFetch: (
    url: string,
    init?: RequestInit & { skipAutoCookie?: boolean }
  ) => Promise<Response>
  /** T.ex. https://sms.schoolsoft.se/procivitas */
  baseUrl: string
  pollIntervalMs: number
  timeoutMs: number
  consoleTag: string
}

/** En etablerad GrandID BankID-session (klar för polling). */
export interface GrandIdSession {
  /** https://login.grandid.com/?sessionid={SID} - completion-navigerings-URL */
  sessionUrl: string
  /** sessionUrl + '&collect=1' */
  collectUrl: string
  /** sessionUrl + '&cancel-bankid=1' */
  cancelUrl: string
  /** autostarttoken ur status-sidan (saknas defensivt → 'fake') */
  autostartToken: string
}

interface FormPost {
  action: string
  fields: Record<string, string>
}

const isRedirect = (status: number): boolean => status >= 300 && status < 400

const resolveUrl = (current: string, next: string): string => {
  if (/^https?:\/\//i.test(next)) return next
  return new URL(next, current).toString()
}

/** Parsar ett klassiskt auto-submit SAML-formulär (SAMLResponse + RelayState). */
export const parseAutoPostForm = (html: string): FormPost | null => {
  if (!html.includes('SAMLResponse')) return null
  const formMatch = html.match(/<form[^>]*action="([^"]+)"[^>]*>/i)
  if (!formMatch) return null
  const fields: Record<string, string> = {}
  const inputRe = /<input[^>]*type="hidden"[^>]*name="([^"]+)"[^>]*value="([^"]*)"[^>]*\/?\s*>/gi
  const altRe = /<input[^>]*name="([^"]+)"[^>]*type="hidden"[^>]*value="([^"]*)"[^>]*\/?\s*>/gi
  let m: RegExpExecArray | null
  while ((m = inputRe.exec(html))) fields[decode(m[1])] = decode(m[2])
  while ((m = altRe.exec(html))) {
    if (!(decode(m[1]) in fields)) fields[decode(m[1])] = decode(m[2])
  }
  return { action: decode(formMatch[1]), fields }
}

const toUrlEncoded = (fields: Record<string, string>): string =>
  Object.entries(fields)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')

const extractAutostartToken = (html: string): string | undefined =>
  html.match(/autostarttoken=([0-9a-z-]{30,40})/i)?.[1]

/** Följer 3xx-kedjan från samlLogin.jsp till grandid-loginsidan. */
async function chainToGrandidLogin(
  ctx: LoginChainContext
): Promise<string> {
  let url = `${ctx.baseUrl}/samlLogin.jsp`
  for (let hop = 0; hop < MAX_REDIRECT_HOPS; hop++) {
    const response = await ctx.cookieFetch(url)
    if (isRedirect(response.status)) {
      const location = response.headers.get('location')
      if (!location) throw new Error(`Redirect utan Location från ${url}`)
      url = resolveUrl(url, location)
      continue
    }
    await response.text()
    return url
  }
  throw new Error('För många redirects från samlLogin.jsp')
}

/**
 * Steg 1-3: SAML-kedja → grandid → POST pnr. Returnerar en redo GrandIdSession
 * (order startad) eller kastar ett svenskt felmeddelande för LoginStatusChecker.
 */
export async function startGrandIdBankidSession(
  ctx: LoginChainContext,
  personalNumber: string
): Promise<GrandIdSession> {
  const loginPageUrl = await chainToGrandidLogin(ctx)
  const sessionId = loginPageUrl.match(/[?&]sessionid=([0-9a-f]+)/i)?.[1]
  if (!sessionId) {
    throw new Error(
      `Kunde inte extrahera grandid-sessionid ur ${loginPageUrl}`
    )
  }

  const sessionUrl = `https://login.grandid.com/?sessionid=${sessionId}`
  const bankidUrl = `${sessionUrl}&bankid=1`

  const startResponse = await ctx.cookieFetch(bankidUrl)
  const startBody = await startResponse.text()
  if (!startResponse.ok || startBody.includes('Unauthorized')) {
    throw new Error('GrandID avvisade bankid-start (utgången session?)')
  }

  const orderResponse = await ctx.cookieFetch(bankidUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `pnr=${encodeURIComponent(personalNumber)}`,
  })
  const orderBody = await orderResponse.text()
  if (orderBody.includes('Unauthorized')) {
    throw new Error('GrandID avvisade personnumret (kontrollera 12 siffror)')
  }
  if (/kunde inte hittas i AD|inaktiverat/i.test(orderBody)) {
    throw new Error(
      'Personnumret hittades inte i skolans AcadeMedia-katalog (eller kontot är inaktiverat)'
    )
  }

  return {
    sessionUrl,
    collectUrl: `${sessionUrl}&collect=1`,
    cancelUrl: `${sessionUrl}&cancel-bankid=1`,
    autostartToken: extractAutostartToken(orderBody) || LOGIN_FAKE_TOKEN,
  }
}

export class BankidLoginChecker
  extends EventEmitter
  implements LoginStatusChecker
{
  public token: string

  private cancelled = false

  private userSignEmitted = false

  constructor(
    private readonly ctx: LoginChainContext,
    private readonly session: GrandIdSession,
    private readonly onLoggedIn: () => void
  ) {
    super()
    this.token = session.autostartToken
  }

  async cancel(): Promise<void> {
    if (this.cancelled) return
    this.cancelled = true
    try {
      await this.ctx.cookieFetch(this.session.cancelUrl, {
        skipAutoCookie: true,
      })
    } catch {
      /* best-effort */
    }
    this.emit('CANCELLED')
  }

  /** Startar polling i bakgrunden - login() returnerar checkern direkt. */
  start(): void {
    setTimeout(() => {
      this.run().catch((error) => {
        console.warn(
          `${this.ctx.consoleTag} login failed:`,
          (error as Error).message
        )
        if (!this.cancelled) this.emit('ERROR', (error as Error).message)
      })
    }, 0)
  }

  private async run(): Promise<void> {
    this.emit('PENDING')
    console.log(
      `${this.ctx.consoleTag} BankID-order startad - väntar på godkännande`
    )

    await this.pollUntilComplete()
    if (this.cancelled) return

    const finalUrl = await this.followSamlChain(this.session.sessionUrl)

    const check = await this.ctx.cookieFetch(
      `${this.ctx.baseUrl}/jsp/student/right_student_startpage.jsp`
    )
    const checkBody = await check.text()
    if (!checkBody.includes('parent-header-root')) {
      throw new Error(`Kedjan slutade på ${finalUrl} utan giltig session`)
    }

    this.onLoggedIn()
    this.emit('OK')
  }

  /**
   * Pollar ?collect=1 (samma endpoint som grandids egen status-sida):
   * JSON {response, status, hintCode, QRCode?}. Bryter vid complete.
   */
  private async pollUntilComplete(): Promise<void> {
    const deadline = Date.now() + this.ctx.timeoutMs
    for (;;) {
      if (this.cancelled) throw new Error('Avbruten')
      if (Date.now() > deadline) throw new Error('Timeout väntade på BankID')

      const response = await this.ctx.cookieFetch(this.session.collectUrl)
      if (isRedirect(response.status) || !response.ok) {
        throw new Error('BankID-sessionen bröts (ollikshanterat svar)')
      }
      const text = await response.text()
      let data: { response?: string; hintCode?: string }
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error('BankID-sessionen bröts (oväntat collect-svar)')
      }

      if (data.response === 'complete') return
      if (data.response === 'outstandingTransaction') {
        if (data.hintCode === 'userSign' && !this.userSignEmitted) {
          this.userSignEmitted = true
          this.emit('USER_SIGN')
        }
        await new Promise((resolve) =>
          setTimeout(resolve, this.ctx.pollIntervalMs)
        )
        continue
      }
      throw new Error(
        `BankID-sessionen avbröts (${JSON.stringify(data).slice(0, 80)})`
      )
    }
  }

  /**
   * Följer kedjan efter BankID-godkännandet: 3xx-hopp samt auto-submit
   * SAML-formulär (POST med SAMLResponse/RelayState) tills slutgiltig sida.
   * Returnerar den sista URL:en för diagnostik.
   */
  private async followSamlChain(startUrl: string): Promise<string> {
    let url = startUrl
    for (let hop = 0; hop < MAX_REDIRECT_HOPS; hop++) {
      const response = await this.ctx.cookieFetch(url)
      if (isRedirect(response.status)) {
        const location = response.headers.get('location')
        if (!location) throw new Error(`Redirect utan Location från ${url}`)
        url = resolveUrl(url, location)
        continue
      }
      const body = await response.text()
      const form = parseAutoPostForm(body)
      if (form) {
        url = resolveUrl(url, form.action)
        const postResponse = await this.ctx.cookieFetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: toUrlEncoded(form.fields),
        })
        if (isRedirect(postResponse.status)) {
          const location = postResponse.headers.get('location')
          url = location ? resolveUrl(url, location) : url
          continue
        }
        await postResponse.text()
        return url
      }
      return url
    }
    throw new Error('För många hopp i SAML-kedjan')
  }
}
