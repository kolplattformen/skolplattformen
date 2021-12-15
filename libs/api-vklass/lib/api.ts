import { EventEmitter } from 'events'

import {
  CalendarItem
} from '@skolplattformen/api'

import * as fake from './fakeData'
import { parseDate } from './parse'

const fakeResponse = <T>(data: T): Promise<T> =>
  new Promise((res) => setTimeout(() => res(data), 200 + Math.random() * 800))

export class ApiVklass extends EventEmitter {

  public async getCalendar(): Promise<CalendarItem[]> {
    const events = await fakeResponse(fake.calendar)

    return events.map(({
      id,
      title,
      start: startDate,
      end: endDate,
      allDay,
      location,
     }: any) => ({
      id,
      title,
      location,
      allDay,
      startDate: parseDate(startDate),
      endDate: parseDate(endDate),
    }))
  }
}
