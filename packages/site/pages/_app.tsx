import 'swiper/swiper-bundle.min.css'
import '../styles/global.css'

import Layout from '../components/Layout'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import { pageview } from '../components/gtag'
import messages, { Languages } from '../content/locale/'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { locale = 'sv', defaultLocale } = router

  const currentMessages = messages[locale as Languages]

  // Google analytics
  useEffect(() => {
    const handleRouteChange = (url: string) => pageview(url)

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={currentMessages}
    >
      <Layout pageTitle="Skolplattformen">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </IntlProvider>
  )
}
