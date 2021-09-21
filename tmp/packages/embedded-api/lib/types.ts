import { Subject } from '@skolplattformen/curriculum'

export interface Cookie {
  name: string
  value: string
  path?: string
  domain?: string
  version?: string
  expires?: string
  secure?: boolean
  httpOnly?: boolean
}

export interface CookieManager {
  setCookie: (cookie: Cookie, url: string) => Promise<void>
  getCookies: (url: string) => Promise<Cookie[]>
  setCookieString: (cookieString: string, url: string) => Promise<void>
  getCookieString: (url: string) => Promise<string>
  clearAll: () => Promise<void>
}

export interface RequestInit {
  headers?: any
  method?: string
  body?: string
  /**
   * Set to `manual` to extract redirect headers, `error` to reject redirect */
  redirect?: string
}

export interface Headers {
  get(name: string): string | null
}

export interface Response {
  headers: Headers
  ok: boolean
  status: number
  statusText: string
  text: () => Promise<string>
  json: () => Promise<any>
}

export interface Fetch {
  (url: string, init?: RequestInit): Promise<Response>
}

export interface AuthTicket {
  order: string
  token: string
}

/**
 * @export
 * @interface CalendarItem
 */
export interface CalendarItem {
  id: number
  title: string
  description?: string
  location?: string
  startDate?: string
  endDate?: string
  allDay?: boolean
}

/**
 * @export
 * @interface Child
 */
export interface EtjanstChild {
  id: string
  /**
   * <p>Special ID used to access certain subsystems</p>
   * @type {string}
   * @memberof Child
   */
  sdsId: string
  name: string
  /**
   * <p>F - förskola, GR - grundskola?</p>
   * @type {string}
   * @memberof Child
   */
  status?: string
  schoolId?: string
}

export interface Child extends EtjanstChild, Skola24Child {}

/**
 * @export
 * @interface Classmate
 */
export interface Classmate {
  sisId: string
  className?: string
  firstname: string
  lastname: string
  guardians: Guardian[]
}

/**
 * @export
 * @interface Guardian
 */
export interface Guardian {
  email?: string
  firstname: string
  lastname: string
  mobile?: string
  address?: string
}

/**
 * <p>A news item from the school, for example a weekly news letter</p>
 * @export
 * @interface NewsItem
 */
export interface NewsItem {
  id: string
  author?: string
  header?: string
  intro?: string
  body?: string
  published: string
  modified?: string
  imageUrl?: string
  fullImageUrl?: string
  imageAltText?: string
}

/**
 * @export
 * @interface Notification
 */
export interface Notification {
  id: string
  sender: string
  dateCreated: string
  message: string
  url: string
  category: string | null
  type: string
}

/**
 * @export
 * @interface ScheduleItem
 */
export interface ScheduleItem {
  title: string
  description?: string
  location?: string
  startDate?: string
  endDate?: string
  oneDayEvent: boolean
  allDayEvent: boolean
}

export interface MenuItem {
  title: string
  description: string
}

export interface MenuList {
  selectedWeek: number
  menus: MenuListItem[]
}

export interface MenuListItem {
  week: string
  mon: string
  tue: string
  wed: string
  thu: string
  fri: string
}

export interface User {
  personalNumber?: string
  isAuthenticated?: boolean
  firstName?: string
  lastName?: string
  email?: string | null
  notificationId?: string
}

export interface Skola24Child {
  schoolGuid?: string
  unitGuid?: string
  schoolID?: string
  timetableID?: string
  personGuid?: string
  firstName?: string
  lastName?: string
}

export type SSOSystem = 'TimetableViewer'

export interface TimetableEntry extends Subject {
  id: string
  teacher: string
  location: string
  timeStart: string
  timeEnd: string
  dayOfWeek: number
  blockName: string
  dateStart: string
  dateEnd: string
}
