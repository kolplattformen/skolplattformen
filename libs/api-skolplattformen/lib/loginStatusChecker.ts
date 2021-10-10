import { EventEmitter } from 'events';
import { loginStatus } from './routes';
import { AuthTicket } from '../../api/lib/types';
import { Fetcher } from '../../api/lib/fetcher';
import { LoginStatusChecker } from '.';

export class Checker extends EventEmitter {
  public token: string;

  private fetcher: Fetcher;

  private url: string;

  private cancelled: boolean = false;

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
