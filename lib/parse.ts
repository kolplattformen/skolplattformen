import { DateTime, DateTimeOptions } from 'luxon'
import { toMarkdown } from './parseHtml'
import {
  CalendarItem, Child, Classmate, Guardian, MenuItem, NewsItem, ScheduleItem, User, Notification,
} from './types'

const camel = require('camelcase-keys')

const dateTimeOptions: DateTimeOptions = {
  locale: 'sv',
  setZone: true,
  zone: 'Europe/Stockholm',
}

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
export const children = (data: any): Child[] => etjanst(data).map(child)

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
export const classmates = (data: any): Classmate[] => etjanst(data).map(classmate)

export const calendarItem = ({
  id, title, description, location, longEventDateTime, longEndDateTime, allDayEvent,
}: any): CalendarItem => ({
  id,
  title,
  description,
  location,
  allDay: allDayEvent,
  startDate: longEventDateTime ? DateTime.fromSQL(longEventDateTime, dateTimeOptions).toISO() : undefined,
  endDate: longEndDateTime ? DateTime.fromSQL(longEndDateTime, dateTimeOptions).toISO() : undefined,
})
export const calendar = (data: any): CalendarItem[] => etjanst(data).map(calendarItem)

const IMAGE_HOST = 'https://etjanst.stockholm.se/Vardnadshavare/inloggad2/NewsBanner?url='
export const newsItem = ({
  newsId, header, preamble, body, bannerImageUrl, pubDateSe, modDateSe, authorDisplayName, altText,
}: any): NewsItem => ({
  header,
  id: newsId,
  author: authorDisplayName,
  intro: preamble,
  imageUrl: bannerImageUrl,
  fullImageUrl: `${IMAGE_HOST}${bannerImageUrl}`,
  imageAltText: altText,
  body: toMarkdown(body),
  published: DateTime.fromFormat(pubDateSe, 'd LLLL yyyy HH:mm', dateTimeOptions).toISO(),
  modified: DateTime.fromFormat(modDateSe, 'd LLLL yyyy HH:mm', dateTimeOptions).toISO(),
})
export const news = (data: any): NewsItem[] => etjanst(data).newsItems.map(newsItem)

export const newsItemDetails = (data: any): NewsItem => newsItem(etjanst(data).currentNewsItem)

export const scheduleItem = ({
  title, description, location, longEventDateTime, longEndDateTime, isSameDay, allDayEvent,
}: any): ScheduleItem => ({
  title,
  description,
  location,
  allDayEvent,
  startDate: DateTime.fromSQL(longEventDateTime, dateTimeOptions).toISO(),
  endDate: DateTime.fromSQL(longEndDateTime, dateTimeOptions).toISO(),
  oneDayEvent: isSameDay,
})
export const schedule = (data: any): ScheduleItem[] => etjanst(data).map(scheduleItem)

export const menuItem = ({
  title, description,
}: any): MenuItem => ({
  title,
  description: toMarkdown(description),
})
export const menu = (data: any): MenuItem[] => etjanst(data).map(menuItem)

export const notification = ({
  notification: {
    messageid,
    dateCreated,
  },
  notificationMessage: {
    messages: {
      message: {
        category,
        messagetext,
        linkbackurl,
        messagetype: {
          type,
        },
        sender: {
          name,
        },
      },
    },
  },
}: any): Notification => ({
  id: messageid,
  message: messagetext,
  sender: name,
  url: linkbackurl,
  dateCreated: DateTime.fromISO(dateCreated, dateTimeOptions).toISO(),
  category,
  type,
})
export const notifications = (data: any): Notification[] => etjanst(data).map(notification)
