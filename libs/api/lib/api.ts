import { Language } from '@skolplattformen/curriculum/dist/translations'
import { DateTime } from 'luxon'
import { LoginStatusChecker } from './loginStatus'
import {
  CalendarItem,
  Classmate,
  MenuItem,
  NewsItem,
  Notification,
  User,
  Skola24Child,
  EtjanstChild,
  TimetableEntry,
  ScheduleItem,
} from './types'

export interface Api {
  getPersonalNumber(): string | undefined
  login(personalNumber?: string): Promise<LoginStatusChecker>
  setSessionCookie(sessionCookie: string): Promise<void>
  getUser(): Promise<User>
  getChildren(): Promise<EtjanstChild[]>
  getCalendar(child: EtjanstChild): Promise<CalendarItem[]>
  getClassmates(child: EtjanstChild): Promise<Classmate[]>
  getNews(child: EtjanstChild): Promise<NewsItem[]>
  getNewsDetails(child: EtjanstChild, item: NewsItem): Promise<any>
  getMenu(child: EtjanstChild): Promise<MenuItem[]>
  getNotifications(child: EtjanstChild): Promise<Notification[]>
  getSchedule(child: EtjanstChild, from: DateTime, to: DateTime): Promise<ScheduleItem[]>
  getSkola24Children(): Promise<Skola24Child[]>
  getTimetable(child: Skola24Child, week: number, year: number, lang: Language): Promise<TimetableEntry[]>
  logout(): Promise<void>
}
