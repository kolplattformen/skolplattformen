import { EventEmitter } from 'events';
import { frejaLoginStatus } from './routes';
import { Fetcher, FrejaLoginStatusChecker, RequestInit } from '@skolplattformen/api';
export class FrejaChecker extends EventEmitter implements FrejaLoginStatusChecker {
    public token: string;
  
    private fetcher: Fetcher
    private url: string
    private session: RequestInit
  
    private cancelled = false;
  
    constructor(fetcher: Fetcher, token: string, session: RequestInit) {
      super();
      this.fetcher = fetcher
      this.session = session
      this.token = token
      this.url = frejaLoginStatus;
           this.check();
    }
  
    async check(): Promise<void> {
      const response = await this.fetcher('freja-login-status', this.url, this.session);
      const status = await response.text();
      this.emit(status);
      if (!this.cancelled &&
        status !== 'APPROVED'  && 
        status !== 'ERROR' &&
        status !== 'CANCELLED'
        ){
        setTimeout(() => this.check(), 1000);
      }
      else console.log('APPROVED');
    }
  
    async cancel(): Promise<void> {
      this.cancelled = true;
    }
  }
  
  
  export const checkStatus = (
    fetch: Fetcher,
    token: string,
    session: RequestInit
  ): FrejaLoginStatusChecker => new FrejaChecker(fetch, token, session)
    