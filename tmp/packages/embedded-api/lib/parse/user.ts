import { User } from '../types'

export const user = ({
  socialSecurityNumber,
  isAuthenticated,
  userFirstName,
  userLastName,
  userEmail,
  notificationId,
}: any): User => ({
  personalNumber: socialSecurityNumber,
  firstName: userFirstName,
  lastName: userLastName,
  email: userEmail,
  isAuthenticated,
  notificationId,
})
