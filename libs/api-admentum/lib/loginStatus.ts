import { Fetcher, LoginStatusChecker } from '@skolplattformen/api'
import { EventEmitter } from 'events'
import { bankIdCheckUrl, redirectLocomotive } from './routes'

export class GrandidChecker extends EventEmitter implements LoginStatusChecker {
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
      console.log('polling bankid signature', this.basePollingUrl)
      const result = await this.fetcher('bankid-checker', this.basePollingUrl, {
        headers: {
          'x-requested-with': 'XMLHttpRequest',
        },
      }).then((res) => {
        console.log('bankid full result', res)
        return res.json()
      })
      console.log('bankid result', result)
      const ok = result.response?.status === 'complete'
      const isError = result.response?.status === 'failed'
      // https://mNN-mg-local.idp.funktionstjanster.se/mg-local/auth/ccp11/grp/pollstatus
      if (ok) {
        //===
        /*const parts = this.basePollingUrl.split('?');
        let locoUrl = '';
        if (parts.length === 2) {
          const queryString = parts[1];
          const queryParams = queryString.split('&');
          for (const param of queryParams) {
            const [key, value] = param.split('=');
            if (key === 'sessionid') {
              locoUrl = redirectLocomotive(value);
            }
          }
        } else {
          console.log("Invalid URL format.");
        }

        console.log('calling fff locomotive url: ', locoUrl)
        const response = await this.fetcher('follow-locomotive', locoUrl, {
          method: 'GET',
          redirect: 'manual',
        });
        console.log('locomotive response', response)*/
        this.emit('OK')
      } else if (isError) {
        console.log('polling error', result.response?.hintCode)
        this.emit('ERROR')
      } else if (!this.cancelled) {
        console.log('keep on polling...')
        this.emit('PENDING')
        setTimeout(() => this.check(), 3000)
      }
    } catch (err) {
      console.log('Error validating login to Admentum', err)
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
): LoginStatusChecker => new GrandidChecker(fetch, basePollingUrl)

export class DummyStatusChecker
  extends EventEmitter
  implements LoginStatusChecker
{
  token = ''
  async cancel(): Promise<void> {
    // do nothing
  }
}
