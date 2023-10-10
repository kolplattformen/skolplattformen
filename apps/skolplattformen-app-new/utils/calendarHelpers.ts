import moment from 'moment';

export const getMeaningfulStartingDate = (date = moment()) => {
  const originalDate = date.clone();
  let returnDate = date.clone();
  // are we on the evening?
  if (date.hour() > 17) returnDate.add('1', 'day');
  // are we on the weekend
  if (returnDate.isoWeekday() > 5) {
    returnDate = returnDate.add(5, 'days').startOf('isoWeek');
    returnDate
      .hour(originalDate.hour())
      .minute(originalDate.minute())
      .second(originalDate.second());
  }

  return returnDate;
};
