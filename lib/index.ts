import { EventEmitter } from 'events'
import {
  checkStatus, getSessionCookie, login, LoginStatus,
} from './login'
import {
  CalendarItem, Child, Fetch, RequestInit,
} from './types'
import { calendar, list } from './children'

class Api extends EventEmitter {
  private fetch: Fetch

  private session?: RequestInit

  constructor(fetch: Fetch) {
    super()
    this.fetch = fetch
  }

  async login(personalNumber: string): Promise<LoginStatus> {
    const ticket = await login(this.fetch)(personalNumber)
    const loginStatus = checkStatus(this.fetch)(ticket)
    loginStatus.on('OK', async () => {
      const sessionCookie = await getSessionCookie(this.fetch)()
      this.session = { headers: { Cookie: sessionCookie } }

      this.emit('login')
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
}

export default function init(fetch: Fetch) {
  return new Api(fetch)
}
