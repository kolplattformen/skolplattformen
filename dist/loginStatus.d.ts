import { Fetcher } from './fetcher';
import { AuthTicket } from './types';
export interface LoginStatusChecker {
    token: string;
    on: (event: 'OK' | 'PENDING' | 'ERROR' | 'USER_SIGN' | 'CANCELLED', listener: (...args: any[]) => void) => LoginStatusChecker;
    cancel: () => Promise<void>;
}
export declare const checkStatus: (fetch: Fetcher, ticket: AuthTicket) => LoginStatusChecker;
