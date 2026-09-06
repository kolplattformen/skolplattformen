import { EventEmitter } from 'events'
import { decode } from 'he'
import { LoginStatusChecker, RequestInit, Response } from '@skolplattformen/api'

/**
 * BankID-login mot Schoolsoft via AcadeMedias SAML-IdP (GrandID).
 *
 * Kedjan (rekognoscerad 2026-09-06 mot sms.schoolsoft.se/procivitas):
 *
 *   1. GET {baseUrl}/samlLogin.jsp
 *      → 302-kedja via Shibboleth → saml2.grandid.com SSO
 *      → slutar på login.grandid.com/?sessionid={SID}&ReturnTo={RT}
 *   2. GET login.grandid.com/?sessionid={SID}&bankid=1  → personnummer-sida
 *   3. POST pnr={12 siffror} till samma URL              → BankID-ordern startad
 *      (användaren godkänner i valfri BankID-app kopplad till pnr)
 *   4. GET samma URL, poll tills den svarar 302          → order klar
 *   5. Följ kedjan generiskt: 3xx-hopp + auto-submit-formulär som innehåller
 *      SAMLResponse postas vidare tills schoolsofts inloggade yta nås.
 *
 * Event-semantik matchar gamla skolplattform-adaptern:
 *   PENDING direkt, USER_SIGN när ordern startats, OK vid lyckad kedja,
 *   ERROR vid fel/timeout, CANCELLED om användaren avbryter (eller cancel()).
 * Token hålls 'fake' så att appen inte försöker öppna bankid:// med ett
 * autostarttoken vi inte äger (GrandID exponerar inget sådant för pnr-flödet).
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

export class BankidLoginChecker
  extends EventEmitter
  implements LoginStatusChecker
{
  public token = LOGIN_FAKE_TOKEN

  private cancelled = false

  constructor(
    private readonly ctx: LoginChainContext,
    private readonly personalNumber: string,
    private readonly onLoggedIn: () => void
  ) {
    super()
  }

  async cancel(): Promise<void> {
    if (this.cancelled) return
    this.cancelled = true
    this.emit('CANCELLED')
  }

  /** Startar kedjan i bakgrunden - login() returnerar checkern direkt. */
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

    const loginPageUrl = await this.followRedirects(
      `${this.ctx.baseUrl}/samlLogin.jsp`
    )
    const sessionId = loginPageUrl.match(/[?&]sessionid=([0-9a-f]+)/i)?.[1]
    if (!sessionId) {
      throw new Error(
        `Kunde inte extrahera grandid-sessionid ur ${loginPageUrl}`
      )
    }

    const bankidUrl = `https://login.grandid.com/?sessionid=${sessionId}&bankid=1`
    const startResponse = await this.ctx.cookieFetch(bankidUrl)
    const startBody = await startResponse.text()
    if (!startResponse.ok || startBody.includes('Unauthorized')) {
      throw new Error('GrandID avvisade bankid-start (utgången session?)')
    }

    const pnrBody = `pnr=${encodeURIComponent(this.personalNumber)}`
    const orderResponse = await this.ctx.cookieFetch(bankidUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: pnrBody,
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
    if (this.cancelled) return

    console.log(
      `${this.ctx.consoleTag} BankID-order startad - väntar på godkännande`
    )
    this.emit('USER_SIGN')

    const completionUrl = await this.pollUntilRedirect(bankidUrl)
    if (this.cancelled) return

    const finalUrl = await this.followSamlChain(completionUrl)

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

  /** Följer 3xx-hopp tills ett icke-redirect-svar, returnerar slut-URL:en. */
  private async followRedirects(startUrl: string): Promise<string> {
    let url = startUrl
    for (let hop = 0; hop < MAX_REDIRECT_HOPS; hop++) {
      const response = await this.ctx.cookieFetch(url)
      if (isRedirect(response.status)) {
        const location = response.headers.get('location')
        if (!location) throw new Error(`Redirect utan Location från ${url}`)
        url = resolveUrl(url, location)
        continue
      }
      // Konsumera (och logg-spara) kroppen så cookien lagras konsekvent
      await response.text()
      return url
    }
    throw new Error(`För många redirects vid start från ${startUrl}`)
  }

  /**
   * Polla bankid-URL:en tills GrandID svarar med ett redirect-hopp (ordern
   * klar) eller sidan signalerar avbrott. Kastar vid timeout / CANCELLED.
   */
  private async pollUntilRedirect(pollUrl: string): Promise<string> {
    const deadline = Date.now() + this.ctx.timeoutMs
    for (;;) {
      if (this.cancelled) throw new Error('Avbruten')
      if (Date.now() > deadline) throw new Error('Timeout väntade på BankID')

      const response = await this.ctx.cookieFetch(pollUrl)
      if (isRedirect(response.status)) {
        const location = response.headers.get('location')
        if (!location) throw new Error('Redirect utan Location under polling')
        return resolveUrl(pollUrl, location)
      }
      const body = await response.text()
      if (/avbrut|felaktigt|failed/i.test(body) && !body.includes('pnrform')) {
        this.cancelled = true
        this.emit('CANCELLED')
        throw new Error('Avbruten')
      }
      await new Promise((resolve) => setTimeout(resolve, this.ctx.pollIntervalMs))
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
        // Inga fler hopp - klart (ovanlig väg, men hanteras)
        await postResponse.text()
        return url
      }
      return url
    }
    throw new Error('För många hopp i SAML-kedjan')
  }
}
