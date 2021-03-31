import { CalendarItem, Child, Classmate, MenuItem, NewsItem, Notification, ScheduleItem, User } from './types';
export declare const user: () => User;
export declare const children: () => Child[];
export declare const classmates: (child: Child) => Classmate[];
export declare const news: (child: Child) => NewsItem[];
export declare const calendar: (child: Child) => CalendarItem[];
export declare const schedule: (child: Child) => ScheduleItem[];
export declare const menu: (child: Child) => MenuItem[];
export declare const notifications: (child: Child) => Notification[];
