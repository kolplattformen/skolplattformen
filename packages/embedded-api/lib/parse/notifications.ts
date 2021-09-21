import { etjanst } from './etjanst'
import { parseDate } from '../utils/dateHandling'
import { Notification } from '../types'

export const notification = ({
  notification: { messageid, dateCreated },
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
  category,
  type,
})

export const notifications = (data: any): Notification[] =>
  etjanst(data).map(notification)
