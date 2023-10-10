/*
export enum LoginEvent {
  OK = 'OK',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  USER_SIGN = 'USER_SIGN',
}
*/

export interface LoginStatusChecker {
  token: string;
  on: (
    event: 'OK' | 'PENDING' | 'ERROR' | 'USER_SIGN' | 'CANCELLED',
    listener: (...args: any[]) => void,
  ) => LoginStatusChecker;
  cancel: () => Promise<void>;
}

export interface FrejaLoginStatusChecker {
  token: string;
  on: (
    event:
      | 'APPROVED'
      | 'STARTED'
      | 'UNKNOWN'
      | 'DELIVERED_TO_MOBILE'
      | 'CANCELLED'
      | 'EXPIRED'
      | 'RP_CANCELED'
      | 'ERROR',
    listener: (...args: any[]) => void,
  ) => FrejaLoginStatusChecker;
  cancel: () => Promise<void>;
}
