import { EventEmitter } from 'events'

const emitter = new EventEmitter()

const createApi = () => ({
  emitter,
  isLoggedIn: false,
  login: jest.fn(),
  logout: jest.fn(),
  on: jest.fn().mockImplementation((...args) => emitter.on(...args)),
  off: jest.fn().mockImplementation((...args) => emitter.off(...args)),

  getSession: jest.fn(),
  getPersonalNumber: jest.fn(),

  getCalendar: jest.fn(),
  getChildren: jest.fn(),
  getSkola24Children: jest.fn(),
  getClassmates: jest.fn(),
  getMenu: jest.fn(),
  getNews: jest.fn(),
  getNewsDetails: jest.fn(),
  getNotifications: jest.fn(),
  getSchedule: jest.fn(),
  getSchoolContacts: jest.fn(),
  getTeachers: jest.fn(),
  getTimetable: jest.fn(),
  getUser: jest.fn(),
})
const init = jest.fn().mockImplementation(() => createApi())

export default init
