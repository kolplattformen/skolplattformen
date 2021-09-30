import Head from 'next/head'
import favImg from '../assets/img/favicon.png'
import logo from '../assets/img/logo.png'
import { GA_TRACKING_ID } from './gtag'

interface LayoutProps {
  pageTitle: string
}

const Layout: React.FC<LayoutProps> = ({
  children,
  pageTitle,
}) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Öppna skolplattformen" />
        <meta
          name="description"
          content="Öppna Skolplattformen är en app för iOS och Android som gör det enklare för föräldrar att komma åt uppgifter i Skolplattformen."
        />
        <meta
          property="og:description"
          content="Öppna Skolplattformen är en app för iOS och Android som gör det enklare för föräldrar att komma åt uppgifter i Skolplattformen."
        />
        <meta property="og:image" content={logo} />
        <title>{pageTitle}</title>
        <link rel="shortcut icon" type="image/png" href={favImg} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
          }}
        />
      </Head>
      <div className="page-wrapper" id="wrapper">
        {children}
      </div>
    </div>
  )
}

export default Layout
