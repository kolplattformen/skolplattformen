# @skolplattformen/api-schoolsoft

Adapter mot **Schoolsoft** (parent-vyn) för Skolplattformen-appen. Byggd mot live-inspelad
trafik från skol-slug `procivitas` (sms.schoolsoft.se/procivitas) med barnet
Edward Landgren (id 17149, klass SA24a). Samtliga parsers är rena funktioner
och testas mot rå-fixtures i `lib/__mocks__/`.

## Endpoints

| Syfte | Metod | URL | Format |
|---|---|---|---|
| Startsida (identitet, nyhetsbox, meddelanderäknare) | GET | `{baseUrl}/jsp/student/right_student_startpage.jsp` | HTML (iso-8859-1) |
| Kalender-inställningar (`userId`!) | GET | `{baseUrl}/rest-api/parent/calendar/settings` | JSON |
| Lektions-agenda (lektioner + lunch) | GET | `{baseUrl}/rest-api/parent/calendar/lessons/agenda?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` | JSON-bar array `[SsLessonEvent]` |
| Kalender-händelser (manuella; tom hos parent i inspelningen) | GET | `{baseUrl}/rest-api/parent/calendar/event/agenda?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` | JSON-bar array (samma form; `[]`) |
| Nyhetslista | GET | `{baseUrl}/jsp/student/right_student_news.jsp?type=1` | HTML |
| Nyhetsdetalj | GET | `{baseUrl}/jsp/student/right_student_news.jsp?requestid={id}&type=1&action=view` | HTML |
| Inkorg + personallista | GET | `{baseUrl}/jsp/student/right_student_message.jsp?folder=inbox` | HTML |
| Frånvaroblankett | GET | `{baseUrl}/jsp/student/right_student_absence.jsp` | HTML |

`baseUrl` = `https://sms.schoolsoft.se/{school}` (default-slug `procivitas`).
**Valfri skola** stöds via `school` eller full `baseUrl`-override i config.

## Inloggning (BankID via GrandID SAML)

`login(personalNumber)` driver följande kedja (rekognoscerad 2026-09-06):

```
GET  {baseUrl}/samlLogin.jsp
  → 302 via Shibboleth + saml2.grandid.com SSO
  → login.grandid.com/?sessionid={SID}&ReturnTo={RT}
GET  login.grandid.com/?sessionid={SID}&bankid=1   (personnummer-sida)
POST ?sessionid={SID}&bankid=1   body: pnr={12 siffror}
  → status-sida (fixture grandid-status.html) med:
    - bankid:///?autostarttoken={T}&redirect=null  → checker.token = {T}
    - roterande QR-SVG + JS-pollare:
GET  ?sessionid={SID}&collect=1  (JSON)
  {"response":"outstandingTransaction","hintCode":"outstandingTransaction",...} → vänta
  {"response":"outstandingTransaction","hintCode":"userSign"}                   → USER_SIGN
  {"response":"complete"}                                                       → klart!
GET  ?sessionid={SID}  → 302-kedja via resume.php + auto-submit SAML-form
                       (SAMLResponse/RelayState → {baseUrl}/Shibboleth.sso/SAML2/POST)
```

**VIKTIG UX-detalj:** ingen push sker till BankID-appen. Användaren måste
antingen (a) skanna QR-koden (roterande; finns som `QRCode` = base64-SVG i
varje collect-svar och inline på grandid-status-sidan), eller (b) på samma
enhet klicka/öppna `bankid:///?autostarttoken={T}&redirect=null`.
`USER_SIGN` (hintCode userSign) betyder att appen öppnats och väntar på sign.

Checker-events: `PENDING` direkt, `USER_SIGN` när användaren öppnat BankID,
`OK` vid lyckad kedja, `CANCELLED` vid cancel() (som även anropar
`&cancel-bankid=1`) eller avbrott, `ERROR` vid fel/timeout (120 s).
`token` = riktigt autostarttoken → appens `openBankId` öppnar BankID direkt
("thisdevice"). QR: token finns som base64-SVG i collect-svaren men renderas
ännu inte i appen (v1.5); användaren kan öppna BankID-appen manuellt.

GrandID validerar pnr mot AcadeMedia-AD **innan** ordern startas
("kunde inte hittas i AD") → tydligt `ERROR` direkt.

**DEV-genväg:** `sessionCookie` i config kortsluter hela flödet (som förut).

