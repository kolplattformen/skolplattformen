import {etjanst} from './etjanst';
import {CalendarItem, parseDate} from '../../../api/lib';

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
});

export const calendar = (data: any): CalendarItem[] =>
  etjanst(data).map(calendarItem);
