import { EventEmitter } from 'events'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import routes from './routes'
import { AuthTicket } from './types'

export const login = (client: AxiosInstance) => async (personalNumber: string): Promise<AuthTicket> => {
  const url = routes.login(personalNumber)
  const result = await client.get<AuthTicket>(url)
  return { order: result.data.order }
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

  private client: AxiosInstance

  private cancelled: boolean = false

  constructor(client: AxiosInstance, url: string) {
    super()
    this.client = client
    this.url = url
    this.check()
  }

  async check() {
    const status = await this.client.get<string>(this.url)
    this.emit(status.data)
    if (!this.cancelled && status.data !== 'OK' && status.data !== 'ERROR!') {
      setTimeout(() => this.check(), 1000)
    }
  }

  async cancel() {
    this.cancelled = true
  }
}

export const checkStatus = (client: AxiosInstance) => (ticket: AuthTicket): LoginStatus => {
  const url = routes.loginStatus(ticket.order)
  return new LoginStatus(client, url)
}

const parseCookies = (newCookies: string[]): any => {
  return newCookies
    .map((c) => c.split('=')).map(([key, val]) => ({[key]: val}))
    .reduce((obj1, obj2) => ({...obj1, ...obj2}))
}

export const getCookies = (client: AxiosInstance) => async (url = routes.loginCookie, cookies = {}): Promise<any> => {
  try {
    const response = await client.get(url)
    if (response.headers['set-cookie']) {
      cookies = {
        ...cookies,
        ...parseCookies(response.headers['set-cookie'])
      }
    }
    return cookies
  } catch (err) {
    const { response } = err as AxiosError
    if (response?.status === 302) {
      if (response.headers['set-cookie']) {
        cookies = {
          ...cookies,
          ...parseCookies(response.headers['set-cookie'])
        }
      }
      if (response.headers.location) {
        return getCookies(client)(response.headers.location, cookies)
      } else {
        return cookies
      }
    } else {
      throw err
    }
  }
}
