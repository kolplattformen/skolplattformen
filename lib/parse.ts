import * as moment from 'moment'
import * as h2m from 'h2m'
import { htmlDecode } from 'js-htmlencode'
import {
  CalendarItem, Child, Classmate, Guardian, MenuItem, NewsItem, ScheduleItem, User,
} from './types'

const camel = require('camelcase-keys')

export interface EtjanstResponse {
  Success: boolean
  Error: string | null
  Data: any | any[]
}

export const etjanst = (response: EtjanstResponse): any | any[] => {
  if (!response.Success) {
    throw new Error(response.Error || '')
  }
  return camel(response.Data, { deep: true })
}

export const user = ({
  socialSecurityNumber, isAuthenticated, userFirstName, userLastName, userEmail, notificationId,
}: any): User => ({
  personalNumber: socialSecurityNumber,
  firstName: userFirstName,
  lastName: userLastName,
  email: userEmail,
  isAuthenticated,
  notificationId,
})

export const child = ({
  id, sdsId, name, status, schoolId,
}: any): Child => ({
  id, sdsId, name, status, schoolId,
})

export const guardian = ({
  emailhome, firstname, lastname, address, telmobile,
}: any): Guardian => ({
  firstname,
  lastname,
  address,
  mobile: telmobile,
  email: emailhome,
})

export const classmate = ({
  sisId, firstname, lastname, className, guardians = [],
}: any): Classmate => ({
  sisId,
  firstname,
  lastname,
  className,
  guardians: guardians.map(guardian),
})

export const calendarItem = ({
  id, title, description, location, longEventDateTime, longEndDateTime, allDayEvent,
}: any): CalendarItem => ({
  id,
  title,
  description,
  location,
  allDay: allDayEvent,
  startDate: longEventDateTime ? moment(new Date(longEventDateTime)) : undefined,
  endDate: longEndDateTime ? moment(new Date(longEndDateTime)) : undefined,
})

export const newsItem = ({
  newsId, header, preamble, body, bannerImageUrl, pubDateSe, modDateSe,
}: any): NewsItem => ({
  header,
  id: newsId,
  intro: preamble,
  imageUrl: bannerImageUrl,
  body: htmlDecode(h2m(body)),
  published: moment(new Date(pubDateSe)),
  modified: moment(new Date(modDateSe)),
})

export const scheduleItem = ({
  title, description, location, longEventDateTime, longEndDateTime, isSameDay, allDayEvent,
}: any): ScheduleItem => ({
  title,
  description,
  location,
  allDayEvent,
  startDate: moment(new Date(longEventDateTime)),
  endDate: moment(new Date(longEndDateTime)),
  oneDayEvent: isSameDay,
})

export const menuItem = ({
  title, description,
}: any): MenuItem => ({
  title,
  description: htmlDecode(h2m(description)),
})
