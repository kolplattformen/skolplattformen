const isExport = process.env.OUTPUT_EXPORT === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isExport ? 'export' : undefined,
  basePath: process.env.BASE_PATH || '',
  images: {
    unoptimized: isExport,
  },
  ...(isExport
    ? {}
    : {
        async redirects() {
          return [
            {
              source: '/historia',
              destination: '/aktuellt',
              permanent: true,
            },
          ]
        },
      }),
}

module.exports = nextConfig
