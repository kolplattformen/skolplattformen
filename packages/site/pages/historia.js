import Timeline from '../components/Timeline'
import { events } from '../data/timelineEvents'

const HistoryPage = () => {
  return (
    <section className="mx-5 md:mx-0">
      <Timeline events={events} />
    </section>
  )
}

export default HistoryPage
