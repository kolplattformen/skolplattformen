import { DateTime } from 'luxon'

const options = {
  locale: 'sv',
}

const toISOString = (date: DateTime) => date.toUTC().toISO()

export const parseDate = (input?: string): string | undefined => {
  if (!input) {
    return undefined
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
