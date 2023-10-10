import {EventEmitter} from 'events';
import {frejaLoginStatus} from './routes';
import {
  Fetcher,
  FrejaLoginStatusChecker,
  RequestInit,
} from '../../../libs/api/lib';
export class FrejaChecker
  extends EventEmitter
  implements FrejaLoginStatusChecker
{
  public token: string;

  private fetcher: Fetcher;
  private url: string;

  private cancelled = false;

  constructor(fetcher: Fetcher, token: string) {
    super();
    this.fetcher = fetcher;

    this.token = token;
    this.url = frejaLoginStatus;
    this.check();
  }

  async check(): Promise<void> {
    const response = await this.fetcher('freja-login-status', this.url);
    let status = await response.text();

    // For Freja we recieve CANCELED (with one L) - BankId returns CANCELLED (with two L)
    // To make the API consistent - we choose the same as BankId - two L
    if (status === 'CANCELED') status = 'CANCELLED';

    console.debug(status);
    this.emit(status);
    if (
      !this.cancelled &&
      status !== 'APPROVED' &&
      status !== 'ERROR' &&
      status !== 'CANCELLED'
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
  token: string,
  session: RequestInit,
): FrejaLoginStatusChecker => new FrejaChecker(fetch, token);
