"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifications = exports.notification = exports.menuList = exports.menu = exports.menuItem = exports.schedule = exports.scheduleItem = exports.newsItemDetails = exports.news = exports.newsItem = exports.calendar = exports.calendarItem = exports.classmates = exports.classmate = exports.guardian = exports.children = exports.child = exports.user = exports.etjanst = void 0;
const parseHtml_1 = require("./parseHtml");
const camel = require('camelcase-keys');
const etjanst = (response) => {
    if (!response.Success) {
        throw new Error(response.Error || '');
    }
    return camel(response.Data, { deep: true });
};
exports.etjanst = etjanst;
const user = ({ socialSecurityNumber, isAuthenticated, userFirstName, userLastName, userEmail, notificationId, }) => ({
    personalNumber: socialSecurityNumber,
    firstName: userFirstName,
    lastName: userLastName,
    email: userEmail,
    isAuthenticated,
    notificationId,
});
exports.user = user;
const child = ({ id, sdsId, name, status, schoolId }) => ({
    id,
    sdsId,
    name,
    status,
    schoolId,
});
exports.child = child;
const children = (data) => exports.etjanst(data).map(exports.child);
exports.children = children;
const guardian = ({ emailhome, firstname, lastname, address, telmobile, }) => ({
    firstname,
    lastname,
    address,
    mobile: telmobile,
    email: emailhome,
});
exports.guardian = guardian;
const classmate = ({ sisId, firstname, lastname, className, guardians = [], }) => ({
    sisId,
    firstname,
    lastname,
    className,
    guardians: guardians.map(exports.guardian),
});
exports.classmate = classmate;
const classmates = (data) => exports.etjanst(data).map(exports.classmate);
exports.classmates = classmates;
const calendarItem = ({ id, title, description, location, longEventDateTime, longEndDateTime, allDayEvent, }) => ({
    id,
    title,
    description,
    location,
    allDay: allDayEvent,
    startDate: longEventDateTime
        ? new Date(longEventDateTime).toISOString()
        : undefined,
    endDate: longEndDateTime
        ? new Date(longEndDateTime).toISOString()
        : undefined,
});
exports.calendarItem = calendarItem;
const calendar = (data) => exports.etjanst(data).map(exports.calendarItem);
exports.calendar = calendar;
const IMAGE_HOST = 'https://etjanst.stockholm.se/Vardnadshavare/inloggad2/NewsBanner?url=';
const newsItem = ({ newsId, header, preamble, body, bannerImageUrl, pubDateSe, modDateSe, authorDisplayName, altText, }) => ({
    header,
    published: pubDateSe ? new Date(pubDateSe).toISOString() : '',
    modified: modDateSe ? new Date(modDateSe).toISOString() : '',
    id: newsId,
    author: authorDisplayName,
    intro: preamble.replace(/([!,.])(\w)/gi, '$1 $2'),
    imageUrl: bannerImageUrl,
    fullImageUrl: `${IMAGE_HOST}${bannerImageUrl}`,
    imageAltText: altText,
    body: parseHtml_1.toMarkdown(body),
});
exports.newsItem = newsItem;
const news = (data) => exports.etjanst(data).newsItems.map(exports.newsItem);
exports.news = news;
const newsItemDetails = (data) => exports.newsItem(exports.etjanst(data).currentNewsItem);
exports.newsItemDetails = newsItemDetails;
const scheduleItem = ({ title, description, location, longEventDateTime, longEndDateTime, isSameDay, allDayEvent, }) => ({
    title,
    description,
    location,
    allDayEvent,
    startDate: new Date(longEventDateTime).toISOString(),
    endDate: new Date(longEndDateTime).toISOString(),
    oneDayEvent: isSameDay,
});
exports.scheduleItem = scheduleItem;
const schedule = (data) => exports.etjanst(data).map(exports.scheduleItem);
exports.schedule = schedule;
const menuItem = ({ title, description }) => ({
    title,
    description: parseHtml_1.toMarkdown(description),
});
exports.menuItem = menuItem;
const menu = (data) => exports.etjanst(data).map(exports.menuItem);
exports.menu = menu;
const menuList = (data) => {
    const etjanstData = exports.etjanst(data);
    const menuFS = etjanstData;
    const currentWeek = menuFS.menus.find((item) => menuFS.selectedWeek === Number.parseInt(item.week, 10));
    if (!currentWeek) {
        return [
            {
                title: 'Måndag - Vecka ?',
                description: 'Hittade ingen meny',
            },
        ];
    }
    const menuItemsFS = [
        {
            title: `Måndag - Vecka ${currentWeek.week}`,
            description: currentWeek.mon,
        },
        {
            title: `Tisdag - Vecka ${currentWeek.week}`,
            description: currentWeek.tue,
        },
        {
            title: `Onsdag - Vecka ${currentWeek.week}`,
            description: currentWeek.wed,
        },
        {
            title: `Torsdag - Vecka ${currentWeek.week}`,
            description: currentWeek.thu,
        },
        {
            title: `Fredag - Vecka ${currentWeek.week}`,
            description: currentWeek.fri,
        },
    ];
    return menuItemsFS;
};
exports.menuList = menuList;
const notification = ({ notification: { messageid, dateCreated }, notificationMessage: { messages: { message: { category, messagetext, linkbackurl, messagetype: { type }, sender: { name }, }, }, }, }) => ({
    id: messageid,
    message: messagetext,
    sender: name,
    url: linkbackurl,
    dateCreated: new Date(dateCreated).toISOString(),
    category,
    type,
});
exports.notification = notification;
const notifications = (data) => exports.etjanst(data).map(exports.notification);
exports.notifications = notifications;
//# sourceMappingURL=parse.js.map