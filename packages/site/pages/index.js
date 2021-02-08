import AppShots from '../components/AppShots'
import Banner from '../components/Banner'
import CtaThree from '../components/CtaThree'
import CtaTwo from '../components/CtaTwo'
import Features from '../components/Features'
import FunFacts from '../components/FunFacts'
import MobileMenu from '../components/MobileMenu'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'

const HomePage = () => {
  return (
    <>
      <MobileMenu />
      <Banner />
      <Features />
      <FunFacts />
      <CtaTwo />
      <CtaThree />
      <AppShots />
      <Pricing />
      <Testimonials />
    </>
  )
}

export default HomePage
