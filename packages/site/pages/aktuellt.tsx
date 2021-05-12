import { NextPage } from 'next'
import Timeline from '../components/Timeline'
import { H1 } from '../components/Typography'
import { events } from '../data/timelineEvents'

const CurrentEventsPage: NextPage = () => {
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

export default CurrentEventsPage
