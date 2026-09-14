---
name: infomentor-api-recon
description: Reverse-engineera Infomentor Hub-webbens API via Safari MCP — sätta session-cookies, navigera i SPA:n, fånga fetch/XHR-anrop (kalender, notiser, schema) och läsa IMHome.init ur HTML. Använd när nya endpoints ska hittas (t.ex. matsedel/frånvaro), när parsers ska verifieras mot riktiga svar, eller när fält saknas i appen.
---

# Infomentor API-recon med Safari MCP

## Setup (session behövs — kör skill infomentor-dev-session först om ny)

1. `safari_safari_new_tab` → https://hub.infomentor.se/ (första försöket kan ge "Failed to open page" — retry funkar).
2. Sätt cookies manuellt (endast hub-domänen — säkrast, undvikar krockar):
   - `safari_safari_set_cookie` ×4: `ASP.NET_SessionId`, `BIGipServer~INFOMENTOR~INFOMENTOR-SE-HTTPS-POOL`, `TS0116cbba`, `IMHome` (värden ur `/tmp/infomentor-jar.json` eller DEV-SESSION-raden), domain `hub.infomentor.se`, path `/`, secure true.
3. Navigera till `https://hub.infomentor.se/#/` → sida visar "InfoMentor Hub" och toppmenyn visar vårdnadshavare + barnnamn.

## Fånga anrop

- `safari_safari_start_network_capture` FÖRE varje vy. OBS: capture:n tappar arm vid hash-navigation/document-reload — arma om och interagera igen.
- Gå till Kalender/Schema/Notiser med `_click` på refs från `safari_safari_snapshot`. Kalender och Schema laddar `calendarv2/getentries` (läxor ÄR kalenderposter) + `calendarv2/appData` (typer med färger) + `NotificationApp/appData`.
- `safari_safari_network` (lista) / `safari_safari_network_details` (headers/status) — filter på path.
- Hård reload för boot-anrop: `safari_safari_reload hard:true` → bootet gör `isauthenticated` (302 via API/session-kontext), `NotificationApp/appData` och laddar hub-HTML med **IMHome.init** (barnnamn + roll) serverrenderat.

## Läsa svarskroppar

`safari_safari_evaluate` (async/Content-promises är OPÅLITLIGA här!)
- Det som fungerar: enkla enrads-script, helst **synkron XHR**; async fetch returnerar ofta "(no return value)".
- Verifiera kontextlivslängd: sätt `window.__t = 'x'` i ett anrop, läs i nästa (same world = ok).
- Performance API listar alla anropade URL:er:
  `performance.getEntriesByType('resource').map(e=>e.name).filter(u=>u.indexOf('hub.infomentor.se')>-1 && !/\.(js|css|png|svg|ttf|xml|ico)/.test(u)).join('\n')`
- Sync-XHR mot relativ path (exempel):
  `var x=new XMLHttpRequest();x.open('POST','/calendarv2/calendarv2/appData',false);x.send('{}');'S:'+x.status+' '+x.responseText.slice(0,800)`
- HTML-inbäddat (barnnamn): sök i `document.documentElement.innerHTML` efter `selectedPupilName`.

## Fallback: curl med EXAKT 4 cookies

Curl mot hubben fungerar med samma 4 cookier. OBS: använd ENDAST de fyra hub-cookierna — inte alla domäner ur jar:en (dubbel `ASP.NET_SessionId` hamnar först i headern → fel session → login-redirect).

## Sekretess

Detta rör en live-session med riktig elevdata (skollag/GDPR-nivå). Kör mot EGET konto/med samtycke, minimalt med anrop, spara inga personuppgifter i filer som delas (jar och .env.local är gitignored).
