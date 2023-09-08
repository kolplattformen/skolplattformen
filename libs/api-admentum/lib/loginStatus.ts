import { Fetcher, LoginStatusChecker } from '@skolplattformen/api'
import { EventEmitter } from 'events'
import { bankIdCheckUrl } from './routes'

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
    // try {
    //   console.log('polling bankid signature')
    //   // https://mNN-mg-local.idp.funktionstjanster.se/mg-local/auth/ccp11/grp/pollstatus
    //   if (true)
    //     this.emit('OK')
    //   } else if (isError) {
    //     console.log('polling error')
    //     this.emit('ERROR')
    //   } else if (!this.cancelled && keepPolling) {
    //     console.log('keep on polling...')
    //     this.emit('PENDING')
    //     setTimeout(() => this.check(), 3000)
    //   }
    // } catch (er) {
    //   console.log('Error validating login to Hjärntorget', er)
    //   this.emit('ERROR')
    // }
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
