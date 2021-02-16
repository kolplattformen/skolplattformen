import 'swiper/swiper-bundle.min.css'
import '../styles/global.css'

import Layout from '../components/Layout'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { pageview } from '../components/gtag'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  // Google analytics
  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Layout pageTitle="Skolplattformen">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Layout>
  )
}
