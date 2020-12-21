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
// List children
const children = await api.getChildren();

// Get calendar
const calendar = await api.getCalendar(children[0].id);
```

### Setting session cookie

It is possible to resurrect a logged in session by manually setting the session cookie.

```javascript
const sessionCookie = "some value";

api.setSessionCookie(sessionCookie); // will trigger `on('login')` event and set `.isLoggedIn = true`
```
