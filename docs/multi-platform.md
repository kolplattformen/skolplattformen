# Multi-plattformsarkitektur — flera skolsystem i samma vy

**Status:** Förslag (beslutat att skriva detta före kod)
**Mål:** Edward (Schoolsoft/ProCivitas) och Sixten (Infomentor) synliga och
navigerbara i samma app samtidigt — gemensam barnlista, en barnväljare, och
varje dataanrop routat till rätt system automatiskt.

---

## 1. Bakgrund / nuläge

### 1.1 Dagens modell: EN aktiv plattform

| Del | Fil | Beteende idag |
|---|---|---|
| Katalog | `apps/skolplattformen-app/data/schoolPlatforms.ts` | Lista med plattform-entries (id, displayName, api-fabrik, login-metoder) |
| Val | `libs/hooks/src/useSettingsStorage.tsx` | `current_school = "skolplattformen"` — **en sträng** i AsyncStorage |
| API | `libs/hooks/src/api.ts` | `getApi(hookName)` → fabrik för vald plattform, cache:s enligt `schoolPlatforms.ts` under nyckel inkl. `current_school` |
| Barn | `libs/hooks/src/useChildren.ts` | `api.getChildren()` mot DEN aktiva plattformen |
| Barnväljare | `apps/skolplattformen-app/components/childSwitcher.component.tsx` | Växlar `current_child_id` (sparat per konto: `${socialSecurityNumber}_current_child_id`) |
| Login | `login.component.tsx` | Väljer skola → metod → loggar in; redirectas till barn |
| Logout | `libs/hooks/src/hooks.ts` / adapters | Avslutar den enda sessionen |

