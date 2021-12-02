import { EventEmitter } from 'events';
import { loginStatus } from './routes';
import { AuthTicket, Fetcher, LoginStatusChecker } from '@skolplattformen/api';

export class Checker extends EventEmitter implements LoginStatusChecker {
  public token: string;

  private fetcher: Fetcher;

  private url: string;

  private cancelled = false;

  constructor(fetcher: Fetcher, ticket: AuthTicket) {
    super();
    this.fetcher = fetcher;
    this.url = loginStatus(ticket.order);
    this.token = ticket.token;
    this.check();
  }

  async check(): Promise<void> {
    const response = await this.fetcher('login-status', this.url);
    const status = await response.text();
    this.emit(status);
    if (!this.cancelled &&
      status !== 'OK' &&
      status !== 'ERROR!' &&
      status !== 'CANCELLED') {
      setTimeout(() => this.check(), 1000);
    }
  }

  async cancel(): Promise<void> {
    this.cancelled = true;
  }
}


export const checkStatus = (
  fetch: Fetcher,
  ticket: AuthTicket
): LoginStatusChecker => new Checker(fetch, ticket)

export class DummyStatusChecker extends EventEmitter implements LoginStatusChecker {
  token = ""
  async cancel(): Promise<void> {
    // do nothing
  }
}
