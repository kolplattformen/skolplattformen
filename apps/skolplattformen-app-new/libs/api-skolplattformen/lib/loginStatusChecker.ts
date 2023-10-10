import {EventEmitter} from 'events';
import {loginStatus} from './routes';
import {AuthTicket, Fetcher, LoginStatusChecker} from '../../../libs/api/lib';

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
    const status = await response.json();
    this.emit(status.state);
    if (
      !this.cancelled &&
      status.state !== 'OK' &&
      status.state !== 'ERROR' &&
      status.state !== 'CANCELLED'
    ) {
      setTimeout(() => this.check(), 1000);
    }
  }

  async cancel(): Promise<void> {
    this.cancelled = true;
  }
}

export const checkStatus = (
  fetch: Fetcher,
  ticket: AuthTicket,
): LoginStatusChecker => new Checker(fetch, ticket);

export class DummyStatusChecker
  extends EventEmitter
  implements LoginStatusChecker
{
  token = '';
  async cancel(): Promise<void> {
    // do nothing
  }
}
