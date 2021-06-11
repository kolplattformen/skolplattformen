import { Guardian } from '@skolplattformen/embedded-api'

export const studentName = (name?: string) => name?.replace(/\s?\(\w+\)$/, '')

export const sortByFirstName = (data: Guardian[]) =>
  data.sort((a, b) => a.firstname.localeCompare(b.firstname))

export const guardians = (data: Guardian[]) =>
  sortByFirstName(data).map(fullName).join(', ')

export const fullName = (person: Guardian) =>
  `${person.firstname} ${person.lastname}`

export const initials = (name?: string) => {
  return name
    ?.split(' ')
    .slice(0, 2)
    .map((word) => word.slice(0, 1))
    .join('')
}
