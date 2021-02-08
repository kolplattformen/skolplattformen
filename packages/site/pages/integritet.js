import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Privacy from '../components/Privacy'

const HomePage = () => {
  return (
    <Layout pageTitle="Skolplattformen">
      <Header />
      <Privacy />
      <Footer />
    </Layout>
  )
}

export default HomePage
