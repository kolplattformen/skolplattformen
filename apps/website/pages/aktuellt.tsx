import { NextPage } from 'next'
import Timeline from '../components/Timeline'
import { H1 } from '../components/Typography'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { ReactNode } from 'react'

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

interface TimelineProps {
  events: TimelineEvent[]
}

const CurrentEventsPage: NextPage<TimelineProps> = ({ events }) => {
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

let cachedEvents: TimelineEvent[]
type VoidCallback = () => void

const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const runOrTimeout = (fun: VoidCallback, ms: number) =>
  Promise.race([
    fun(),
    timeout(ms).then(() => Promise.reject(new Error('Timout'))),
  ])

export const getServerSideProps = async (): Promise<{
  props: TimelineProps
}> => {
  // This info has moved to Google Sheets instead
  // https://docs.google.com/spreadsheets/d/151I2PrWkhWKC8OW-GB_sbgtGDtf0Ta-WdVcUOo5sUDI/edit?usp=sharing
  const doc = new GoogleSpreadsheet(
    '151I2PrWkhWKC8OW-GB_sbgtGDtf0Ta-WdVcUOo5sUDI'
  )
  doc.useApiKey('AIzaSyB-ONvFoIE_LUu0sxWLaE8QfHfDSM5uBG8')

  try {
    await runOrTimeout(() => doc.loadInfo(), 1000)

    const months = (
      await doc.sheetsByTitle['months'].getRows()
    ).map(({ date, overview }) => ({ date, overview }))
    const media = (
      await doc.sheetsByTitle['media'].getRows()
    ).map(({ date, description, link = null }) => ({ date, description, link }))
    const importantDates = (
      await doc.sheetsByTitle['importantDates'].getRows()
    ).map(({ date, description, link = null }) => ({ date, description, link }))

    const events: TimelineEvent[] = months.map((month) => ({
      ...month,
      media: media.filter(({ date }) =>
        date.startsWith(month.date.slice(0, 7))
      ),
      importantDates: importantDates.filter(({ date }) =>
        date.startsWith(month.date.slice(0, 7))
      ),
    }))

    cachedEvents = events

    return { props: { events } }
  } catch (err) {
    console.error(err)
    if (!cachedEvents) throw err
    return { props: { events: cachedEvents } } // sometimes we might run into rate limits in google sheets. Just return the old value until we get back again
  }
}

export default CurrentEventsPage
