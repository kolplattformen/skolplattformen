import AppShots from '../components/AppShots'
import Banner from '../components/Banner'
import CtaThree from '../components/CtaThree'
import CtaTwo from '../components/CtaTwo'
import Features from '../components/Features'
import FunFacts from '../components/FunFacts'
import PricingTemp from '../components/PricingTemp'
import Testimonials from '../components/Testimonials'
import TimelineLatest from '../components/TimelineLatest'

const HomePage = () => {
  return (
    <>
      <Banner />
      <TimelineLatest />
      <Features />
      <FunFacts />
      <CtaTwo />
      <CtaThree />
      <AppShots />
      <PricingTemp />
      <Testimonials />
    </>
  )
}

export default HomePage
