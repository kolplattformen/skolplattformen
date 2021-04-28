import { ReactNode } from 'react'
import Link from '../components/Link'

const fixEvent = (date: string) => ({
  date,
  description: 'Öppna skolplattformen släpper ny fix',
})

const sabotageEvent = (date: string) => ({
  date,
  description: 'Kommun saboterar Öppna Skolplattformen',
})

interface Event {
  date: string
  description: string
  link?: string
}

export interface TimelineEvent {
  overview: ReactNode
  date: string
  importantDates: Event[]
  media: Event[]
}

export const events: TimelineEvent[] = [
  {
    overview: (
      <p>
        Svenska medier rapporterar vidare om de säkerhetsluckor vi hittat och
        rapporterat i Stockholms stads it-system. Vi fokuserar på att utveckla
        ny funktionalitet – som flera språkval och överskådligt schema – för att
        öka tillgängligheten så att fler föräldrar lättare kan hitta information
        om deras egna barns skolgång. Utbildningsdirektör Lena Holmdahl ber oss
        avpublicera vår egen kod, släpper förvaltningens juridiska utredning och
        gör en polisanmälan (mer om detta nedan och i vår{' '}
        <Link.Internal href="/qa">QA</Link.Internal>).
      </p>
    ),
    date: '2021-04-01',
    importantDates: [
      {
        date: '2021-04-16',
        description:
          'Utbildningsdirektör Lena Holmdahl polisanmäler appen och privatpersonerna bakom Öppna Skolplattformen',
      },
      {
        date: '2021-04-15',
        description:
          'Utbildningsförvaltningen publicerar sin juridiska utredning',
        link:
          'https://start.stockholm/aktuellt/nyheter/2021/04/juridisk-utredning-om-betalapp-sakerhet-gar-fore-it-utveckling/',
      },
      {
        date: '2021-04-15',
        description:
          'Per Axbom publicerar texten Öppna Skolplattformen synliggör Stockholms stads upprepade blunder',
        link: 'https://axbom.se/oppna-skolplattformen-stockholm/',
      },
      {
        date: '2021-04-06',
        description:
          'Lena Holmdahl skriver i ett mail "Jag vill också att ni slutar delar med er av den kod som härrör till staden API:er och tar bort den från de plattformar (ex. Github) där ni har publicerat den.',
      },
      {
        date: '2021-04-01',
        description:
          'Vi besöker Utbildningsförvaltningen och blir, trots tryckfrihetsförordningens omedelbarhetskrav, nekade att få se offentliga handlingar.',
      },
    ],
    media: [
      {
        date: '2021-04-16',
        description:
          'Öppna Skolplattformen polisanmäls av Stockholms stad (Sweclockers)',
        link:
          'https://www.sweclockers.com/nyhet/31775-oppna-skolplattformen-polisanmals-av-stockholms-stad',
      },
      {
        date: '2021-04-16',
        description:
          'Föräldrarnas skolplattform polisanmäls av Stockholms stad: ”Misstänkt dataintrång” (DN)',
        link:
          'https://digital.di.se/artikel/foraldrarnas-skolplattform-polisanmals-av-stockholms-stad-misstankt-dataintrang',
      },
      {
        date: '2021-04-15',
        description:
          '#49 - Utvecklaren och pappan Christian Landgren om frustrationen som ledde till bygget av en egen skolplattform. (podd, Allt du behöver veta om ny teknik)',
        link:
          'https://podcasts.nu/avsnitt/allt-du-behover-veta-om-ny-teknik/49-utvecklaren-och-pappan-christian-landgren-om-frustrationen-som-ledde-till-bygget-av-en-egen-skolplattform-o2z9E646y',
      },
      {
        date: '2021-04-15',
        description:
          'Stockholms stad polisanmäler appen Öppna skolplattformen (DN)',
        link:
          'https://www.dn.se/sthlm/stockholms-stad-polisanmaler-appen-oppna-skolplattformen/',
      },
      {
        date: '2021-04-15',
        description:
          'Stockholms stad polisanmäler Öppna skolplattformen (Ny Teknik)',
        link:
          'https://www.nyteknik.se/digitalisering/stockholms-stad-polisanmaler-oppna-skolplattformen-7013108',
      },
      {
        date: '2021-04-10',
        description:
          'Stockholms stad begär att Öppna Skolplattformen ska radera all källkod (Sweclockers)',
        link:
          'https://www.sweclockers.com/nyhet/31727-stockholms-stad-begar-att-oppna-skolplattformen-ska-radera-all-kallkod',
      },
      {
        date: '2021-04-01',
        description:
          'Därför åkte vi vilse på resan mot digitalisering (SvD Ledare)',
        link: 'https://www.svd.se/darfor-akte-vi-vilse-pa-digitaliseringsresan',
      },
      {
        date: '2021-04-01',
        description:
          'Ny säkerhetslucka i Stockholms stad - utbildningsminister kallas till utskott (Ny Teknik)',
        link:
          'https://www.nyteknik.se/sakerhet/ny-sakerhetslucka-i-stockholms-stad-utbildningsminister-kallas-till-utskott-7012459',
      },
    ],
  },
  {
    overview: (
      <p>
        IT-direktören meddelar att utstörningsåtgärderna nu ska upphöra. Det gör
        de inte. Mars är månaden då vi släpper sju releaser som svar på stadens
        sju sabotage av appen. Samtidigt hittar våra kodare ytterligare
        allvarliga säkerhetsproblem i stadens it-system och rapporterar dessa
        till kommunen.
      </p>
    ),
    date: '2021-03-01',
    importantDates: [
      fixEvent('2021-03-29'),
      {
        date: '2021-03-29',
        description:
          'Öppna skolplattformen anmäler ytterligare ett säkerhetsproblem i stadens IT-system',
      },
      {
        date: '2021-03-27',
        description:
          'Öppna Skolplattformen tar sig till globala Hacker News förstasida',
        link: 'https://news.ycombinator.com/item?id=26597293',
      },
      {
        date: '2021-03-26',
        description:
          'Utbildningsdirektör Lena Holmdahl skickar mail med följande formulering: “Så länge vi väntar på både kammarrättens ställningstagande och IMY:s svar så skulle jag be dig å Stockholms utbildningsförvaltnings vägnar att inte publicera din app öppna skolplattformen.” Vi ber återigen om ett klargörande om vilken lag de anser att vi bryter mot',
      },
      sabotageEvent('2021-03-26'),
      fixEvent('2021-03-26'),
      sabotageEvent('2021-03-25'),
      fixEvent('2021-03-25'),
      sabotageEvent('2021-03-24'),
      fixEvent('2021-03-24'),
      {
        date: '2021-03-23',
        description:
          'Öppna Skolplattformen överklagar avslag av begäran av API-dokumentation till Kammarrätten ',
      },
      sabotageEvent('2021-03-22'),
      fixEvent('2021-03-19'),
      sabotageEvent('2021-03-19'),
      fixEvent('2021-03-18'),
      sabotageEvent('2021-03-18'),
      fixEvent('2021-03-17'),
      {
        date: '2021-03-11',
        description: 'Möte nr 2 med kommunen',
      },
      {
        date: '2021-03-06',
        description:
          'Kommunen skickar mail med följande formulering: “Jag vill berätta för dig att idag kommer vårt arbete som haft negativ påverkan på er app att upphöra.”',
      },
      {
        date: '2021-03-04',
        description:
          'Kommunen fattar beslut om att avslå begäran om dokumentation av API',
      },
      {
        date: '2021-03-01',
        description:
          'Tjänstedesignern Sigrun Tallungs skriver en sammanfattning på LinkedIn: Men hur gick det ens till?',
        link:
          'https://www.linkedin.com/pulse/men-hur-gick-det-ens-till-rapport-fr%25C3%25A5n-insidan-sigrun-tallungs/?trackingId=uF%2FBCFt5QMeshcx7oWOypA%3D%3D',
      },
    ],
    media: [
      {
        date: '2021-03-31',
        description:
          'Maktkampen om Skolplattformen fortsätter: ”Välriktat sabotage” (Ny Teknik)',
        link:
          'https://www.nyteknik.se/digitalisering/maktkampen-om-skolplattformen-fortsatter-valriktat-sabotage-7012339',
      },
      {
        date: '2021-03-30',
        description:
          'Säkerhetsbrister upptäckta i Stockholm stads IT-system (SVT Nyheter Sthlm)',
        link:
          'https://www.svt.se/nyheter/lokalt/stockholm/sakerhetsbrister-upptackta-i-stockholms-stads-it-system',
      },
      {
        date: '2021-03-30',
        description:
          'Stor säkerhetslucka i Stockholms stads it-system – sårbart för attacker (NyTeknik)',
        link:
          'https://www.nyteknik.se/digitalisering/stor-sakerhetslucka-i-stockholms-stads-it-system-sarbart-for-attacker-7012123',
      },
      {
        date: '2021-03-29',
        description:
          'De utmanar Stockholms stads kritiserade Skolplattformen: ”Stockholm stad stökar bara till” (Expressen/DI TV)',
        link:
          'https://www.expressen.se/tv/ditv/ekonomistudion/de-utmanar-skolplattformen/',
      },
      {
        date: '2021-03-29',
        description:
          'Stockholms stad sätter krokben för föräldrarnas skolplattform (DI Digital)',
        link:
          'https://digital.di.se/artikel/stockholms-stad-satter-krokben-for-foraldrarnas-skolplattform',
      },
      {
        date: '2021-03-29',
        description:
          'Strid mellan föräldrar och staden om skolplattforms-app (Mitti)',
        link:
          'https://www.mitti.se/nyheter/strid-mellan-foraldrar-och-staden-om-skolplattforms-app/repucx!1Pdq1EzU1bVp5ns0Fuykjg/',
      },
      {
        date: '2021-03-24',
        description:
          'Dåliga it-lösningar får värre konsekvenser än bara missnöjda användare (Bohusläningen)',
        link:
          'https://www.bohuslaningen.se/%C3%A5sikt/ledare/d%C3%A5liga-it-l%C3%B6sningar-f%C3%A5r-v%C3%A4rre-konsekvenser-%C3%A4n-bara-missn%C3%B6jda-anv%C3%A4ndare-1.43510223',
      },
      {
        date: '2021-03-23',
        description:
          'Kodsnack 410 – Öppna skolplattformen, med Johan Öbrink (podd, Kodsnack)',
        link:
          'https://techworld.idg.se/2.2524/1.748569/kodsnack-410--oppna-skolplattformen-med-johan-obrink',
      },
      {
        date: '2021-03-05',
        description:
          'Öppna skolplattformen med Johan Öbrink och Erik Hellman (podd, Kompilator)',
        link: 'https://kompilator.se/041/',
      },
      {
        date: '2021-03-04',
        description:
          '”Öppna skolplattformen är medborgaraktivism för bättre offentlig digitalisering” (debattartikel, NyTeknik)',
        link:
          'https://www.nyteknik.se/opinion/oppna-skolplattformen-ar-medborgaraktivism-for-battre-offentlig-digitalisering-7010976',
      },
      {
        date: '2021-03-01',
        description: 'Stockholms stad stoppar Öppna Skolplattformen (Feber.se)',
        link:
          'https://feber.se/samhalle/stockholms-stad-stoppar-oppna-skolplattformen/421986/',
      },
    ],
  },
  {
    overview: (
      <div className="space-y-4">
        <p>
          Månaden då appen lanseras, Öppna Skolplattformens skapare äntligen får
          prata med Utbildningsförvaltningen i ett möte om ömsesidig
          samarbetsvilja, för att samma eftermiddag utmålas som en allvarlig
          säkerhetsrisk i riksmedia (utan hänvisning till relevant lagrum eller
          ens konkretisering av risk). Utbildningsförvaltningen saboterar under
          februari månad appen för första gången (av många).
        </p>
        <p>
          Samtidigt informeras kommunen återigen om säkerhetsbristerna i dess
          eget system, denna gång i form av en skriftlig rapport med utlåtande
          av en oberoende säkerhetsexpert.
        </p>
      </div>
    ),
    date: '2021-02-01',
    importantDates: [
      {
        date: '2021-03-11',
        description: 'Öppna skolplattformen släpper ny fix (efter sportlov)',
      },
      sabotageEvent('2021-02-26'),
      {
        date: '2021-02-25',
        description:
          'Möte med Utbildningsförvaltningen - samarbete och god ton',
      },
      {
        date: '2021-02-23',
        description: 'Rapport med säkerhetsbrister överlämnas till kommunen',
      },
      {
        date: '2021-02-21',
        description:
          'Stockholm stad tar bort kontaktuppgifter till andra föräldrar',
      },
      {
        date: '2021-02-12',
        description: 'Appen lanseras - hamnar 1:a på topplistan på App Store',
      },
      {
        date: '2021-02-16',
        description:
          'Utbildningsförvaltningen får svaret på den granskning av Öppna skolplattformen de beställt av ett oberoende IT-säkerhetsföretag. Denna konstaterar att Öppna skolplattformen varken lagrar eller skickar vidare någon information.',
      },
      {
        date: '2021-02-12',
        description: 'Stockholms stad varnar för appen',
      },
    ],
    media: [
      {
        date: '2021-02-28',
        description: 'Ny skol-app stoppas (Security User)',
        link:
          'https://www.securityuser.com/se/Nyheter/Samhalle/ny-skol-app-stoppas1',
      },
      {
        date: '2021-02-26',
        description:
          'Stockholms stad stänger av föräldrarnas alternativa app för Skolplattformen (NyTeknik)',
        link:
          'https://www.nyteknik.se/digitalisering/stockholms-stad-stanger-av-foraldrarnas-alternativa-app-for-skolplattformen-7010524',
      },
      {
        date: '2021-02-26',
        description:
          'Ökad säkerhet för personuppgifter i Skolplattformen (IT-pedagogen)',
        link: 'https://it-pedagogen.se/okad-sakerhet-for-personup/',
      },
      {
        date: '2021-02-26',
        description:
          'Stockholm stoppar alternativa appen för Skolplattformen (DN)',
        link:
          'https://www.dn.se/sthlm/stockholm-stoppar-alternativa-appen-for-skolplattformen/',
      },
      {
        date: '2021-02-25',
        description: '93. Agil Skolplattformen (podd, Agilpodden)',
        link: 'https://agilpodden.podbean.com/e/93-agil-skolplattformen/',
      },
      {
        date: '2021-02-24',
        description:
          'Lisa Magnusson: Landet över sitter folk och svär över dysfunktionella digitala ”lösningar” (Ledare, DN)',
        link:
          'https://www.dn.se/ledare/lisa-magnusson-landet-over-sitter-folk-och-svar-over-dysfunktionella-digitala-losningar/',
      },
      {
        date: '2021-02-24',
        description:
          "”Open sourcing your code isn't sharing your profits, it's sharing your risks” (podd, Known Unknowns)",
        link:
          'https://open.spotify.com/episode/6kJbzBCsFOtAtSPzWzburJ?si=Vnu4EJMMSXCJ-8-DQmUwaw&nd=1',
      },
      {
        date: '2021-02-18',
        description:
          'Skolplattformens felmeddelande: En intervju med folket bakom räddningen (podd, Teknikveckan)',
        link:
          'https://open.spotify.com/episode/7b0L90dNCbpIx0q3yi51lr?si=6X5acCQtTEWrzFaHovB3Zg&nd=1',
      },
      {
        date: '2021-02-18',
        description:
          'Miljonsmäll för Stockholmsskolor efter försenade it-tjänster (DN)',
        link:
          'https://www.dn.se/sthlm/miljonsmall-for-stockholmsskolor-efter-forsenade-it-tjanster/',
      },
      {
        date: '2021-02-08',
        description: 'Förälder gör egen skolplattform (Voister)',
        link:
          'https://www.voister.se/artikel/2021/02/foralder-gor-skolplattform/',
      },
      {
        date: '2021-02-05',
        description:
          'Han utmanar Skolplattformen med egen app: ”Något behövde göras” (SVT Nyheter)',
        link:
          'https://www.svt.se/nyheter/lokalt/stockholm/han-trottnade-pa-skolplattformen-byggde-en-egen-app',
      },
      {
        date: '2021-02-05',
        description:
          'Ledare: Haveriet med Skolplattformen måste få konsekvenser (Ledare, DN)',
        link:
          'https://www.dn.se/ledare/haveriet-med-skolplattformen-maste-fa-konsekvenser/',
      },
      {
        date: '2021-02-05',
        description:
          'Efter skandalerna – kodande föräldrar släpper egen skolapp (NyTeknik)',
        link:
          'https://www.nyteknik.se/premium/efter-skandalerna-kodande-foraldrar-slapper-egen-skolapp-7009234',
      },
      {
        date: '2021-02-05',
        description:
          'Stockholms stad utreder föräldrarnas app: ”Kan vara olaglig” (NyTeknik)',
        link:
          'https://www.nyteknik.se/digitalisering/stockholms-stad-utreder-foraldrarnas-app-kan-vara-olaglig-7009287',
      },
      {
        date: '2021-02-05',
        description: 'Lärare dömer ut Skolplattformen (DN)',
        link: 'https://www.dn.se/sthlm/larare-domer-ut-skolplattformen/',
      },
      {
        date: '2021-02-04',
        description:
          'Han hatar Skolplattformen – gör ett helt eget system (P4 Sthlm)',
        link:
          'https://sverigesradio.se/artikel/han-hatar-skolplattformen-gor-ett-helt-eget-system',
      },
      {
        date: '2021-02-04',
        description: 'Så blev Skolplattformen en it-katastrof (DN)',
        link:
          'https://www.dn.se/sthlm/sa-blev-skolplattformen-en-it-katastrof/',
      },
    ],
  },
  {
    overview: (
      <p>
        Månaden då appen utvecklas. Utan dokumenterat API får utvecklarna nöja
        sig med att reverse engineera baserat på sin egen upplevelse och sin
        egen data, och förbättringar baseras på hur andra föräldrar använder
        skolplattformen. Källkoden publiceras på{' '}
        <Link.External href="https://github.com/kolplattformen">
          GitHub
        </Link.External>{' '}
        för full transparens och för att bjuda in till samarbete.
      </p>
    ),
    date: '2021-01-01',
    importantDates: [],
    media: [
      {
        date: '2021-01-18',
        description:
          'Forskaren: Så skulle det bästa IT-systemet för skolan se ut (Skolvärlden)',
        link:
          'https://www.skolvarlden.se/artiklar/forskaren-sa-skulle-det-basta-it-systemet-skolan-se-ut',
      },
    ],
  },
  {
    overview: (
      <p>
        Christian Landgren får nog av att vänta på API-dokumentationen från
        kommunen och börjar programmera. Han får snart sällskap av några av
        Sveriges topprankade kodare (också föräldrar. Utvecklare är nämligen det
        vanligaste jobbet bland män i Stockholm. Brist på kompetens föreligger
        inte).
      </p>
    ),
    date: '2020-12-01',
    importantDates: [
      {
        date: '2020-12-06',
        description:
          'Den första sårbarheten i kommunens system hittas och rapporteras till staden via ombud',
      },
      {
        date: '2020-12-03',
        description:
          'Avslag på begäran om dokumentation med hänvisning till sekretess men utan lagrum',
      },
    ],
    media: [],
  },
  {
    overview: (
      <p>
        Månaden då Christian Landgren får nog av att försöka sammanställa
        informationen för sina tre barn på ett översiktligt sätt och begär ut
        API-dokumentationen från kommunen
      </p>
    ),
    date: '2020-11-01',
    importantDates: [
      {
        date: '2020-11-27',
        description:
          'Begäran om dokumentation av API (skickat till Kontaktcenter Stockholm)',
      },
    ],
    media: [],
  },
]
