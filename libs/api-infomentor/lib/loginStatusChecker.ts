import { EventEmitter } from 'events'
import { AuthTicket, Fetcher, LoginStatusChecker } from '@skolplattformen/api'

export class Checker extends EventEmitter implements LoginStatusChecker {
  public token: string

  private fetcher: Fetcher

  private url: string

  private cancelled = false

  constructor(fetcher: Fetcher, ticket: AuthTicket) {
    super()
    this.fetcher = fetcher
    // Bygg status-URL från order-ID
    const baseUrl = 'https://login003.stockholm.se/NECSadcmbid/authenticate/NECSadcmbid'
    const params = 'TYPE=33554433&REALMOID=06-42f40edd-0c5b-4dbc-b714-1be1e907f2de&GUID=1&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=IfNE0iMOtzq2TcxFADHylR6rkmFtwzoxRKh5nRMO9NBqIxHrc38jFyt56FASdxk1&TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0ZXIuc3RvY2tob2xtLnNlL3ZhcmRuYWRzaGF2YXJlL2lubG9nZ2FkMi9oZW0%3d'
    this.url = `${baseUrl}?${params}&verifyorder=${ticket.order}&_=${Date.now()}`
    this.token = ticket.token
    this.check()
  }

  async check(): Promise<void> {
    if (!this.url) {
      this.emit('ERROR')
      return
    }

    try {
      const response = await this.fetcher('login-status', this.url)
      const status = await response.json()
      this.emit(status.state)
      if (
        !this.cancelled &&
        status.state !== 'OK' &&
        status.state !== 'ERROR' &&
        status.state !== 'CANCELLED'
      ) {
        setTimeout(() => this.check(), 1000)
      }
    } catch (error) {
      this.emit('ERROR')
    }
  }

  async cancel(): Promise<void> {
    this.cancelled = true
  }
}

export const checkStatus = (
  fetch: Fetcher,
  ticket: AuthTicket
): LoginStatusChecker => new Checker(fetch, ticket)

export class DummyStatusChecker
  extends EventEmitter
  implements LoginStatusChecker
{
  token = ''
  async cancel(): Promise<void> {
    // do nothing
  }
}
