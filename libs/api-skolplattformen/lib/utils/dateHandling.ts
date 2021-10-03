import { DateTime } from 'luxon'

const options = {
  locale: 'sv',
}

const toISOString = (date: DateTime) => date.toUTC().toISO()
const aspNetJsonRegex = /^\/?Date\((-?\d+)/i

export const parseDate = (input?: string): string | undefined => {
  if (!input) {
    return undefined
  }

  // First try and parse old Aps.Net format
  // \/Date(1612525846000)\/ 
  // where the numbers are milliseconds from Epoc
  const matched = aspNetJsonRegex.exec(input)
  if (matched !== null) {
      const millisecondsSinceEpoc = parseInt(matched[1], 10)
      const date = DateTime.fromMillis(millisecondsSinceEpoc)
      return toISOString(date)
  }

  const dateParse = (format: string) =>
    DateTime.fromFormat(input, format, options)

  const dateISO = DateTime.fromISO(input)

  if (dateISO.isValid) {
    return toISOString(dateISO)
  }

  const dateAndTime = dateParse('yyyy-MM-dd HH:mm')

  if (dateAndTime.isValid) {
    return toISOString(dateAndTime)
  }

  const onlyDate = dateParse('yyyy-MM-dd')

  if (onlyDate.isValid) {
    return toISOString(onlyDate)
  }

  const dateLongForm = dateParse('d MMMM yyyy')

  if (dateLongForm.isValid) {
    return toISOString(dateLongForm)
  }

  const dateTimeLongForm = dateParse('d MMMM yyyy HH:mm')

  if (dateTimeLongForm.isValid) {
    return toISOString(dateTimeLongForm)
  }

  // Explicit return to satisfy ESLint
  return undefined
}
