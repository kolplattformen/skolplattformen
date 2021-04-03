Schema POC
===

## Status
POC fungerar, jag tror att jag förstår ungefär hur systemen fungerar. Har bara följt de request och de anrop som görs när jag är inloggad. Vet inte hur det fungerar för någon annan.

## För att testa
Ändra xxx-xxx-xxx till ditt barns childId (eller sdsId - vet inte vilket än).
Lägg in en cookie från din webbläsare i 'cookie' fältet. Då ska koden logga in dig och visa schema för valt barn

    cookie= 'din cookie'
    getSchema(cookie, 'xxxx-xxxx-xxx', '15', '2021')

Kör igång

    node index.js

## Nästa steg

Nu ska vi försöka få in detta i embedded_api - sedan lägga det som flik i appen.

## Kvar att göra

1. Rensa i fälten - jag har kvar mer fält nu än vad jag vet behövs. Det bör säkerligen kunna rensas bort en hel del. 
2. Hämta URL:er dynamiskt. Bättre att hämta det som kommer
3. Robusthet i regex. ignore case etc.


