import { Fetcher, LoginStatusChecker } from '@skolplattformen/api'
import { EventEmitter } from 'events'
import {
  extractAuthGbgLoginRequestBody,
  extractHjarntorgetSAMLLogin,
} from './parse/parsers'
import {
  authGbgLoginUrl,
  hjarntorgetSAMLLoginUrl,
  pollStatusUrl,
} from './routes'

export class HjarntorgetChecker extends EventEmitter implements LoginStatusChecker {
  private fetcher: Fetcher

  private basePollingUrl: string

  public token: string

  private cancelled = false

  constructor(fetcher: Fetcher, basePollingUrl: string) {
    super()
    this.token = '' // not used, but needed for compatability with the LoginStatusChecker
    this.fetcher = fetcher
    this.basePollingUrl = basePollingUrl

    this.check()
  }

  async check(): Promise<void> {
    try {
      console.log('polling bankid signature')
      // https://mNN-mg-local.idp.funktionstjanster.se/mg-local/auth/ccp11/grp/pollstatus

      const pollStatusResponse = await this.fetcher(
        'poll-bankid-status',
        pollStatusUrl(this.basePollingUrl)
      )
      console.log('poll-bankid-status')
      const pollStatusResponseJson = await pollStatusResponse.json()

      const keepPolling = pollStatusResponseJson.infotext !== ''
      const isError = pollStatusResponseJson.location.indexOf('error') >= 0
      if (!keepPolling && !isError) {
        console.log('bankid successfull! follow to location...')
        // follow response location to get back to auth.goteborg.se
        // r.location is something like:
        //  'https://mNN-mg-local.idp.funktionstjanster.se/mg-local/auth/ccp11/grp/signature'
        const signatureResponse = await this.fetcher(
          'confirm-signature-redirect',
          pollStatusResponseJson.location,
          {
            redirect: 'follow',
          }
        )
        if (!signatureResponse.ok) {
          throw new Error('Bad signature response')
        }
        const signatureResponseText = await signatureResponse.text()
        const authGbgLoginBody = extractAuthGbgLoginRequestBody(
          signatureResponseText
        )

        console.log('authGbg saml login')
        const authGbgLoginResponse = await this.fetcher(
          'authgbg-saml-login',
          authGbgLoginUrl,
          {
            redirect: 'follow',
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: authGbgLoginBody,
          }
        )
        if (!authGbgLoginResponse.ok) {
          throw new Error('Bad augGbgLogin response')
        }
        const authGbgLoginResponseText = await authGbgLoginResponse.text()
        const hjarntorgetSAMLLoginBody = extractHjarntorgetSAMLLogin(
          authGbgLoginResponseText
        )

        console.log('hjarntorget saml login')
        const hjarntorgetSAMLLoginResponse = await this.fetcher(
          'hjarntorget-saml-login',
          hjarntorgetSAMLLoginUrl,
          {
            method: 'POST',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: hjarntorgetSAMLLoginBody,
          }
        )
        if (!hjarntorgetSAMLLoginResponse.ok) {
          throw new Error('Bad hjarntorgetSAMLLogin response')
        }
        // TODO: add more checks above between calls to see if everything is actually 'OK'...
        this.emit('OK')
      } else if (isError) {
        console.log('polling error')
        this.emit('ERROR')
      } else if (!this.cancelled && keepPolling) {
        console.log('keep on polling...')
        this.emit('PENDING')
        setTimeout(() => this.check(), 3000)
      }
    } catch (er) {
      console.log('Error validating login to Hjärntorget', er)
      this.emit('ERROR')
    }
  }

  async cancel(): Promise<void> {
    this.cancelled = true
  }
}

export const checkStatus = (
  fetch: Fetcher,
  basePollingUrl: string
): LoginStatusChecker => new HjarntorgetChecker(fetch, basePollingUrl)

export class DummyStatusChecker extends EventEmitter implements LoginStatusChecker {
  token = ""
  async cancel(): Promise<void> {
    // do nothing
  }
}
