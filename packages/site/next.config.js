const withImages = require('next-images')

module.exports = {
  ...withImages(),
  async rewrites() {
    return [
      {
        source: '/historia',
        destination: '/aktuellt',
      },
    ]
  },
  i18n: {
    localeDetection: false,
    locales: ['sv', 'en'],
    defaultLocale: 'sv',
  },
}
