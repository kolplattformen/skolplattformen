import {
  Api,
  CalendarItem,
  Classmate,
  EtjanstChild,
  MenuItem,
  NewsItem,
  Notification,
  ScheduleItem,
  SchoolContact,
  Skola24Child,
  Teacher,
  TimetableEntry,
  User,
} from '@skolplattformen/api'
import { Action, Reducer } from 'redux'

export interface Reporter {
  log?: (message: string) => void
  error?: (error: Error, label?: string) => void
}

export interface IApiContext {
  api: Api
  storage: AsyncStorage
  isLoggedIn: boolean
  isFake: boolean
  reporter: Reporter
}

export type EntityStatus = 'pending' | 'loading' | 'loaded' | 'error'
export interface EntityState<T> {
  data: T
  status: EntityStatus
  error?: Error
}

export interface ApiCall<T> {
  (): Promise<T>
}
export interface ExtraActionProps<T> {
  apiCall: ApiCall<T>
  retries: number
  key: string
  defaultValue: T
  getFromCache?: () => Promise<string | null>
  saveToCache?: (value: string) => Promise<void>
}
export type EntityActionType =
  | 'GET_FROM_API'
  | 'RESULT_FROM_API'
  | 'API_ERROR'
  | 'GET_FROM_CACHE'
  | 'RESULT_FROM_CACHE'
  | 'STORE_IN_CACHE'
  | 'CLEAR'
export type EntityName =
  | 'USER'
  | 'ETJANST_CHILDREN'
  | 'SKOLA24_CHILDREN'
  | 'CHILDREN'
  | 'CALENDAR'
  | 'CLASSMATES'
  | 'MENU'
  | 'NEWS'
  | 'NEWS_DETAILS'
  | 'NOTIFICATIONS'
  | 'SCHEDULE'
  | 'SCHOOL_CONTACTS'
  | 'TEACHERS'
  | 'TIMETABLE'
  | 'ALL'
export interface EntityAction<T> extends Action<EntityActionType> {
  entity: EntityName
  data?: T
  error?: Error
  extra?: ExtraActionProps<T>
}
export interface EntityMap<T> {
  [key: string]: EntityState<T>
}
export type EntityReducer<T> = Reducer<EntityMap<T>, EntityAction<T>>

export interface EntityStoreRootState {
  etjanstChildren: EntityMap<EtjanstChild[]>
  skola24Children: EntityMap<Skola24Child[]>
  user: EntityMap<User>
  calendar: EntityMap<CalendarItem[]>
  classmates: EntityMap<Classmate[]>
  menu: EntityMap<MenuItem[]>
  news: EntityMap<NewsItem[]>
  newsDetails: EntityMap<NewsItem>
  notifications: EntityMap<Notification[]>
  schedule: EntityMap<ScheduleItem[]>
  schoolContacts: EntityMap<SchoolContact[]>
  teachers: EntityMap<Teacher[]>
  timetable: EntityMap<TimetableEntry[]>
}

export interface EntityHookResult<T> extends EntityState<T> {
  reload: () => void
}

export interface AsyncStorage {
  getItem(key: string): Promise<string | null>
  setItem(key: string, value: string): Promise<void>
}