Fixtures från live-dumpar: `grandid-pnr.html`, `grandid-status.html`
(avidentifierade: sessionid/token ersatta, QR-SVG trunkerad),
`grandid-collect-{pending,usersign,complete}.json`.

### Dokumenterad men ännu inte kopplad

Frånvaroanmälan (`setAbsent` saknas i Api-gränssnittet):

```
POST {baseUrl}/jsp/student/right_student_absence_ajax.jsp
Content-Type: application/x-www-form-urlencoded

week={week}&student={userId}&day={dayId}&type=ls&absence=0|1
→ svarstext "message|reportedBy" ("old|…" om redan anmäld)
```

`day` är dagindex i veckan (0 = måndag), `type` är `ls` (lärarledd
studietid/heldag) eller `ps`, `absence=1` = anmäl, `0` = ångra.

## Datastrukturer (fusklapp)

### Agenda-event (`SsLessonEvent`)

```json
{"eventId":151951,"name":"SOISOO0","description":"SOISOO0",
 "startDate":"2026-08-31T11:40","endDate":"2026-08-31T12:50","allDay":false,
 "eventColor":"#24b370","editable":false,"room":"Stanford",
 "teachingGroup":"SOISOO0_SA24a","teacher":"Rebecka Lundvall","dayId":0,
 "status":2,"category":"lesson","roomBooking":false}
```

- `startDate`/`endDate` är **lokal tid utan zon** (`2026-08-31T11:40`).
- `dayId`: 0 = måndag i veckan. Mappas till `TimetableEntry.dayOfWeek` där
  **1 = måndag … 7 = söndag** (samma konvention som Skola24:s
  `dayOfWeekNumber` och luxon `weekday` - appen jämför mot
  `DateTime.isoWeekday()`).
- `name === 'Lunch'` mappas till Subject-formen `{code:'Lunch', name:'Lunch',
  category:''}` så att `week.component` känner igen lunchrutan
  (`code.toUpperCase() === 'LUNCH'`).

### Startsidans huvud (`#parent-header-root`)

```html
<p class="...MuiTypography-body2...">Edward Landgren</p>
<span class="...MuiTypography-caption...">ProCivitas Karlberg  | SA24a</span>
...
<a id="messages-link-button" aria-label="8 nya meddelanden">…</a>
<button id="menu-button">…<p>Christian</p></button>
```

### Nyheter

- Startsidan: `a.toplist-item[href*=right_student_news.jsp?requestid={id}]`
  med `.heading_bold` + ingress-div; kategori = närmast föregående `.h3_bold`.
- Nyhetssidan: `div#accordion-group{id}` med `span#name{id}`, `.preview-block`,
  `.accordion-heading-date-wide` ("24 aug.", "Igår"); aktiv nyhets brödtext
  ligger inline i `p.tinymce-p` + `Från`/`Publicerad` i `.inner_right_info`.

### Meddelanden

`div#accordion-group{id}` med `span#messheader{id}`, `.preview-block`,
`.accordion-heading-from`/`.accordion-heading-date`, brödtext i `span#mess{id}`,
svars-lärarid i `input[name="teacher{id}"]`. Personal för mottagarval i
`select[name="users"]` ("Efternamn Förnamn", hoppa över value `-222`).

## Caveats

- **JSP sidor är iso-8859-1 (deklarerat).** RN:s fetch avkodar som UTF-8 →
  eventuell mojibake för åäö i appen är en **känd begränsning**. Fixtures är
  sparade som UTF-8, så parsers är verifierade mot korrekt text; ev.
  transkodering i nätverkslagret återstår.
- **Session TTL:** JSP-lagrets egen JS antyder ~30 min inaktivitetstimout;
  vid död session bouncar GET till `Login.jsp`/`samlLogin`. `resumeSession()`
  detekterar både redirect och frånvaron av `#parent-header-root`.
- **Login-flödet är protoledes liveverifierat** (kedja + riktiga status-/collect-svar
  inspelade 2026-09-06). QR-renderingen i appen återstår (token finns i collect-JSON).
- **Freja stöds inte** (`LOGIN_FREJA_EID: false`).
- **Skola:** multi-school via `school`-slug eller `baseUrl`, inget
  ProCivitas-specifikt i parsers.
- Nyhetslistans datum är svenska kortformer ("24 aug.", "Igår") utan år -
  `svDateToIso` antar innevarande år.

## Test

```
npx nx test api-schoolsoft
npx nx lint api-schoolsoft
```
