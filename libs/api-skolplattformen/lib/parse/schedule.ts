import { parseDate, ScheduleItem } from '@skolplattformen/api'
import { etjanst } from './etjanst'

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

export const schedule = (data: any): ScheduleItem[] => {
  try {
    const scheduleData = etjanst(data)
    const mapped = scheduleData.map(scheduleItem)
    return mapped
  } catch (e) {
    if (e instanceof Error) {
      // If this happens the child has no schedule
      // It is the same on the official web
      // Instead of retrying and spamming errors - lets return en empty array
      if (e.message === 'A task was canceled.') {
        return new Array<ScheduleItem>()
      }
    }
    throw e
  }
}
