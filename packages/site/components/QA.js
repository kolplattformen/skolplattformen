const QA = () => {
  return (
    <div className="header">
      <div className="max-w-6xl px-5 mx-auto my-5 md:my-24 md:px-0 prose">
        <h1>Frågor och svar om Öppna Skolplattformen</h1>
        <h3>Är Öppna Skolplattformen lanserad?</h3>
        <p>
          Ja! Den finns på App Store och Google Play. Hämta gärna ner och hjälp
          oss att tipsa kollegor, vänner och partner. Du stöttar
          vidareutvecklingen genom att ladda ner appen.
        </p>
        <h3>Hur rapporterar man buggar och önskemål?</h3>
        <p>
          Vi vet att en app som lanseras har många brister därför är vi väldigt
          tacksamma för alla buggrapporter vi får. Vi satsar mycket på att så
          snabbt som möjligt fixa de saker som dyker upp. För att få lite
          ordning så försöker vi samla alla buggar och önskemål på samma ställe.{' '}
          <a href="https://github.com/kolplattformen/skolplattformen/issues">
            Github. Klicka här
          </a>{' '}
          för att se vilka funktioner och buggar vi redan har tagit emot och
          jobbar på.
        </p>
        <h3>Vad är Öppna Skolplattformen?</h3>
        <p>
          En app som ger föräldrar snabbare och lättare tillgång till
          informationen som finns på Stockholms Stads Skolplattform. Appen är
          som ett lager ovanpå befintliga plattformen som gör att vi kan visa
          samma information, men snabbare och med mindre krångel. Vi har byggt
          den för föräldrar. Vi har inte byggt något som kan användas av lärare
          eller elever, helt enkelt för att vi har utgått från den information
          vi själva har tillgång till som föräldrar, och de behov vi har.
        </p>
        <h3>Vem ligger bakom Öppna Skolplattformen?</h3>
        <p>
          Ett flertal frustrerade föräldrar, men framför allt Erik Hellman,
          Christian Landgren och Johan Öbrink. Vi är utvecklare och föräldrar
          till barn i grundskolan, och helt hänvisade till Skolplattformen i sin
          nuvarande form. Vi har tillsammans mer än 75 års erfarenhet som
          konsulter av att hantera personuppgifter och är alla tre flera år i
          rad utnämnda till Sveriges bästa utvecklare enligt IDG.
        </p>
        <h3>Varför har ni skapat Öppna Skolplattformen?</h3>
        <p>
          {' '}
          Två huvudsakliga skäl: Vi är föräldrar. Vi behöver viktig
          informationen som finns i Skolplattformen men den är fruktansvärt
          otillgänglig. Fråga vilken förälder eller lärare som helst. Vi är
          utvecklare. Tekniken och kunskapen för att bygga ett bra verktyg
          finns. Och till slut gick det inte att tyst betrakta hur kommunen
          bränner sådana oerhörda pengar på en så undermålig produkt, på grund
          av undermålig upphandling och okunnig kravställning.
        </p>
        <h3>Vilken data har Öppna Skolplattformen tillgång till?</h3>
        <p>
          Samma data som varje förälder har tillgång till genom kommunens
          Skolplattform. Den information som hämtas visas endast för den
          inloggade användaren. Informationen cache:as på den mobila enheten.
          Ingen information skickas från den mobila enheten eller lagras,
          analyseras eller processas någon annanstans. Inga tredjepartssystem
          har tillgång till någon del av informationen.
        </p>
        <h3>Är Öppna Skolplattformen laglig?</h3>
        <p>Ja.</p>
        <h3>Hur säker är Öppna Skolplattformen?</h3>
        <p>
          Lika säker som Skolplattformen. Vi är integritetsfanatiker. Vi redogör
          för vår syn på dataskydd i Öppna Skolplattformen i vår
          integritetspolicy: https://skolplattformen.org/integritet
        </p>
        <h3>Men ni hanterar ju personinformation?</h3>
        <p>
          Det är inte olagligt att hantera personuppgifter. Vi hjälper föräldrar
          att hantera de personuppgifter som de har rätt att ta ut från skolan.
          Varje förälder legitimerar sig med bankid.
        </p>
        <h3>
          Vilken information och funktionalitet finns idag tillgänglig i Öppna
          Skolplattformen?
        </h3>
        <p>
          Den största skillnaden är att vi har byggt den som man bygger appar i
          dag, inte som man gjorde för sju år sedan. Vi har utgått från
          användarna, det vill säga oss själva – är man förälder till flera barn
          så ska man lättare kunna få fullständig överblick. I den här första
          versionen är det lättare att läsa alla nyheter på ett ställe, att få
          en överblick över kommande händelser (som läxor, prov, matsäck och
          gympakläder) och att hitta den kontaktinformation till andra föräldrar
          i klassen som de själva lagt in i Skolplattformen.
        </p>
        <h3>
          Vilken information/funktionalitet kommer att finnas tillgänglig?
        </h3>
        <p>
          Vi vill gärna fortsätta att utveckla en automatiserad inläsning av
          veckobrev så att aktiviteter placeras ut på en kalender – dvs att en
          förälder till tre barn ska få en vy av vad som ska packas med till
          skolan under nästa vecka på en och samma plats. Frånvaroanmälan kommer
          definitivt. Vi måste bara komma på ett riktigt bra sätt att bygga det
          utan att behöva hålla på och sjukanmäla våra barn under
          utvecklingsfasen ;) Vi har massor av idéer till förbättringar som
          kommer dyka upp med tiden. Vi vill dock först få ut appen till fler
          föräldrar. Med deras hjälp kommer vi kunna prioritera de funktioner
          som faktiskt hjälper mest.
        </p>
        <h3>
          Jag är lärare eller annan typ av användare. Snälla bygg något åt mig!
        </h3>
        <p>
          Det gör vi så gärna. Problemet är bara att eftersom staden inte har
          byggt ett API som lämpar sig för tredjepartsutvecklare kan vi bara
          bygga en app åt dig genom att logga in med ditt konto och bygga
          utifrån det. Om vi loggar in med ditt konto, till och med om du sitter
          med och sköter inloggningen, lär vi se information vi inte har rätt
          att se. Därför ser vi i dagsläget ingen möjlighet att hjälpa dig :( Vi
          hoppas att Stockholms Stad kommer publicera dokumentation till sitt
          API och även tillhandahålla säkra testmiljöer så att vi och andra kan
          utveckla de stöd som fler målgrupper behöver.
        </p>
        <h3>
          Vilket råd vill ni ge de ansvariga tjänstemännen på Stockholms Stad?
        </h3>
        <p>
          {' '}
          Förutom att hjälpa oss själva slippa Skolplattformens horribla
          användarupplevelse har vi försökt illustrera en alternativ väg framåt.
          Vi byggde litet och utgick helt och hållet från användarbehov (dvs
          vårt eget). All kod är släppt som Open Source så att den kan granskas
          av andra och ett större värde kan komma världen till godo. Så borde
          den offentliga sektorn alltid arbeta. Snarare än samordna, planera och
          krava: göra, utforska och dela med sig. Snarare än få, stora, rigida
          projekt: många, små, agila. Snarare än gårdagens misslyckade
          IT-satsningar: öppna API:er, öppen källkod och öppen data.
        </p>
        <h3>Vad är er syn på den kommunala skolplattformen?</h3>
        <p>
          Den typen av mastodontprojekt har alltid och kommer alltid att
          misslyckas. Det går inte att bygga fungerande system utifrån krav och
          kostnadskontroll. Det gör att traditionella upphandlingar enligt LoU
          är dömda att slösa bort medborgarnas skattepengar eftersom deras fokus
          ligger på just krav och kostnadskontroll. Dessutom är upphandlingar i
          regel så dyra att utföra att de i sig uppmuntrar jätteprojekt.
          Skolplattformen är ett offer för detta system.
        </p>
        <h3>Vad anser ni borde göras med den nuvarande Skolplattformen?</h3>
        <p>
          Den nuvarande skolplattformen är uppbyggd i flera delar. Dels
          innehåller den bakomliggande delar som hanterar informationen som
          lagras på ett säkert sätt och dels innehåller den en webbsida och app
          som hämtar informationen och presenterar den. Vad vi förstår har mest
          energi lagts på de bakomliggande delarna. Resultatet av det är att
          användarupplevelsen för många målgrupper har blivit lidande. Vi har
          visat att det med relativt små resurser går att börja om från början
          och bygga en ny s.k. frontend – dvs app och webbsida som återanvänder
          de bakomliggande delarna (backend). Så vår rekommendation är faktiskt
          att man ska skrota den frontend som staden har byggt och börja om med
          öppen källkod på en ny frontend. Det kräver dock att staden publicerar
          dokumentation och tillsätter resurser för att möjliggöra den
          utveckling som krävs inom rimlig tid. Allt fler förtroendevalda börjar
          inse det, och vi uppmuntrar fler politiker och tjänstemän att sätta
          sig in i dessa frågor och våga pröva nya sätt att röra sig framåt.
        </p>
        <h3>
          Hur ska man se Skolplattformen i ett infrastrukturpolitiskt
          perspektiv?
        </h3>
        <p>
          {' '}
          Under den industriella eran har statens ansvar i stort handlat om
          infrastruktur. Med andra ord: den bygger vägar men inte bilar, avlopp
          men inte toaletter och sändarmaster men inte TV-apparater. Vi tror att
          i den digitala eran borde den huvudsakliga uppdelningen ske enligt
          samma mönster; det offentliga bygger API:er, inte appar.
        </p>
        <h3>
          Har ni pratat med Integritetsskyddsmyndigheten (fd Datainspektionen)
          om det ni gjort?
        </h3>
        <p>Inte än</p>
        <h3>Hur har kommunen reagerat?</h3>
        <p>
          De har inte varit i kontakt med oss. I media säger de att de ska göra
          en rigorös utredning, men vi har redan redovisat vad vi gjort och de
          har inte kontaktat oss än.
        </p>
        <h3>Varför reagerar de så, tror ni?</h3>
        <p>Det får de svara på själva.</p>
        <h3>Är ni oroliga för att bli stämda?</h3>
        <p> Nej.</p>
        <h3>Har ni rätt att använda varumärket Skolplattformen.</h3>
        <p>
          Ja. Stockholms stad äger inte varumärket, det gör ett företag som
          heter Admentum. Vi har deras tillstånd.
        </p>
        <h3>
          Hur mycket pengar tjänar ni på Öppna Skolplattformen och hur redovisas
          de?
        </h3>
        <p>
          Appen kostar 12 kronor. Intäkten registreras i handelsbolaget Not Free
          Beer som ägs av oss tre och går till att täcka kostnader för inköp.
          Med en låg engångskostnad ökar vi chansen att vi orkar syssla med
          underhåll och uppdateringar. Vi vill ju ha en stabil lösning som
          håller. Just nu jobbar vi på egen fritid med något som förbättrar det
          kommunen lagt en miljard av allmänna medel på.
        </p>
        <h3>
          Är det moraliskt att tjäna pengar på något som kommunen borde erbjuda
          gratis?
        </h3>
        <p>
          Det är bra att föräldrar har en helt frivillig möjlighet att snabbare
          och lättare få ut viktig information om sina barns skolgång. Det är
          moraliskt tveksamt att den gemensamt finansierade Skolplattformen
          fungerar så dåligt, både för oss föräldrar och för alla de lärare som
          är helt utlämnade åt den.
        </p>
        <h3>Hur gick ni tillväga?</h3>
        <p>
          Allt bygger på reverse engineering. Vi öppnade DevTools i Chrome och
          loggade in. Sen antecknade vi alla url:er och payloads. Först använde
          vi det till att bygga ett proxy-API som vår app gick mot. Men ganska
          snart insåg vi att det var känsligt eftersom vi då skulle ha teknisk
          möjlighet att spara ner personlig data som vi inte har rätt till eller
          vill ta del av. Ungefär samtidigt blockade staden vår IP-adress. Så vi
          tog koden för att anropa API:et och byggde ett npm-paket av den så att
          appen kunde köra proxyn in process på telefonen.
        </p>
        <h3>Vilka tekniska utmaningar har ni överkommit och hur?</h3>
        <p>
          Det API som Skolplattformen exponerar är extremt omodernt i sin
          utformning. Det är designat helt inifrån och ut så datastrukturerna
          måste byggas om rejält innan de är lätta att konsumera i gränssnittet.
          All access hanteras via sessions-cookies istället för tokens. Dessutom
          är systemet rejält långsamt. En stor del av tiden har därför gått åt
          till att bygga cachning (i klienten) och se till att samma url inte
          anropas mer än en gång. Men framför allt: vi är alla inblandade
          heltidsarbetande människor som gör det här på fritiden. All planering
          och samordning har fått ske via Discord och koden skrivas på kvällar
          och helger.
        </p>
        <h3>
          Den kommunala Skolplattformen har vid upprepade tillfällen kritiserats
          för att hantera t ex personinformation på ett osäkert sätt. Är detta
          något ni sett exempel på när ni gjort er utveckling? Några andra
          brister i den kommunala Skolplattformen ni upptäckt?
        </h3>
        <p>
          I fall då vi, i arbetet med att bygga denna app, har upptäckt
          potentiella svagheter i Skolplattformen har vi vidtagit steg för att
          rapportera detta på ett ansvarsfullt sätt. Detta kommer vi göra även
          fortsättningsvis.
        </p>
        <h3>Varför döpte ni företaget till Not free beer?</h3>
        <p>
          Det är en anspelning på hur GNU Project beskriver Free software såhär:
          To understand the concept, you should think of “free” as in “free
          speech,” not as in “free beer”. Då vi har valt att tillgängliggöra all
          kod som Open Source (Apache 2.0) men ändå ta betalt för appen, tyckte
          vi att namnet var passande.
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

export default QA
