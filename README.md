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
import init from "@skolplattformen/embedded-api";
import CookieManager from "@react-native-community/cookies";

const api = init(fetch, () => CookieManager.clearAll());
```

#### node

```javascript
import init from "@skolplattformen/embedded-api";
import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie/node-fetch";
import { CookieJar } from "tough-cookie";

const cookieJar = new CookieJar();
const fetch = fetchCookie(nodeFetch, cookieJar);

const api = init(fetch, () => cookieJar.removeAllCookies());
```

### Login / logout

```javascript
api.on("login", async () => {
  // do stuff
  console.log(api.isLoggedIn) // true
  await api.logout()
});
api.on('logout', () => {
  // handle logout
  console.log(api.isLoggedIn) // false
}

const loginStatus = await api.login("YYYYMMDDXXXX");
window.open(
  `https://app.bankid.com/?autostarttoken=${loginStatus.token}&redirect=null`
);

loginStatus.on("PENDING", () => console.log("BankID app not yet opened"));
loginStatus.on("USER_SIGN", () => console.log("BankID app is open"));
loginStatus.on("ERROR", () => console.log("Something went wrong"));
loginStatus.on("OK", () =>
  console.log("BankID sign successful. Session will be established.")
);
```

### Loading data

```javascript
// Get current user
const user = await api.getUser();

// List children
const children = await api.getChildren();

// Get calendar
const calendar = await api.getCalendar(children[0]);

// Get classmates
const classmates = await api.getClassmates(children[0]);

// Get schedule
const from = moment().subtract(1, 'week')
const to = moment()
const schedule = await api.getSchedule(children[0], from, to)

// Get news
const news = await api.getNews(children[0])

// Get menu
const menu = await api.getMenu(children[0])

// Get notifications
const notifications = await api.getNotifications(children[0])
```

### Setting session cookie

It is possible to resurrect a logged in session by manually setting the session cookie.

```javascript
const sessionCookie = "some value";

api.setSessionCookie(sessionCookie); // will trigger `on('login')` event and set `.isLoggedIn = true`
```

## Try it out

1. Clone and enter repo: `git clone git@github.com:kolplattformen/embedded-api.git && cd embedded-api`
2. Install dependencies: `yarn`
3. Build package: `yarn build`
4. Run example: `node run [your personal number]`
5. Sign in with mobile BankID
