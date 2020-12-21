# embedded-api

Since the proxy was blocked (and also deemed a bad idea by some), this is a reboot of the API running in process in the app(s).

## How to use

### Installing

`npm i -S @skolplattformen/embedded-api` or `yarn add @skolplattformen/embedded-api`

### Calling

#### Import and init

```javascript
import init from "@skolplattformen/embedded-api";

const api = init(fetch);
```

#### Login

```javascript
api.on("login", () => {
  // keep going
});

const loginStatus = await api.login("YYYYMMDDXXXX");
window.open(`https://app.bankid.com/?autostarttoken=${loginStatus.token}&redirect=null`);

loginStatus.on("PENDING", () => console.log("BankID app not yet opened"));
loginStatus.on("USER_SIGN", () => console.log("BankID app is open"));
loginStatus.on("ERROR", () => console.log("Something went wrong"));
loginStatus.on("OK", () => 
  console.log("BankID sign successful. Session will be established.")
);
```

#### Loading data

```javascript
// List children
const children = await api.getChildren();

// Get calendar
const calendar = await api.getCalendar(children[0].id);
```
