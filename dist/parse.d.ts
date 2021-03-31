import { CalendarItem, Child, Classmate, Guardian, MenuItem, NewsItem, ScheduleItem, User, Notification } from './types';
export interface EtjanstResponse {
    Success: boolean;
    Error: string | null;
    Data: any | any[];
}
export declare const etjanst: (response: EtjanstResponse) => any | any[];
export declare const user: ({ socialSecurityNumber, isAuthenticated, userFirstName, userLastName, userEmail, notificationId, }: any) => User;
export declare const child: ({ id, sdsId, name, status, schoolId }: any) => Child;
export declare const children: (data: any) => Child[];
export declare const guardian: ({ emailhome, firstname, lastname, address, telmobile, }: any) => Guardian;
export declare const classmate: ({ sisId, firstname, lastname, className, guardians, }: any) => Classmate;
export declare const classmates: (data: any) => Classmate[];
export declare const calendarItem: ({ id, title, description, location, longEventDateTime, longEndDateTime, allDayEvent, }: any) => CalendarItem;
export declare const calendar: (data: any) => CalendarItem[];
export declare const newsItem: ({ newsId, header, preamble, body, bannerImageUrl, pubDateSe, modDateSe, authorDisplayName, altText, }: any) => NewsItem;
export declare const news: (data: any) => NewsItem[];
export declare const newsItemDetails: (data: any) => NewsItem;
export declare const scheduleItem: ({ title, description, location, longEventDateTime, longEndDateTime, isSameDay, allDayEvent, }: any) => ScheduleItem;
export declare const schedule: (data: any) => ScheduleItem[];
export declare const menuItem: ({ title, description }: any) => MenuItem;
export declare const menu: (data: any) => MenuItem[];
export declare const menuList: (data: any) => MenuItem[];
export declare const notification: ({ notification: { messageid, dateCreated }, notificationMessage: { messages: { message: { category, messagetext, linkbackurl, messagetype: { type }, sender: { name }, }, }, }, }: any) => Notification;
export declare const notifications: (data: any) => Notification[];
