const { withNxMetro } = require('@nrwl/react-native')

const MetroConfig = require('@ui-kitten/metro-config')
const evaConfig = {
  evaPackage: '@eva-design/eva',
  customMappingPath: './apps/skolplattformen/design/mapping.json',
}

const evaMetroConfig = MetroConfig.create(evaConfig, {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
})

module.exports = withNxMetro(evaMetroConfig, {
  // Change this to true to see debugging info.
  // Useful if you have issues resolving modules
  debug: false,
  // all the file extensions used for imports other than 'ts', 'tsx', 'js', 'jsx'
  extensions: [],
})
