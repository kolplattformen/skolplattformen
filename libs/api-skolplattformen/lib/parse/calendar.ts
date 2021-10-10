import { etjanst } from './etjanst'
import { CalendarItem } from '../../../api/lib/types'
import { parseDate } from '../../../api/lib/utils/dateHandling'

export const calendarItem = ({
  id,
  title,
  description,
  location,
  longEventDateTime,
  longEndDateTime,
  allDayEvent,
}: any): CalendarItem => ({
  id,
  title,
  description,
  location,
  allDay: allDayEvent,
  startDate: parseDate(longEventDateTime),
  endDate: parseDate(longEndDateTime),
})

export const calendar = (data: any): CalendarItem[] =>
  etjanst(data).map(calendarItem)
