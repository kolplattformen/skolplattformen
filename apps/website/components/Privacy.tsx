import Link from './Link'

const Privacy = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-5 md:px-0 my-5 md:my-24 prose dark:prose-dark">
        <h1>Öppna Skolplattformen</h1>
        <h2>Integritetspolicy</h2>
        <p>
          "Öppna Skolplattformen", hädanefter "appen", byggs av "Not free beer
          AB" som en kommersiell app. Appen hämtar all information från
          respektive skolplattform, hädanefter Skolplattformen, efter
          inloggning via BankID. Appens funktion är därmed direkt knuten till
          att Skolplattformen fungerar. Vi kan endast ta ansvar för att vår kod
          fungerar – inte deras.
        </p>
        <p>
          Denna sida är till för att informera våra besökare och användare om
          våra policies gällande insamling och hantering av personlig
          information från användare av tjänsten.
        </p>
        <h3>TLDR (~kort sammanfattning på ren svenska)</h3>
        <p>
          All information i appen kommer från Skolplattformen. Informationen
          lämnar aldrig din telefon. Vi är snudd på integritetsfanatiker och
          skulle aldrig drömma om att samla in information om dig eller dina
          barn. Det enda som lagras är sånt som lagras i din telefon för att det
          ska gå snabbare att använda appen. Om vi börjar samla loggar för att
          lättare kunna lösa eventuella buggar kommer vi se till att de inte
          innehåller någon som helst information om dig eller ditt barn - bara
          om koden.
        </p>
        <h3>Insamling och användning av personlig information</h3>
        <p>
          All information som hämtas visas endast för inloggad användare.
          Informationen cacheas på den mobila enheten. Ingen information skickas
          från den mobila enheten eller lagras, analyseras eller processas någon
          annanstans.
        </p>
        <p>
          Inga tredjepartssystem har tillgång till någon del av informationen.
        </p>
        <h3>Loggning av data</h3>
        <p>
          För närvarande sker ingen loggning av data. Detta kan komma att
          ändras. Om så sker kommer loggad data att vara strikt begränsad till
          systeminformation såsom namn på mobil enhet och operativsystemversion
          samt information om eventuella fel som uppstått i användningen. Ingen
          personlig information härrörande från Skolplattformen kommer att
          samlas in.
        </p>
        <h3>Cookies</h3>
        <p>
          Cookies är filer med små mängder data som används för att identifiera
          användaren. Dessa används av Skolplattformen och skickas endast dit.
          Cookies sparas lokalt i enheten och rensas när en inloggad session
          avslutas.
        </p>
        <h3>Säkerhet</h3>
        <p>
          Vi har gjort vårt yttersta för att säkerställa säkerheten för din
          information. Detta innebär i praktiken att vi aldrig skickar vidare
          någon personlig data från din mobila enhet. All personlig information
          levereras från Skolplattformen och därmed är du i slutänden hänvisad
          till att lita på säkerheten i det systemet. I fall då vi, i arbetet
          med att bygga denna app, har upptäckt potentiella svagheter i
          Skolplattformen har vi vidtagit steg för att rapportera detta på ett
          ansvarsfullt sätt. Detta kommer vi göra även fortsättningsvis. Kom
          ihåg att elektronisk lagring och överföring över Internet aldrig kan
          garanteras vara 100% säker.
        </p>
        <h3>Integritet för barn</h3>
        <p>
          Appen läser information från system som hanterar barn under 13 år.
          Oavsett barnets ålder skickar vi ingen information vidare från din
          enhet. Den information du får tillgång via appen är samma som du når
          via Skolplattformen.
        </p>
        <h3>Förändringar av integritetspolicyn</h3>
        <p>
          Denna integritetspolicy kan komma att uppdateras. Eftersom vi inte
          samlar in någon information om våra användare kan vi tyvärr inte
          kontakta dig om så sker. Vi kommer dock informera om det i appen. Om
          du vill vara på den säkra sidan kan du återbesöka den här sidan då och
          då.
        </p>
        <p>
          Denna integritetspolicy gäller fr.o.m. 2021-09-13. Ändringar i denna
          policy finns dokumenterade på vår{' '}
          <Link.External href="https://github.com/kolplattformen/skolplattformen/">
            GitHub
          </Link.External>
          .
        </p>
        <h3>Kontakta oss</h3>
        <p>
          Tveka inte att kontakta oss om du har några frågor eller förslag till
          förbättringar av denna integritetspolicy. Skicka ett mail till{' '}
          <a href="mailto:dev@skolplattformen.org">dev@skolplattformen.org</a>.
        </p>
      </div>
    </div>
  )
}

export default Privacy
