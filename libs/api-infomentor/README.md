# @skolplattformen/api-infomentor

Infomentor API adapter for Skolplattformen app.

## API Endpoints

Based on network analysis of the Infomentor Hub web interface:

- **Timetable/Schema**: `POST /timetable/timetable/appData`
- **Calendar**: `POST /calendarv2/calendarv2/appData` + `POST /calendarv2/calendarv2/getentries`
- **News**: `POST /Communication/News/GetNewsList`
- **Notifications**: `POST /NotificationApp/NotificationApp/GetNotifications`

## Authentication

Infomentor uses cookie-based authentication. Users log in via the web interface and the session cookie is used for API calls.

## Usage

```typescript
import { ApiInfomentor } from '@skolplattformen/api-infomentor'
import { wrapReactNativeCookieManager } from '@skolplattformen/api'

const api = new ApiInfomentor({
  fetch: fetch,
  cookieManager: wrapReactNativeCookieManager(cookieManager),
})

// Set session cookie from web login
await api.setSessionCookie('TS0116cbba=...')

// Get data
const news = await api.getNews(child)
const calendar = await api.getCalendar(child)
```
