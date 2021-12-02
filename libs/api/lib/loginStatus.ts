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
