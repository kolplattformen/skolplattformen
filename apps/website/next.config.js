/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  async redirects() {
    return [
      {
        source: '/historia',
        destination: '/aktuellt',
        permanent: true,
      },
    ]
  },
  i18n: {
    localeDetection: false,
    locales: ['sv', 'en'],
    defaultLocale: 'sv',
  },
}
