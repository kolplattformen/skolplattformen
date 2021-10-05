import { etjanst } from './etjanst'
import { Teacher } from '../types'

const abbreviate = (firstname?: string, lastname?: string): string => 
  `${firstname?.substr(0,1)}${lastname?.substr(0,2)}`.toUpperCase()

export const teacher = ({
  id,
  sisId,
  firstname,
  lastname,
  emailaddress,
  telwork,
  active,
  status,
}: any): Teacher => ({
  id,
  sisId,
  firstname,
  lastname,
  email: emailaddress,
  phoneWork: telwork,
  active,
  status,
  timeTableAbbreviation: abbreviate(firstname, lastname)
})

export const teachers = (data: any): Teacher[] =>
  etjanst(data).map(teacher)
