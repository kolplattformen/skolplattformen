import { DateTime } from 'luxon'
import { TimetableEntry } from '../types'

const calculateDate = (year: number, weekNumber: number, weekday: number, time: string): string => {
  const [hours, minutes, seconds] = time.split(':')
  return DateTime.local()
    .set({
      year,
      weekNumber,
      weekday,
      hour: parseInt(hours, 10),
      minute: parseInt(minutes, 10),
      second: parseInt(seconds, 10),
      millisecond: 0,
    }).toISO()
}

interface TimetableResponseEntry {
  guidId: string
  texts: string[]
  timeStart: string
  timeEnd: string
  dayOfWeekNumber: number
  blockName: string
}
export interface TimetableResponse {
  error: string | null
  data: {
    textList: any[]
    boxList: any[]
    lineList: any[]
    lessonInfo: TimetableResponseEntry[]
  }
  exception: any
  validation: any[]
}

interface EntryParser {
  (args: TimetableResponseEntry, year: number, week: number): TimetableEntry
}
export const timetableEntry: EntryParser = ({
  guidId, texts: [code, teacher, location], timeStart, timeEnd, dayOfWeekNumber, blockName,
}, year, week) => ({
  id: guidId,
  blockName,
  code,
  dayOfWeek: dayOfWeekNumber,
  location,
  teacher,
  timeEnd,
  timeStart,
  dateStart: calculateDate(year, week, dayOfWeekNumber, timeStart),
  dateEnd: calculateDate(year, week, dayOfWeekNumber, timeEnd),
  name: ''
})

export const timetable = (response: TimetableResponse, year: number, week: number) => {
  if (response.error) {
    throw new Error(response.error)
  }
  return response.data.lessonInfo.map((entry) => timetableEntry(entry, year, week))
}
