import { events } from '../data/timelineEvents'
import { ButtonLinkInternal } from './ButtonLink'
import Timeline from './Timeline'

const TimelineLatest = () => {
  const latestMonthsEvents = events.slice(0, 1)

  return (
    <section className="max-w-6xl px-5 py-8 mx-auto lg:px-0 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-bold leading-tight text-gray-800">
          Om Öppna Skolplattformen
        </h2>
        <p>
          Det talas numera mycket om värdet av digitalisering, innovation och
          medskapande, om nytta för skattepengarna och medborgarinflytande.
          Öppna skolplattformen är ett exempel på allt detta, på hur medborgare
          – i detta fall i form av en grupp frustrerade programmerande föräldrar
          med expertis inom informationssäkerhet – med egen kraft löst ett
          gemensamt problem till nytta för alla. Det har föranlett såväl
          uppmuntrande tillrop från vårdnadshavare som en del medial
          uppmärksamhet.
        </p>
        <p>
          Vi förväntade oss även att vårt initiativ skulle välkomnas av
          Stockholms stad, vars skolplattform ju fått omfattande kritik för att
          den kostat enorma pengar, inte är användarvänlig och har stora
          säkerhetsbrister. Förhoppningen var även att vi skulle kunna samarbeta
          med staden för att skapa ännu bättre lösningar, men istället
          attackeras nu appen från stadens sida. Här är vårt försök till att
          skapa transparens.
        </p>
        <ButtonLinkInternal href="/aktuellt">
          Läs hela historien
        </ButtonLinkInternal>
      </div>
      <Timeline events={latestMonthsEvents} />
    </section>
  )
}

export default TimelineLatest
