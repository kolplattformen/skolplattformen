import { etjanst } from './etjanst'
import { ScheduleItem } from '../types'
import { parseDate } from '../utils/dateHandling'

export const scheduleItem = ({
  title,
  description,
  location,
  longEventDateTime,
  longEndDateTime,
  isSameDay,
  allDayEvent,
}: any): ScheduleItem => ({
  title,
  description,
  location,
  allDayEvent,
  startDate: parseDate(longEventDateTime),
  endDate: parseDate(longEndDateTime),
  oneDayEvent: isSameDay,
})

export const schedule = (data: any): ScheduleItem[] =>
  etjanst(data).map(scheduleItem)
