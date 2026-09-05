# @skolplattformen/api-infomentor

Infomentor API adapter for Skolplattformen app.

## Implemented endpoints

Based on live network captures (web UI + app) against `hub.infomentor.se`:

| Funktion | Endpoint | Status |
|---|---|---|
| Inloggning (SSO → BankID/QR) | `https://sso.infomentor.se/login.ashx?idp=stockholm_par` | ✅ |
| Schema | `POST /timetable/timetable/appData` | ✅ (`getTimetable` + `getSchedule`) |
| Kalender | `POST /calendarv2/calendarv2/getentries` (`{startDate,endDate}` → ren array) | ✅ |
| Nyheter | `POST /Communication/News/GetNewsList` | ✅ (bilder absoluta URLs) |
| Notiser | `POST /NotificationApp/NotificationApp/GetNotifications` | ✅ (title/subTitle/appType mappat, URL:er absoluta) |
| Barnets namn | parsas ur hub-startsidans HTML (`IMHome.init.selectedPupilName`) | ✅ |
| Matsedel | saknar endpoint i hub | ❌ returnerar `[]` |
| Klasskamrater/lärare | ej utforskat | ❌ returnerar `[]` |
| Frånvaro | finns i webben (`/#/attendance/...`) men ej implementerat | ❌ |

Kända beteenden:
- Sessionen (`IMHome`-cookien) lever **~40 min**; därefter svarar hubben `200` med **tom body**.
- Fel cookies ger `302` → login-sida (appens fetch följer den → ser ut som tom 200).
- F5-nod-affinitet: `BIGipServer~INFOMENTOR~...POOOL`-cookien måste peka på noden sessionen skapades på.

## Development: dev-session (rekommenderat för test)

Full BankID-QR-flödet kan vara krångligt lokalt — kör en session via e2e-harnessen (ordern auto-godkänns av Stockholms NECS-gateway för redan registrerad BankID-enhet, ingen scan behövs)":

```bash
cd libs/api-infomentor && npx tsx scripts/e2e-qr-server.ts
# → "Infomentor session established" + en DEV-SESSION-rad i loggen
#   (utan scan; jar skrivs till /tmp/infomentor-jar.json)
```

1. Kopiera `DEV-SESSION`-raden (minst 4 cookies: `ASP.NET_SessionId`, `BIGipServer~...`, `TS0116cbba`, `IMHome`) till `apps/skolplattformen-app/.env.local`:
   `EXPO_PUBLIC_INFOMENTOR_DEV_SESSION=<raden>`
2. `.env.local` är gitignored — **committa aldrig sessionen**.
3. Starta om Metro med cache: `npx expo start -c --port 8082` (`EXPO_PUBLIC_*` inline:as i bundlen vid transform — vanlig omstart räcker ej).
4. Appen loggar in automatiskt (auto-login när env-variabeln är satt; env-check körs en gång per app-session).

## App login (riktigt flöde)

QR-login ("BankID med QR-kod") strömmar animerad QR från verifieringsordern; BankID-appen kan skanna från simulator eller annan enhet. Cookie-fix: RN-fetch slår ihop flera `Set-Cookie`-headrar → splittas (`split(/,(?=[^;]+?=)/g)`) i `storeCookies`, annars försvinner `SMSESSION` efter BankID-OK.

## API examples

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
const timetable = await api.getTimetable(child, isoWeek, year, lang)
```
