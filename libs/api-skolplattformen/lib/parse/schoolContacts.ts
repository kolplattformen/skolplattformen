import { etjanst } from './etjanst'
import { SchoolContact } from '../types'

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
})


export const schoolContacts = (data: any): SchoolContact[] =>
  etjanst(data).map(schoolContact)