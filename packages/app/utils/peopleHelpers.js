export const studentName = (name) => name?.replace(/\s?\(\w+\)$/, '')

export const sortByFirstName = (data) =>
  data.sort((a, b) => a.firstname.localeCompare(b.firstname))

export const guardians = (data) =>
  sortByFirstName(data).map(fullName).join(', ')

export const fullName = (person) => `${person.firstname} ${person.lastname}`
