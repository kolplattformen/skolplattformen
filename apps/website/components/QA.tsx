import Link from './Link'

import { price } from './Pricing'

const QA = () => {
  return (
    <div className="header">
      <div className="max-w-6xl px-5 mx-auto my-5 md:my-24 md:px-0 prose dark:prose-dark relative z-10">
        <h1>Frågor och svar om Öppna skolplattformen</h1>

        <h2>
          Om Utbildningsförvaltningens juridiska utredning och polisanmälan
        </h2>
        <p>
          Den 15 april släppte Utbildningsförvaltningen sin juridiska utredning
          av Öppna skolplattformen och den 16 april ska de ha polisanmält oss.
          Vi är förvånade över att utbildningsdirektör Lena Holmdahl agerar så,
          men tycker samtidigt att det ska bli skönt att någon annan än
          Utbildningsförvaltningen granskar ärendet. Därmed kanske vi kan få
          stopp på några av de missförstånd som nu sprids av förvaltningen, som
          att vi skulle ha bett om tillgång till Skolplattformens API (vi bad om{' '}
          <u>dokumentation</u> av API:et, vilket är en helt annan sak. Det vill
          de inte lämna ut och det beslutet har vi överklagat till
          kammarrätten). Nedan kommenterar vi delar av Utbildningsförvaltningens
          eget fråga-svar-dokument.
        </p>
        <h3>Vad handlar Stockholms stads utredning om?</h3>
        <h4>Utbildningsförvaltningens svar</h4>
        <p>
          Stockholms stad har gjort en utredning av juridiken kring “Öppna
          skolplattformens” betal-app, som utan stadens medgivande behandlar
          information från Stockholms stads skolplattform.
        </p>
        <h4>Vår kommentar</h4>
        <p>
          Detta är ett felaktigt påstående. Vår app Öppna skolplattformen
          använder ett av Stockholms stads tillgängliggjorda API:er. Appen
          kommer åt den information som antingen är allmänt tillgänglig eller
          som användaren efter stark autentisering (i detta fall BankID) själv
          begär från Stockholms stads skolplattform. Detta konstaterades redan i
          februari av de externa it-experter som Utbildningsförvaltningen själva
          anlitat för att inspektera vår (öppet tillgängliga) källkod.
        </p>
        <h2>Om appen Öppna skolplattformen</h2>
        <h3>Vad är Öppna skolplattformen?</h3>
        <p>
          En app som ger föräldrar snabbare och lättare tillgång till sin egen
          information på Stockholms stads skolplattform. Appen är som ett lager
          ovanpå den befintliga plattformen som gör att vi kan visa samma
          information, men snabbare och med mindre krångel. Vi har byggt den för
          föräldrar. Vi har inte byggt något som kan användas av lärare eller
          elever, helt enkelt för att vi har utgått från den information vi
          själva har tillgång till som föräldrar, och de behov vi har.
        </p>
        <h3>Vem ligger bakom Öppna skolplattformen?</h3>
        <p>
          Ett flertal frustrerade föräldrar, men framför allt Erik Hellman,
          Christian Landgren och Johan Öbrink. Vi är utvecklare och föräldrar
          till barn i grundskolan, och helt hänvisade till Skolplattformen i sin
          nuvarande form. Vi har tillsammans mer än 75 års erfarenhet som
          konsulter av att hantera personuppgifter (det gör vi dock inte i Öppna
          skolplattformen! Vi ser aldrig er information, bara våra egna barns)
          och är alla tre flera år i rad utnämnda till Sveriges bästa utvecklare
          av IDG.
        </p>
        <h3>Varför har ni skapat Öppna skolplattformen?</h3>
        <p>
          Två huvudsakliga skäl: Vi är föräldrar. Vi behöver viktig
          informationen som finns i Skolplattformen men den är fruktansvärt
          otillgänglig. Fråga vilken förälder eller lärare som helst. Vi är
          utvecklare. Tekniken och kunskapen för att bygga ett bra verktyg
          finns. Till slut gick det inte att tyst betrakta hur kommunen bränner
          sådana oerhörda pengar på en så undermålig produkt, på grund av
          undermålig upphandling och okunnig kravställning.
        </p>
        <h3>Vilken data har Öppna skolplattformen tillgång till?</h3>
        <p>
          Du som använder vår app har, när du identifierat dig gentemot
          Stockholms stad, tillgång till samma data som genom kommunens app
          eller webbsida. Vi bakom Öppna skolplattformen kan inte se någon annan
          information än våra egna barns. Den information du hämtar visas bara
          för dig och hanteras bara på din mobil eller surfplatta. Ingen
          information skickas från den mobila enheten eller lagras, analyseras
          eller processas någon annanstans. Inga tredjepartssystem har tillgång
          till någon del av informationen.
        </p>
        <h3>Är Öppna skolplattformen laglig?</h3>
        <p>Ja.</p>
        <h3>Hur säker är Öppna skolplattformen?</h3>
        <p>
          Din information är lika säker som i Skolplattformen. Vi är
          integritetsfanatiker och redogör för vår syn på dataskydd i Öppna
          skolplattformen i{' '}
          <Link.Internal href="https://skolplattformen.org/integritet">
            vår integritetspolicy
          </Link.Internal>
          .
        </p>
        <h3>Men ni hanterar ju personinformation?</h3>
        <p>
          Det är inte olagligt att hantera personuppgifter. Vi hjälper föräldrar
          att hantera de personuppgifter som de har rätt att ta ut från skolan.
          Varje förälder legitimerar sig med BankID.
        </p>
        <h3>
          Den kommunala Skolplattformen har kritiserats för att hantera t ex
          personinformation på ett osäkert sätt. Är detta något ni sett exempel
          på när ni gjort er utveckling? Några andra brister i den kommunala
          Skolplattformen ni upptäckt?
        </h3>
        <p>
          Ja, vi har upptäckt sårbarheter som inte borde finnas i ett sådant här
          system. De har vi rapporterat på ett ansvarsfullt sätt. Två fall har
          uppmärksammats i media. I ett av fallen har kommunen täppt till
          luckan. Vi kommer att fortsätta att rapportera eventuella sårbarheter
          vi upptäcker i vårt utvecklingsarbete.
        </p>
        <h3>
          Vilken information och funktionalitet finns idag tillgänglig i Öppna
          skolplattformen?
        </h3>
        <p>
          Vi har gjort det lättare att läsa veckobrev och matsedel, hitta
          notifieringar och frånvaroanmäla. Vi gör nya releaser hela tiden och
          har byggt appen som man bygger appar i dag, inte som man gjorde för
          sju år sedan. Vi har utgått från föräldrars önskemål – inte minst så
          att de som är förälder till flera barn lättare ska kunna få
          fullständig överblick av kommande prov, läxor och idrottsdagar.
        </p>
        <h3>
          Vilken information/funktionalitet kommer att finnas tillgänglig?
        </h3>
        <p>
          Vi vill gärna fortsätta att utveckla en automatiserad inläsning av
          veckobrev så att aktiviteter placeras ut på en kalender – dvs att en
          förälder till tre barn ska få en vy av vad som ska packas med till
          skolan under nästa vecka på en och samma plats. Vi vill få in flera
          språkalternativ för att öka tillgängligheten. Vi har massor av idéer
          till förbättringar som kommer dyka upp med tiden och vi jobbar med
          löpande releaser snarare än att vänta på att allt är klart. Med er
          hjälp kommer vi kunna prioritera de funktioner som hjälper mest.
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
          hoppas att Stockholms stad kommer publicera dokumentation till sitt
          API och även tillhandahålla säkra testmiljöer så att vi och andra kan
          utveckla de stöd som fler målgrupper behöver.
        </p>
        <h3>
          Vilket råd vill ni ge de ansvariga tjänstemännen på Stockholms stad?
        </h3>
        <p>
          Förutom att hjälpa oss själva slippa Skolplattformens horribla
          användarupplevelse har vi försökt illustrera en alternativ väg framåt.
          Vi byggde litet och utgick helt och hållet från användarbehov (dvs
          vårt eget). All kod är släppt som öppen källkod så att den kan
          granskas av andra och ett större värde kan komma världen till godo. Så
          borde den offentliga sektorn alltid arbeta. Snarare än samordna,
          planera och krava: göra, utforska och dela med sig. Snarare än få,
          stora, rigida projekt: många, små, agila. Snarare än gårdagens
          misslyckade IT-satsningar: öppna API:er, öppen källkod och öppen data.
        </p>
        <h3>Vad är er syn på den kommunala Skolplattformen?</h3>
        <p>
          Den typen av mastodontprojekt har alltid och kommer alltid att
          misslyckas. Det går inte att bygga fungerande system utifrån krav och
          kostnadskontroll. Det gör att traditionella upphandlingar enligt LoU
          är dömda att slösa bort medborgarnas skattepengar eftersom deras fokus
          ligger på just krav och kostnadskontroll. Dessutom är upphandlingar i
          regel så dyra att utföra att de i sig uppmuntrar jätteprojekt.
          Skolplattformen är ett offer för detta system.
        </p>
        <h3>Vad anser ni borde göras med Skolplattformen?</h3>
        <p>
          Skolplattformen är uppbyggd i flera delar. Dels innehåller den
          bakomliggande delar som hanterar informationen som lagras på ett
          säkert sätt och dels innehåller den en webbsida och app som hämtar
          informationen och presenterar den. Vad vi förstår har mest energi
          lagts på de bakomliggande delarna. Resultatet av det är att
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
        <p>
          Framför allt har vi anmält ett antal säkerhetsluckor i Stockholms
          stads it-system. En av dem har anmälts till IMY, den andra ännu inte.
          Eftersom den är allvarlig och vi inte är trygga med att
          Utbildningsförvaltningen utrett om information läckt på ett bra sätt
          kommer vi att insistera på att den anmäls. Utbildningsförvaltningen
          har också anmält vår app. Självklart kommer vi att redovisa IMY:s
          ställningstagande när det kommer.
        </p>
        <h3>Hur har kommunen reagerat?</h3>
        <p>
          Inte som vi hade hoppats, trots flera möten där vi förklarat exakt vad
          appen gör rent tekniskt. Sammanfattningsvis kan man säga att de lagt
          mer energi på att misstänkliggöra oss än att täppa igen de stora
          säkerhetsluckor vi hittat i deras system. Det är minst sagt olyckligt.
          Du hittar alla våra svar på deras utredning i ett separat QA-segment
          ovan.
        </p>
        <h3>Varför reagerar de så, tror ni?</h3>
        <p>
          Det är svårt att spekulera i. Men deras tekniska förståelse är
          förbluffande låg.
        </p>
        <h3>Är ni oroliga för att bli stämda?</h3>
        <p>
          Utbildningsdirektör Lena Holmdahl har polisanmält oss. Det är förstås
          obehagligt och vi välkomnar inte slöseri med polisens
          utredningsresurser. Men samtidigt är det skönt att ärendet granskas av
          någon annan än Utbildningsförvaltningen.
        </p>
        <h3>Har ni rätt att använda varumärket Skolplattformen.</h3>
        <p>
          Ja. Stockholms stad äger inte varumärket, det gör ett företag som
          heter Admentum. Vi har deras tillstånd och deras stöd.
        </p>
        <h3>
          Hur mycket pengar tjänar ni på Öppna skolplattformen och hur redovisas
          de?
        </h3>
        <p>
          Vi har en Patreon där summan är synlig. Intäkten registreras i
          aktiebolaget Not Free Beer som ägs av tre av utvecklarna och går till
          att täcka kostnader för inköp. Det täcker inte på långa vägar den tid
          vi lagt ner. Just nu jobbar vi på egen fritid med något som förbättrar
          det kommunen lagt en miljard av allmänna medel på.
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
        <h2>
          Om hur appen Öppna skolplattformen utvecklats och hur du kan bidra
          till utvecklingen
        </h2>
        <h3>Hur rapporterar man buggar och önskemål?</h3>
        <p>
          Vi är enormt tacksamma för alla buggrapporter och förslag vi får och
          satsar mycket på att så snabbt som möjligt fixa de saker som dyker
          upp. För att få lite ordning så försöker vi samla alla buggar och
          önskemål på samma ställe, Github.{' '}
          <Link.External href="https://github.com/kolplattformen/skolplattformen/issues">
            Klicka här
          </Link.External>{' '}
          för att se vilka funktioner och buggar vi redan har tagit emot och
          jobbar på.
        </p>
        <h3>Hur gick ni tillväga?</h3>
        <p>
          Allt bygger på reverse engineering. Vi öppnade DevTools i Chrome och
          loggade in. Sen antecknade vi alla url:er och payloads. Vi tog koden
          för att anropa API:et och byggde ett npm-paket av den så att appen
          kunde köra proxyn i en process på telefonen.
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
        <h3>Varför döpte ni företaget till Not free beer?</h3>
        <p>
          Det är en anspelning på hur GNU-projektet beskriver fri programvara:
          To understand the concept, you should think of “free” as in “free
          speech,” not as in “free beer”. Då vi har valt att tillgängliggöra all
          kod som öppen källkod (Apache 2.0), tyckte vi att namnet var passande.
        </p>
        <h3>Kontakta oss</h3>
        <p>
          Tveka inte att kontakta oss. Skicka ett mail till{' '}
          <a href="mailto:info@skolplattformen.org">info@skolplattformen.org</a>
          .
        </p>
      </div>
    </div>
  )
}

export default QA
