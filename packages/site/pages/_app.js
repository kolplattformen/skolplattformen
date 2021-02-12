import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-modal-video/css/modal-video.min.css'
import '../assets/css/font-awesome.min.css'
import 'swiper/swiper-bundle.min.css'
import '../assets/css/style.css'
import '../assets/css/responsive.css'
import '../assets/css/custom.css'

import Layout from '../components/Layout'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { pageview } from '../components/gtag'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {

  // Google analytics
  const router = useRouter()
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
