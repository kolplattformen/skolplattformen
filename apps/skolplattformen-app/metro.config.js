// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')

const defaultConfig = getDefaultConfig(__dirname)

// UI Kitten config
const MetroConfig = require('@ui-kitten/metro-config')
const evaConfig = {
  evaPackage: '@eva-design/eva',
  customMappingPath: './design/mapping.json',
}

const evaMetroConfig = MetroConfig.create(evaConfig, {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
})

module.exports = {
  ...defaultConfig,
  ...evaMetroConfig,
  transformer: {
    ...defaultConfig.transformer,
    ...evaMetroConfig.transformer,
  },
  resolver: {
    ...defaultConfig.resolver,
    ...evaMetroConfig.resolver,
    assetExts: [...defaultConfig.resolver.assetExts, 'svg'],
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
}
