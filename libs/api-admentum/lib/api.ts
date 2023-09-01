import { EventEmitter } from 'events'

import { CalendarItem } from '@skolplattformen/api'

import * as fake from './fakeData'
import { parseDate } from './parse'

const fakeResponse = <T>(data: T): Promise<T> =>
  new Promise((res) => setTimeout(() => res(data), 200 + Math.random() * 800))

export class ApiAdmentum extends EventEmitter {
  public async getCalendar(): Promise<CalendarItem[]> {
    const events = await fakeResponse(fake.calendar)

    return events.map(
      ({
        id,
        title,
        start_date: startDate,
        end_date: endDate,
        schedule_event: { start_time: startTime, end_time: endTime },
      }: any) => ({
        id,
        title,
        location: '',
        allDay: startTime === '00:00:00',
        startDate: parseDate(startDate + 'T' + startTime),
        endDate: parseDate(endDate + 'T' + endTime),
      })
    )
  }
}
