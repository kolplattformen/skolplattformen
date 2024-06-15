import { EventEmitter } from 'events'
import { loginStatus } from './routes'
import { Fetcher, AuthTicket } from '@skolplattformen/api'

/*
export enum LoginEvent {
  OK = 'OK',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  USER_SIGN = 'USER_SIGN',
}
*/

export interface LoginStatusChecker {
  token: string
  on: (
    event: 'OK' | 'PENDING' | 'ERROR' | 'USER_SIGN' | 'CANCELLED',
    listener: (...args: any[]) => void
  ) => LoginStatusChecker
  cancel: () => Promise<void>
}

class Checker extends EventEmitter {
  public token: string

  private fetcher: Fetcher

  private url: string

  private cancelled = false

  constructor(fetcher: Fetcher, ticket: AuthTicket) {
    super()
    this.fetcher = fetcher
    this.url = loginStatus(ticket.order)
    this.token = ticket.token
    this.check()
  }

  async check(): Promise<void> {
    const response = await this.fetcher('login-status', this.url)
    const status = await response.text()
    this.emit(status)
    if (
      !this.cancelled &&
      status !== 'OK' &&
      status !== 'ERROR!' &&
      status !== 'CANCELLED'
    ) {
      setTimeout(() => this.check(), 1000)
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
