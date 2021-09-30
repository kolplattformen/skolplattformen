/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { withNxMetro } = require('@nrwl/react-native')

// UI Kitten disabled for now
// const MetroConfig = require('@ui-kitten/metro-config')
// /**
//  * @see https://akveo.github.io/react-native-ui-kitten/docs/guides/improving-performance
//  */
// const evaConfig = {
//   evaPackage: '@eva-design/eva',
//   customMappingPath: './design/mapping.json',
// }
// const config = MetroConfig.create(evaConfig, {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },
// })

const config = {}

module.exports = withNxMetro(config)
