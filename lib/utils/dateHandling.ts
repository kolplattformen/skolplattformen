import { DateTime } from 'luxon'

const options = {
  locale: 'sv',
}

export const parseDate = (input?: string): string | undefined => {
  if (!input) {
    return undefined
  }

  const dateParse = (format: string) =>
    DateTime.fromFormat(input, format, options)

  const dateAndTime = dateParse('yyyy-MM-dd HH:mm')

  if (dateAndTime.isValid) {
    return dateAndTime.toUTC().toISO()
  }

  const onlyDate = dateParse('yyyy-MM-dd')

  if (onlyDate.isValid) {
    return onlyDate.toUTC().toISO()
  }

  const dateLongForm = dateParse('d MMMM yyyy')

  if (dateLongForm.isValid) {
    return dateLongForm.toUTC().toISO()
  }

  const dateTimeLongForm = dateParse('d MMMM yyyy HH:mm')

  if (dateTimeLongForm.isValid) {
    return dateTimeLongForm.toUTC().toISO()
  }

  // Explicit return to satisfy ESLint
  return undefined
}
