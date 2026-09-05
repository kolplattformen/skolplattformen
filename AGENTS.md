# AGENTS.md — guide för kodagenter och nya bidragsgivare

Aktiv utvecklingslinje: **Infomentor-adaptern** (Stockholm), PR #680 på branch `feat/infomentor-adapter`, byggd ovanpå Expo-migreringen (#679). Appen körs med Expo (~52) + expo-dev-client; **Expo Go fungerar inte** (native cookiemodul).

## Repo-struktur (det som spelar roll här)

- `apps/skolplattformen-app/` — Expo RN-app (UI Kitten, valtio, react-navigation). Infomentor är default/enda plattform (`data/schoolPlatforms.ts`).
- `libs/api-infomentor/` — adaptern. All backend-logik: `lib/api.ts` (login/QR/dev-session/cookies + parsers), `lib/features.ts`, `scripts/e2e-*.ts` (harness).
- `libs/api/` — delade typer/kontrakt (`TimetableEntry`, `Notification`, `Fetcher wrap()` m.m.). Ändra här med försiktighet — alla adapters delar kontrakten.
- `libs/hooks/` — `useChildList`, `useTimetable`, `useNews` osv. Appens views konsumerar via hooks.

## Kommandon

```bash
yarn                                   # installera (yarn classic + nx)
npx nx test api-infomentor --skip-nx-cache   # adapterns enhetstester (jest)
npx tsc --noEmit -p libs/api-infomentor/tsconfig.json
npx tsc --noEmit -p apps/skolplattformen-app/tsconfig.json
cd apps/skolplattformen-app && npx expo start --port 8082   # Metro
npx expo start -c                      # Metro med cache-clear (KRÄVS efter .env-ändring)
cd libs/api-infomentor && npx tsx scripts/e2e-qr-server.ts  # minta dev-session
```

## Infomentor-domänkunskap (viktigt!)

Alla anrop går mot `https://hub.infomentor.se` med cookie-session:

- **Endpoints** (alla POST + JSON + cookies): `/timetable/timetable/appData` (schema), `/Communication/News/GetNewsList`, `/NotificationApp/NotificationApp/GetNotifications`, `/calendarv2/calendarv2/getentries` (`{startDate,endDate}` → ren array). Kalender- och notis-`appData` innehåller typer/färger/URL:er.
- **Barnets namn** finns i hub-startsidans HTML: `IMHome = { init: { selectedPupilName: 'Efternamn, Förnamn', ... } }` — parsas i `getChildName()`.
- **IMHome-cookien lever ~40 min.** Utgången session ⇒ servern svarar `200` med **tom body** (inte felkod!). Fel/krockande cookies ⇒ `302` till login (`/Authentication/...`).
- **F5-affinitet:** `BIGipServer~INFOMENTOR~INFOMENTOR-SE-HTTPS-POOL` måste peka på den backend-nod som sessionen skapades på. Fel nod ⇒ login-redirect trots giltigt sessions-id.
- **Dubblett-cookienamn** kollapsar i native cookie-store med "last wins" — dubbletter i en dev-session-sträng kan peka fel nod. `clearAll()` körs därför FÖRE dev-session-injektion i både `login()` och `startQrLogin()`.
- RN-fetch slår ihop flera `Set-Cookie`-headrar till EN sträng — `storeCookies` splittar med `split(/,(?=[^;]+?=)/g)` (annars försvinner `SMSESSION` efter BankID-OK).
- SSO-kedjan: `sso.infomentor.se/login.ashx?idp=stockholm_par` → stockholm.se → BankID (QR beställs via NECS; ordern kan ibland födas död → omstart av kedjan max 3 ggr, implementerat i `startQrLogin`).

## Dev-session-workflow (test utan BankID-scan)

1. Kör `npx tsx scripts/e2e-qr-server.ts` i `libs/api-infomentor` (jar sparas i `/tmp/infomentor-jar.json`, DEV-SESSION-rad skrivs ut i loggen med minimal 4-cookie-rad: `ASP.NET_SessionId` + `BIGip` + `TS0116cbba` + `IMHome`).
2. Klistra in raden i `apps/skolplattformen-app/.env.local` under `EXPO_PUBLIC_INFOMENTOR_DEV_SESSION=`. **Filen är gitignored — committa ALDRIG sessionen.**
3. Starta om Metro med `-c` (`EXPO_PUBLIC_*` inline:as vid transform).
4. Appen loggar in automatiskt (auto-login körs en gång per app-session; efter utloggning stannar man på login-skärmen).

## Automatiserad verify-loop (utan användare)

```bash
xcrun simctl boot "iPhone 17 Pro"   # eller existerande booted
xcrun simctl terminate <udid> org.skolplattformen.app 2>/dev/null
xcrun simctl openurl <udid> "exp+skolplattformen-app://expo-development-client/?url=http%3A%2F%2Flocalhost%3A8082"
# polla loggen:
grep -E "\[hub-body\]|\[env\]|\[dev\]|isAuthenticated" /tmp/expo-saml3.log | tail
# len=0 på alla endpoints = sessionen utgången → minta ny
xcrun simctl io "iPhone 17 Pro" screenshot /tmp/shot.png
```

Loggningsmarkörer: `[env]` (vilken session bundlen bär, via slice-marker), `[dev] auto-login`, `[hub-body] <endpoint> len=N` (N=0 ⇒ session död), `[child-name]` (parsat barnnamn). Fysisk iPhone: `xcrun devicectl device process launch --device <id> --terminate-existing org.skolplattformen.app` (kräver upplåst telefon).

## Data-verification utan UI (node-harness-resurser)

- `/tmp/infomentor-jar.json` — tough-cookie-jar från senaste QR-sessionen; laddas med `CookieJar.deserializeSync` + `init(loggedFetch, jar, undefined, 'stockholm_par')`.
- Knack: `(api as any).isLoggedIn = true` hoppar över login; anropa sedan `api.getChildren()/getTimetable(child, isoWeek, year, lang)/getNotifications(child)` direkt.

## Konventioner

- Tydliga svenska kommentarer i adaptern/features beskriver verifierade API-strukturer — **uppdatera dem när API:t ändras** (de är dokumentation).
- Verifiera alltid: tsc (lib + app) + `nx test api-infomentor` + live-harness innan push.
- Committa ej sessioner/cookies; `.env.local`/`.env*` är gitignored.
- Git: aldrig direkt på main; PR mot main, nuvarande linje är `feat/infomentor-adapter` (#680; baseras på `feat/expo-migration` #679 — rebase vid behov).

## Kända luckor (bra nästa steg för nya bidragsgivare)

- Matsedel (`getMenu`), klasskamrater/lärare, frånvaro — returnerar `[]`/ogated. Frånvaro finns i webben under `/#/attendance/...`.
- Session-persistens i appen (AsyncStorage + `api.setSessionCookie()`) saknas — session dör med appprocessen.
- Notis-djup-länkar (`url` mappas men tap öppnar WebView som saknar session).
- patch-package för expo-localization (Swift-patch i node_modules) är ej delad via git.
