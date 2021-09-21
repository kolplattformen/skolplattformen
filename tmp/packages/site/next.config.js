/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require('next-images')

module.exports = {
  ...withImages(),
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
