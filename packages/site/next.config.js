const withImages = require('next-images')

// next.config.js
module.exports = {
    ...withImages(),
    i18n: {
        localeDetection: false,
        locales: ['sv', 'en'],
        defaultLocale: 'sv',
        domains: [
            {
                domain: 'skolplattformen.org',
                defaultLocale: 'sv',
              },
              {
                domain: 'localhost',
                defaultLocale: 'sv',
              },
        ]
    },
  }