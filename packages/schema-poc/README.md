Schema POC
===

## Status
POC fungerar, jag tror att jag förstår ungefär hur systemen fungerar. Har bara följt de request och de anrop som görs när jag är inloggad. Vet inte hur det fungerar för någon annan.

Jag har benat ut lite frågetecken angående id:n
Eftersom detta är ett annat system så har allting andra GUIDar än de vi får från skolplattformen. I värsta fall får vi matcha på namn.
Jag har har lagt till en funktion som hämtar alla ens barn och loopar igenom dem och skriver ut schema.
//Kajetan

## För att testa

Lägg in en cookie från din webbläsare i 'cookie' fältet. Då ska koden logga in dig och visa schema för valt barn

    cookie= 'din cookie'
    

Kör igång

    node index.js

## Nästa steg

Nu ska vi försöka få in detta i embedded_api - sedan lägga det som flik i appen.

## Kvar att göra

1. Rensa i fälten - jag har kvar mer fält nu än vad jag vet behövs. Det bör säkerligen kunna rensas bort en hel del. 
2. Hämta URL:er dynamiskt. Bättre att hämta det som kommer
3. Robusthet i regex. ignore case etc.


