import {etjanst} from './etjanst';
import {SchoolContact} from '../../../../libs/api/lib';

export const schoolContact = ({
  title,
  name,
  phone,
  email,
  schoolName,
  className,
}: any): SchoolContact => ({
  title,
  name,
  phone,
  email,
  schoolName,
  className,
});

export const schoolContacts = (data: any): SchoolContact[] =>
  etjanst(data).map(schoolContact);
