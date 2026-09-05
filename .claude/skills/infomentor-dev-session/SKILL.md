---
name: infomentor-dev-session
description: Hämta/förnya en Infomentor dev-session för Skolplattformen-appen. Använd när app-data är tom (len=0 i Metro-loggen), sessionen gått ut (~40 min TTL), eller när .env.local behöver en färsk EXPO_PUBLIC_INFOMENTOR_DEV_SESSION. Även när Metro startats om utan -c efter env-ändring.
---

# Infomentor dev-session (färsk session utan BankID-scan)

## När

- Metro-loggen visar `[hub-body] ... len=0` för alla endpoints (session utgången).
- Du bytt innehåll i `apps/skolplattformen-app/.env.local` (env inline:as vid transform).
- Appen visar data men slutar göra det efter ~40 min.

## Steg

1. Minta session (order auto-godkänns av Stockholms NECS-gateway för redan registrerad BankID-enhet — ingen scan):
```bash
cd libs/api-infomentor && nohup npx tsx scripts/e2e-qr-server.ts > /tmp/e2e-fresh.log 2>&1 &
# polla /tmp/e2e-fresh.log tills "Infomentor session established"
```
Servern skriver jar till `/tmp/infomentor-jar.json` och skriver ut en minimal rad med 4 cookies. Servern self-exitar.

2. Uppdatera `apps/skolplattformen-app/.env.local`:
```
EXPO_PUBLIC_INFOMENTOR_DEV_SESSION=<RADEN UR LOGGEN>
```
RADEN inleds oftast med `ASP.NET_SessionId=...; BIGipServer~INFOMENTOR~INFOMENTOR-SE-HTTPS-POOL=...; TS0116cbba=...; IMHome=...`.
Använd minimal-raden — extra cookies från andra domäner (sso/infomentor.se) kolliderar i native store (last-wins kollaps) och ger fel F5-nod.

3. Starta om Metro MED cache-clear:
```bash
lsof -ti tcp:8082 | xargs kill -9 2>/dev/null
cd apps/skolplattformen-app && nohup npx expo start -c --port 8082 >> /tmp/expo-saml3.log 2>&1 &
```
Vanlig omstart räcker EJ — `EXPO_PUBLIC_*` är inbakade i transform-cache:n.

4. Verifiera i loggen: `[env] INFOMENTOR_DEV_SESSION len=404 marker=<första sessionstecknen>` ska matcha nya raden; därefter `[dev] auto-login`, `isAuthenticated`, `[hub-body]` med `len>0` (appData ~9k, News ~30k, calendar ~16k, notiser ~4k).

## Felsökning

- `len=0` trots ny session → kolla att `[env]`-markören förändrats (eller står den gamla: -c saknades).
- `302`/login-redirect i body-start → krockande cookies eller fel `BIGip`-nod: använd bara de 4 hub-cookierna.
- Ordrar dör (`state:ERROR` i QR-server-loggen) → servern gör SSO-restart ×3 själv; om allt dör, försök igen senare (Stockholms ADC är flaky på kvällar).
- IMHome TTL ≈ 40 min — planera verifiering inom fönstret.