### 1.2 Varför adaptrarna redan är redo
Både `api-schoolsoft` (#685) och `api-infomentor` (#680) är **statefulla per
instans, inte globalt**: egen cookie jar, egen BankID-checker, eget
session-cache — något Infomentor också bevisade med `skipAutoCookie` +
isolering (VNet). Samma gäller `api-skolplattformen`.
=> En ny orkestreringsnivå kan skapa flera instanser parallellt utan
adapterändringar.

### 1.3 Beslut som ligger till grund
- `api-hjarntorget` (Göteborgs rester) och `api-skolplattformen` (Stockholm
  legacy) tas bort — Sixten är i Infomentor, Edward i Schoolsoft, ingen används.
- `api` (legacy-fabriken) behåller endast `init`-gränssnittet som fasas ut
  när `api-skolplattformen` försvinner.
- Infomentor i PR #680 (pausad review), Schoolsoft i PR #685 (aktiv).

---

## 2. Målbild

### 2.1 Koncept: aktiva plattformar + barn-union

```
Katalog (schoolPlatforms.ts, oförändrad data)
      │
      ▼
activePlatforms: string[]          ← @local_school_platforms i AsyncStorage
      │                              (init: ["infomentor-skoldiscen","schoolsoft-procivitas"])
      ▼
ApiRegistry: Map<platformId, Api>  ← per plattform: egen jar/checker/cache
      │
      ├─ getChildren()  ┐
      ├─ getChildren()  ├─►  ChildWithPlatform[]     (union, taggade)
      └─ getChildren()  ┘
      │
      ▼
Barnväljaren visar:  Sixten (Infomentor) • Edward (Schoolsoft)
      │
      ▼
Alla hooks: child → platformId → api ⇒ anropet rätt system
```

### 2.2 Nyckelkomponenter

1. **ActivePlatforms** (`@local_school_platforms`): array av platformId:n
   användaren lagt till. Migrering: befintlig `current_school` blir array med
   ett element. `useSettingsStorage` utökas med multiKey/JSON-parse.
2. **ApiRegistry** (`libs/hooks/src/api.ts`): `Map<string, Api>` —
   skapar/återanvänder en instans per platformId. `makeApiKey` utökas med
   platformId (så huvud + exempelvis Infomentors per-skola-sessionsnycklar
   aldrig kolliderar). Borttag: global `setApi`? behålls för test/fake.
3. **ChildWithPlatform**: `EtjanstChild & { platformId: string }` —
   intern typ i hooks (adaptrarnas kontrakt orörd). Identitetsnyckel
   `${platformId}:${childId}` används i cache/RQ-nycklar.
4. **Per-plattform session**: AsyncStorage-nycklar suffixa:s med platformId:
   t.ex. `@session_schoolsoft-procivitas`, `@cache_schoolId_...` som redan
   innehåller schoolId i Infomentor. `skSettings` (barnlåset per platform
   finns redan delvis: `current_school`).
5. **Login-proxy**: samma logingranulering som idag — en skola i taget —
   men knapptexten blir **"Lägg till skolplattform"** (samlad vy) och
   utloggning per plattform.
6. **Logout per plattform**: varje entry får egen logout — Schoolsofts
   `logoutURL` (redan fångad i header-API:t), Infomentors `logout` funktion.
   "Logga ut alla" frivilligt i inställningar.

### 2.3 Hooks som ändras (libs/hooks/src)

| Fil | Ändring |
|---|---|
| `api.ts` | Registry + `getApiFor(platformId)`; `getApi(hookName)` deprecated för barn-routade anrop |
| `useChildren.ts` | fan-out: parallella `getChildren()` mot **alla inloggade** plattformar i `activePlatforms`, eller per-visett filter `platformId` i options (bakåtkomp.) |
| `useChild()` | slår upp barnet ur unionen (därav ChildWithPlatform) — existerar inte formellt men konceptet `setChild(child)`/`currentChild` är central |
| `useMenu/calendar/schedule/news/notifications/...` | behåller signatur `(child)` men resolver `api = registry.get(child.platformId)` |
| `useSchoolSwitch.ts` | ersätts av `useAddPlatform` / `useRemovePlatform` (onboarding redan tänkt där: `onToggleDemo`) |
| `useLoggedIn()` | `any(registry.values()).isFake || ...` + per-plattform |

`apps/skolplattformen-app`: `login.component.tsx` (add-platform flow),
`childSwitcher.component.tsx` (union + platform badge),
`settings/` ev. per-plattform konto-kort. `autoRefresh`/`backgroundFetch`
respekterar att RQ-nycklar bär platformId baklänges.

---

## 3. Datamodell & persistens

```ts
// libs/hooks/src/types.ts (internt)
interface ChildWithPlatform extends EtjanstChild { platformId: string }

// AsyncStorage
'@local_school_platforms'          // JSON: string[]  (ny)
'current_school'                    // string        (legacy → migreras in i ovan vid första append)
'current_child_id'                  // "${platformId}:${childId}" (prefixad; okänd suffix-id = legacy → platformId "skolplattformen" ignoreras)
'@session_${platformId}'           // session artifact per plattform (Schoolsoft: JSESSION, Infomentor: Hub)
```

**Cache/RQ:** react-query-nyckeln `[childId, 'schoolId', ...]` räcker inte —
lägg platformId först: `[platformId, childId, ...]`. Det gör att dashboards
per barn kan cachas oberoende.

---

## 4. Edge cases & öppna frågor

| Fall | Hantering v1 |
|---|---|
| Samma person utfärdade på båda plattformarna (olika föräldrar/samma barn) | Hålles isär — det är feature: två entryar |
| Flera konton på SAMMA plattform (två Schoolsoft-föräldrar) | Stöds ej i v1 (dokumenterat) |
| Session går ut på ena plattformen | UI-badge "kräver inloggning" på barnet; resterande fungerar |
| Barnbyte inom Schoolsoft (currentChildId/orgId) | Oexponerat; fallet multi-barn i Schoolsoft mapperas som egna ChildWithPlatform-poster via header-`children[]` |
| Fake/demoläge | `usePlatformStorage`/fake-matrix i `fake.test.tsx` anpassas; fake = en plattform |
| Hjärntorget-rester i Infomentor-sprite? | städas i borttagnings-PR |

**Frågor till dig:**
1. Skall barnet märkas med skola i barnväljaren (badge "Infomentor"/"Schoolsoft")? Rekommenderat.
2. Vill du ha "**Logga ut alla**" eller bara per plattform?
3. När `current_child` pekar på plattform som tagits bort — auto-hoppa till första kvarvarande?

---

## 5. PR-uppdelning (test-drivet, inkrementellt)

| PR | Innehåll | Test-strategi |
|---|---|---|
| **A: Registry + ChildWithPlatform** | `ApiRegistry`, `useChildren` fan-out, `getApiFor`, nycklar prefixade | nya unit-tester i hooks-lib + alla 300/300 existerande gröna |
| **B: ActivePlatforms + migration** | storage-nyckel, migrering, `useAddPlatform`/`useRemovePlatform`, per-plattform session | lagrings-test (i stil med `useSettingsStorage.test.tsx`?) |
| **C: UI — barnväljare + add-platform-login** | childSwitcher union m badge; login = "Lägg till skolplattform"; logout per plattform | komponenttester + manuell walkthrough enligt `docs/testing/*` |
| **D: Borttagning legacy** | radera `libs/api-skolplattformen` + hjärntorget-rester + hooks-fake-beroendet | hela sviten + referensgrep |

Varje PR deploy:bar och bakåtkompatibel (single-platform-beteendet ändras
örhör det inte förrän C slås på vid andra plattform-add).

## 6. Utanför scopet (v1.x)
- QR-rendering av Schoolsoft-BankID i appen (proxy krävs — fortsatt autostart-länk)
- Skolmaten för Infomentor-menyn
- Kalender/nyheter från båda plattformarna i ett gemensamt flöde (v1: separata listor per barn, gemensam vy kommer via schemat per valt barn — gemensam **aggregaterad** kalender över barn är den naturliga v2:n)
