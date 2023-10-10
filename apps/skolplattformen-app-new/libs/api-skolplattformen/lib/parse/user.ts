import {User} from '../../../../libs/api/lib';

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
});
