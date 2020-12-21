import { EventEmitter } from 'events'
import {
  checkStatus, getSessionCookie, login, LoginStatus,
} from './login'
import {
  CalendarItem, Child, Classmate, Fetch, RequestInit,
} from './types'
import { calendar, classmates, list } from './children'

interface AsyncishFunction { (): void | Promise<void> }

export class Api extends EventEmitter {
  private fetch: Fetch

  private session?: RequestInit

  private clearCookies: AsyncishFunction

  public isLoggedIn: boolean = false

  constructor(fetch: Fetch, clearCookies: AsyncishFunction) {
    super()
    this.fetch = fetch
    this.clearCookies = clearCookies
  }

  setSessionCookie(cookie: string) {
    this.session = {
      headers: {
        Cookie: cookie,
      },
    }

    this.isLoggedIn = true
    this.emit('login')
  }

  async login(personalNumber: string): Promise<LoginStatus> {
    const ticket = await login(this.fetch)(personalNumber)
    const loginStatus = checkStatus(this.fetch)(ticket)
    loginStatus.on('OK', async () => {
      const sessionCookie = await getSessionCookie(this.fetch)()
      this.setSessionCookie(sessionCookie)
    })
    return loginStatus
  }

  async getChildren(): Promise<Child[]> {
    const data = await list(this.fetch, this.session)()
    return data
  }

  async getCalendar(childId: string): Promise<CalendarItem[]> {
    const data = await calendar(this.fetch, this.session)(childId)
    return data
  }

  async getClassmates(childId: string): Promise<Classmate[]> {
    const data = await classmates(this.fetch, this.session)(childId)
    return data
  }

  async logout() {
    this.session = undefined
    await this.clearCookies()
    this.isLoggedIn = false
    this.emit('logout')
  }
}

export default function init(fetch: Fetch, clearCookies: AsyncishFunction): Api {
  return new Api(fetch, clearCookies)
}
