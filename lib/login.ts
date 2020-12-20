import { EventEmitter } from 'events'
import routes from './routes'
import { AuthTicket, Fetch } from './types'

export const login = (fetch: Fetch) => async (personalNumber: string): Promise<AuthTicket> => {
  const url = routes.login(personalNumber)
  const response = await fetch(url)
  const { order } = await response.json()
  return { order }
}

/*
export enum LoginEvent {
  OK = 'OK',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  USER_SIGN = 'USER_SIGN',
}
*/

export class LoginStatus extends EventEmitter {
  private url: string

  private fetch: Fetch

  private cancelled: boolean = false

  constructor(fetch: Fetch, url: string) {
    super()
    this.fetch = fetch
    this.url = url
    this.check()
  }

  async check() {
    const response = await this.fetch(this.url)
    const status = await response.text()
    this.emit(status)
    if (!this.cancelled && status !== 'OK' && status !== 'ERROR!') {
      setTimeout(() => this.check(), 1000)
    }
  }

  async cancel() {
    this.cancelled = true
  }
}

export const checkStatus = (fetch: Fetch) => (ticket: AuthTicket): LoginStatus => {
  const url = routes.loginStatus(ticket.order)
  return new LoginStatus(fetch, url)
}

export const getSessionCookie = (fetch: Fetch) => async (): Promise<string> => {
  const url = routes.loginCookie
  const response = await fetch(url)
  return response.headers.get('set-cookie') || ''
}
