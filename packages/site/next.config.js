const withImages = require('next-images')

module.exports = {
  ...withImages(),
  i18n: {
    localeDetection: false,
    locales: ['sv', 'en'],
    defaultLocale: 'sv',
  },
}

