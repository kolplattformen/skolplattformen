import Head from 'next/head'
import React from 'react'
import favImg from '../assets/img/favicon.png'
import logo from '../assets/img/logo.png'
import { GA_TRACKING_ID } from './gtag'

const Layout = (props) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Öppna skolplattformen" />
        <meta
          property="og:description"
          content="Öppna Skolplattformen är en app för iOS och Android som gör det enklare för föräldrar att komma åt uppgifter i Skolplattformen."
        />
        <meta property="og:image" content={logo} />
        <title>{props.pageTitle}</title>
        <link rel="shortcut icon" type="image/png" href={favImg} />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700"
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
        {props.children}
      </div>
    </div>
  )
}

export default Layout
