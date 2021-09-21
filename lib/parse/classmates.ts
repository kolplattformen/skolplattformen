import { etjanst } from './etjanst'
import { Classmate, Guardian } from '../types'

export const guardian = ({
  emailhome,
  firstname,
  lastname,
  address,
  telmobile,
}: any): Guardian => ({
  firstname,
  lastname,
  address,
  mobile: telmobile,
  email: emailhome,
})

export const classmate = ({
  sisId,
  firstname,
  lastname,
  className,
  guardians = [],
}: any): Classmate => ({
  sisId,
  firstname,
  lastname,
  className,
  guardians: guardians.map(guardian),
})

export const classmates = (data: any): Classmate[] =>
  etjanst(data).map(classmate)
