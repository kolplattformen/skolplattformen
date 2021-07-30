import { NextPage } from 'next'
import Timeline from '../components/Timeline'
import { H1 } from '../components/Typography'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { TimelineEvent } from '../data/timelineEvents'

const CurrentEventsPage: NextPage = ({ events }) => {
  return (
    <section className="mx-5 max-w-2xl md:mx-auto">
      <div className="my-8 md:my-20">
        <H1>Aktuellt</H1>
        <div className="mt-12">
          <Timeline events={events} />
        </div>
      </div>
    </section>
  )
}

export const getServerSideProps = async () => {
  // This info has moved to Google Sheets instead
  // https://docs.google.com/spreadsheets/d/151I2PrWkhWKC8OW-GB_sbgtGDtf0Ta-WdVcUOo5sUDI/edit?usp=sharing
  const doc = new GoogleSpreadsheet(
    '151I2PrWkhWKC8OW-GB_sbgtGDtf0Ta-WdVcUOo5sUDI'
  )
  doc.useApiKey('AIzaSyB-ONvFoIE_LUu0sxWLaE8QfHfDSM5uBG8')
  await doc.loadInfo()

  const months = (
    await doc.sheetsByTitle['months'].getRows()
  ).map(({ date, overview }) => ({ date, overview }))
  const media = (
    await doc.sheetsByTitle['media'].getRows()
  ).map(({ date, description, link = null }) => ({ date, description, link }))
  const importantDates = (
    await doc.sheetsByTitle['importantDates'].getRows()
  ).map(({ date, description, link = null }) => ({ date, description, link }))

  const events: TimelineEvent[] = months.map(
    (month: { date: string; overview: string }) => ({
      ...month,
      media: media.filter((media: { date: string }) =>
        media.date.startsWith(month.date.slice(0, 7))
      ),
      importantDates: importantDates.filter((importantDate: { date: string }) =>
        importantDate.date.startsWith(month.date.slice(0, 7))
      ),
    })
  )

  return { props: { events } }
}

export default CurrentEventsPage
