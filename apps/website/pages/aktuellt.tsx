import { GetStaticProps, NextPage } from 'next'
import Timeline from '../components/Timeline'
import { H1 } from '../components/Typography'
import { ReactNode } from 'react'

interface Event {
  date: string
  description: string
  link?: string | null
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

const CurrentEventsPage: NextPage<TimelineProps> = ({ events = [] }) => {
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

let cachedEvents: TimelineEvent[] = []

const SPREADSHEET_ID = '151I2PrWkhWKC8OW-GB_sbgtGDtf0Ta-WdVcUOo5sUDI'
const API_KEY = 'AIzaSyB-ONvFoIE_LUu0sxWLaE8QfHfDSM5uBG8'

async function fetchTimelineEvents(): Promise<TimelineEvent[]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchGet?ranges=months!A:B&ranges=media!A:C&ranges=importantDates!A:C&key=${API_KEY}`
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) {
      throw new Error(`Google Sheets API error: ${res.status} ${res.statusText}`)
    }
    const data = await res.json()
    const [monthsData, mediaData, importantDatesData] = data.valueRanges || []

    const months: { date: string; overview: string }[] = (monthsData?.values || [])
      .slice(1)
      .map(([date, overview]: [string, string]) => ({
        date: date || '',
        overview: overview || '',
      }))

    const media: Event[] = (mediaData?.values || [])
      .slice(1)
      .map(([date, description, link]: [string, string, string?]) => ({
        date: date || '',
        description: description || '',
        link: link || null,
      }))

    const importantDates: Event[] = (importantDatesData?.values || [])
      .slice(1)
      .map(([date, description, link]: [string, string, string?]) => ({
        date: date || '',
        description: description || '',
        link: link || null,
      }))

    return months.map((month) => ({
      ...month,
      media: media.filter(({ date }) =>
        date.startsWith(month.date.slice(0, 7))
      ),
      importantDates: importantDates.filter(({ date }) =>
        date.startsWith(month.date.slice(0, 7))
      ),
    }))
  } finally {
    clearTimeout(timeoutId)
  }
}

export const getStaticProps: GetStaticProps<TimelineProps> = async () => {
  const isExport = process.env.OUTPUT_EXPORT === 'true'
  try {
    const events = await fetchTimelineEvents()
    cachedEvents = events
    return {
      props: { events },
      ...(isExport ? {} : { revalidate: 3600 }),
    }
  } catch (err) {
    console.error('Failed to load timeline events from Google Sheets:', err)
    if (cachedEvents.length > 0) {
      return {
        props: { events: cachedEvents },
        ...(isExport ? {} : { revalidate: 3600 }),
      }
    }
    return {
      props: { events: [] },
      ...(isExport ? {} : { revalidate: 3600 }),
    }
  }
}

export default CurrentEventsPage
