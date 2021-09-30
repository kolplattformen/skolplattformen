import ButtonLink from './ButtonLink'
import Timeline from './Timeline'

const TimelineLatest = () => {
  return (
    <section className="max-w-6xl px-5 py-8 mx-auto lg:px-0 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-bold leading-tight text-gray-800 dark:text-white">
          Om Öppna Skolplattformen
        </h2>
        <p>
          Det talas mycket om värdet av digitalisering, innovation och
          medskapande, om nytta för skattepengarna och medborgarinflytande.
          Öppna skolplattformen är ett konkret exempel på detta: hur medborgare
          – i detta fall i form av en grupp frustrerade programmerande föräldrar
          med expertis inom informationssäkerhet – med egen kraft kan lösa ett
          gemensamt problem till nytta för alla. För det har vi fått både
          uppmuntrande tillrop från vårdnadshavare och lärare och medial
          uppmärksamhet.
        </p>
        <p>
          Stockholms stads skolplattform har fått omfattande kritik för att den
          kostat enorma pengar, inte är användarvänlig och har stora
          säkerhetsbrister. Vår förväntan var att vårt initiativ skulle
          välkomnas och att vi skulle kunna samarbeta med staden för att skapa
          ännu bättre lösningar. Istället attackerar staden genom
          Utbildningsdirektör Lena Holmdahl appen och oss som privatpersoner,
          senast genom en polisanmälan. I ett försök att skapa transparens har
          vi sammanställt vad som hänt nedan.
        </p>
        <ButtonLink href="/aktuellt">Läs hela historien</ButtonLink>
      </div>
    </section>
  )
}

export default TimelineLatest
