import {Language} from '../../curriculum/src';
import {EventEmitter} from 'events';
import {DateTime} from 'luxon';
import {LoginStatusChecker, FrejaLoginStatusChecker} from './loginStatus';
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
  SchoolContact,
  Teacher,
} from './types';

export interface Api extends EventEmitter {
  isFake: boolean;
  isLoggedIn: boolean;
  getPersonalNumber(): string | undefined;
  login(personalNumber?: string): Promise<LoginStatusChecker>;
  loginFreja(): Promise<FrejaLoginStatusChecker>;
  setSessionCookie(sessionCookie: string): Promise<void>;
  getSessionHeaders(url: string): Promise<{[index: string]: string}>;
  getUser(): Promise<User>;
  getChildren(): Promise<EtjanstChild[]>;
  getCalendar(child: EtjanstChild): Promise<CalendarItem[]>;
  getClassmates(child: EtjanstChild): Promise<Classmate[]>;
  getNews(child: EtjanstChild): Promise<NewsItem[]>;
  getNewsDetails(child: EtjanstChild, item: NewsItem): Promise<any>;
  getMenu(child: EtjanstChild): Promise<MenuItem[]>;
  getNotifications(child: EtjanstChild): Promise<Notification[]>;
  getTeachers(child: EtjanstChild): Promise<Teacher[]>;
  getSchedule(
    child: EtjanstChild,
    from: DateTime,
    to: DateTime,
  ): Promise<ScheduleItem[]>;
  getSchoolContacts(child: EtjanstChild): Promise<SchoolContact[]>;
  getSkola24Children(): Promise<Skola24Child[]>;
  getTimetable(
    child: Skola24Child,
    week: number,
    year: number,
    lang: Language,
  ): Promise<TimetableEntry[]>;
  logout(): Promise<void>;
}
