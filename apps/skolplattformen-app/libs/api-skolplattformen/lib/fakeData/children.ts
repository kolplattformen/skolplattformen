import { EtjanstChild, Skola24Child } from '@skolplattformen/api'

export const children = (): EtjanstChild[] => [
  {
    name: 'Shanel Nilsson (elev)',
    id: '39b59e-bf4b9f-f68ac25321-977218-bf0',
    sdsId: '8e81a06-53f55fb-d1b93-f0e5b357ad0b7caaf1d36',
    status: 'F;GR',
    schoolId: '9e58434-8800-da59547-614bf0e-e09c015',
  },
  {
    name: 'Alan Nilsson (elev)',
    id: 'eea96a-a3e045-caab589391-ed7d17-029',
    sdsId: 'bc2d341-8d970cc-69526-43501c082aaa870d9fe99',
    status: 'GR',
    schoolId: '8e6b13b-3116-e66c39b-a4c3fa5-a1d72d9',
  },
]
export const skola24Children = (): Skola24Child[] => [
  {
    firstName: 'Shanel',
    lastName: 'Jonsson Nilsson',
    personGuid: 'abc123',
    schoolGuid: 'def456',
    schoolID: 'Superskolan',
    timetableID: 'jkl012',
    unitGuid: 'mno345',
  },
]
