// Infomentor SAML routes
export const ssoLogin = (idp: string) =>
  `https://sso.infomentor.se/login.ashx?idp=${idp}`

export const samlResponseUrl =
  'https://sso.infomentor.se/login.ashx'

export const hubBaseUrl = 'https://hub.infomentor.se'

// API endpoints
export const appData = `${hubBaseUrl}/timetable/timetable/appData`
export const calendarEntries = `${hubBaseUrl}/calendarv2/calendarv2/getentries`
export const newsList = `${hubBaseUrl}/Communication/News/GetNewsList`
export const notifications = `${hubBaseUrl}/NotificationApp/NotificationApp/GetNotifications`
