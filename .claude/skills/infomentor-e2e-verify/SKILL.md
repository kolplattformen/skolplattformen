---
name: infomentor-e2e-verify
description: Automatiserad e2e-verifiering av Skolplattformen-appen (Expo/RN) i iOS-simulator + enhetstester + node-harness mot Infomentor — utan användare som klickar. Använd efter kodändringar i appen eller libs/api-infomentor, inför PR, eller för att bekräfta att alla vyer (schema/kalender/nyheter/notiser/barnkort) fortfarande fungerar med riktig data.
---

# Infomentor e2e-verifieringsloop (huvudlös)

## 0. Snabbchecker

```bash
cd <repo> && npx tsc --noEmit -p libs/api-infomentor/tsconfig.json && npx tsc --noEmit -p apps/skolplattformen-app/tsconfig.json
npx nx test api-infomentor --skip-nx-cache        # 7/7 förväntat
```

## 1. Simulator-omgång

```bash
# Metro (med -c om .env.local ändrats, annars vanligt)
lsof -ti tcp:8082 | xargs kill -9 2>/dev/null
cd apps/skolplattformen-app && nohup npx expo start -c --port 8082 >> /tmp/expo-saml3.log 2>&1 &
sleep 15; curl -s http://localhost:8082/status   # packager-status:running

L=$(wc -l < /tmp/expo-saml3.log)
xcrun simctl terminate <UDID> org.skolplattformen.app 2>/dev/null
xcrun simctl openurl <UDID> "exp+skolplattformen-app://expo-development-client/?url=http%3A%2F%2Flocalhost%3A8082"
# UDID t.ex. "iPhone 17 Pro": xcrun simctl list devices booted
```

## 2. Polla ny logg (tail -n +$L /tmp/expo-saml3.log)

- `[env] INFOMENTOR_DEV_SESSION len=404 marker=...` — bundlen bär session (lägg märke till värdet!).
- `[dev] auto-login: dev session present` + `isAuthenticated: true`.
- `[hub-body] <endpoint> len=N` — ALLA fyra > 0: appData (~9k), GetNewsList (~30k), getentries (~16k), GetNotifications (~4k). **Alla len=0 = sessionen stängd** → kör `skill infomentor-dev-session`.
- `[child-name] parsed: <namn>` — barnnamnsparsning fungerar.
- ERROR-linjer med `EMPTY` = 0-length svar; `Render Error` = krasch — gräva i stacken.

## 3. Skärmdump

```bash
sleep 12 && xcrun simctl io "iPhone 17 Pro" screenshot /tmp/shot.png
```
Bilden kan analyseras via en image-parser-agent (t.ex. task med subagent_type=image-parser) — be om: header-text, kortets toppekant i förhållande till headern, barnnamn, schema-/nyhetsposter. Öppna för användaren med `open /tmp/...`.
Fysisk iPhone: `xcrun devicectl device process launch --device <DEVICE_ID> --terminate-existing org.skolplattformen.app` — misslyckas med "Locked" om telefonen är låst (vänta på användaren).

## 4. Data-layer-verifiering utan UI (node-harness)

Återanvänd `/tmp/tt-harness.ts`-mönstret (se AGENTS.md): tough-cookie `CookieJar.deserializeSync('/tmp/infomentor-jar.json')`, `init(loggedFetch, jar, undefined, 'stockholm_par')`, `(api as any).isLoggedIn = true`, anropa sedan `getChildren/getTimetable(child, isoWeek, year, lang)/getNews/getCalendar/getNotifications` och printa count + sample. TSX körs: `cd libs/api-infomentor && npx tsx /tmp/tt-harness.ts`.

## Klarmått

tsc ×2 gröna, 7/7 tester, alla 4 `[hub-body]` len>0, ingen Render Error, barnnamn parsat, screenshot visar barnkort med schema + nyheter under headern.
