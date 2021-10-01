import { etjanst } from './etjanst'
import { parseDate } from '../utils/dateHandling'
import { Notification } from '../types'

export const notification = ({
  notification: { messageid, dateCreated, dateModified },
  notificationMessage: {
    messages: {
      message: {
        category,
        messagetext,
        linkbackurl,
        messagetype: { type },
        sender: { name },
      },
    },
  },
}: any): Notification => ({
  id: messageid,
  message: messagetext,
  sender: name,
  url: linkbackurl,
  dateCreated: parseDate(dateCreated) || '',
  dateModified: parseDate(dateModified) || '',
  category,
  type,
})

const notificationsSort = (item1: Notification, item2: Notification): number => {
  const m1 = item1.dateModified || item1.dateCreated
  const m2 = item2.dateModified || item2.dateCreated
  return m1 < m2 ? 1 : -1
}

export const notifications = (data: any): Notification[] =>
  etjanst(data).map(notification).sort(notificationsSort)
