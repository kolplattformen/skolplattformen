import moment from 'moment'

export const getMeaningfulStartingDate = (date = moment()) => {
  // are we on the evening?
  if (date.hour() > 17) date = date.add('1', 'day')
  // are we on the weekend
  if (date.isoWeekday() > 5) date = date.add(5, 'days').startOf('isoWeek')
  return date
}
