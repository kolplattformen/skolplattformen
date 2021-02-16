import AppShots from '../components/AppShots'
import Banner from '../components/Banner'
import CtaThree from '../components/CtaThree'
import CtaTwo from '../components/CtaTwo'
import Features from '../components/Features'
import FunFacts from '../components/FunFacts'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import Media from '../components/Media'

const HomePage = () => {
  return (
    <>
      <Banner />
      <Features />
      <FunFacts />
      <CtaTwo />
      <CtaThree />
      <AppShots />
      <Pricing />
      <Testimonials />
      <Media />
    </>
  )
}

export default HomePage
