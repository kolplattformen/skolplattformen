import React from 'react'
import AppShots from '../components/AppShots'
import Banner from '../components/Banner'
import CtaThree from '../components/CtaThree'
import CtaTwo from '../components/CtaTwo'
import Features from '../components/Features'
import Footer from '../components/Footer'
import FunFacts from '../components/FunFacts'
import Header from '../components/Header'
import Layout from '../components/Layout'
import MobileMenu from '../components/MobileMenu'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'

const HomePage = () => {
  return (
    <Layout pageTitle="Skolplattformen">
      <Header />
      <MobileMenu />
      <Banner />
      <Features />
      <FunFacts />
      <CtaTwo />
      <CtaThree />
      <AppShots />
      <Pricing />
      <Testimonials />
      <Footer />
    </Layout>
  )
}

export default HomePage
