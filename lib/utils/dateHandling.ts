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

  const dateLongForm = dateParse('dd MMMM yyyy')

  if (dateLongForm.isValid) {
    return dateLongForm.toUTC().toISO()
  }

  const dateLongFormOneDigit = dateParse('d MMMM yyyy')

  if (dateLongFormOneDigit.isValid) {
    return dateLongFormOneDigit.toUTC().toISO()
  }

  // Explicit return to satisfy ESLint
  return undefined
}
