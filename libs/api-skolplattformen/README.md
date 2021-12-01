# embedded-api

Since the proxy was blocked (and also deemed a bad idea by some), this is a reboot of the API running in process in the app(s).

## Installing

`npm i -S @skolplattformen/embedded-api` or `yarn add @skolplattformen/embedded-api`

## Calling

### Import and init

Since fetch and cookies behave distinctly different in node, react-native and the browser,
the concrete implementation of fetch and cookie handler must be injected.

#### react-native

```javascript
import init from '@skolplattformen/api'
import CookieManager from '@react-native-cookies/cookies'

const api = init(fetch, () => CookieManager.clearAll())
```

#### node

```javascript
import init from '@skolplattformen/api'
import nodeFetch from 'node-fetch'
import fetchCookie from 'fetch-cookie/node-fetch'
import { CookieJar } from 'tough-cookie'

const cookieJar = new CookieJar()
const fetch = fetchCookie(nodeFetch, cookieJar)

const api = init(fetch, cookieJar)
```

### Login / logout

```javascript
api.on('login', async () => {
  // do stuff
  console.log(api.isLoggedIn) // true
  await api.logout()
})
api.on('logout', () => {
  // handle logout
  console.log(api.isLoggedIn) // false
}

const loginStatus = await api.login('YYYYMMDDXXXX')
window.open(
  `https://app.bankid.com/?autostarttoken=${loginStatus.token}&redirect=null`
)

loginStatus.on('PENDING', () => console.log('BankID app not yet opened'))
loginStatus.on('USER_SIGN', () => console.log('BankID app is open'))
loginStatus.on('ERROR', () => console.log('Something went wrong'))
loginStatus.on('OK', () =>
  console.log('BankID sign successful. Session will be established.')
)
```

### Loading data

```javascript
// Get current user
const user = await api.getUser()

// List children from Etjanster
const children = await api.getChildren()

// Get school calendar
const calendar = await api.getCalendar(children[0])

// Get classmates - disabled for reasons
// const classmates = await api.getClassmates(children[0])

// Get student's personal schedule
import { DateTime } from 'luxon'

const from = DateTime.local()
const to = DateTime.local().plus({ week: 1 })
const schedule = await api.getSchedule(children[0], from, to)

// Get news
const news = await api.getNews(children[0])

// Get news details
const newsDetails = await api.getNewsDetails(children[0], news[0])

// Get menu
const menu = await api.getMenu(children[0])

// Get notifications
const notifications = await api.getNotifications(children[0])

// Get list of children from Skola24 (because of course it's different *DERP*)
const skola24Children = await getSkola24Children()

// Get timetable
const weekNumber = 15
const year = 2021
const timetable = await api.getTimetable(skola24Children[0], weekNumber, year)
```

### Setting session cookie

It is possible to resurrect a logged in session by manually setting the session cookie.

```javascript
const sessionCookie = 'some value'

api.setSessionCookie(sessionCookie) // will trigger `on('login')` event and set `.isLoggedIn = true`
```

### Fake user

Login with personal number `12121212121212`, `201212121212` or `1212121212` and
api will be put into fake mode.
Static data will be returned and no calls to backend will be made.

The `LoginStatusChecker` returned by the login method will have `.token` set to 'fake'.

## Try it out

1. Clone and enter repo: `git clone git@github.com:kolplattformen/embedded-api.git && cd embedded-api`
2. Install dependencies: `yarn`
3. Build package: `yarn build`
4. Run example: `node run [your personal number]`
5. Sign in with mobile BankID
