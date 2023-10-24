import { User } from '@skolplattformen/api'

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
