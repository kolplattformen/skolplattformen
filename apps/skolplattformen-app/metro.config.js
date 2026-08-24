// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

// Find the project and workspace directories
const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')

const defaultConfig = getDefaultConfig(projectRoot)

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
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    ...defaultConfig.resolver,
    ...evaMetroConfig.resolver,
    assetExts: [...defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'), 'svg'],
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    extraNodeModules: {
      '@skolplattformen/api': path.resolve(workspaceRoot, 'libs/api'),
      '@skolplattformen/api-skolplattformen': path.resolve(workspaceRoot, 'libs/api-skolplattformen'),
      '@skolplattformen/api-infomentor': path.resolve(workspaceRoot, 'libs/api-infomentor'),
      '@skolplattformen/curriculum': path.resolve(workspaceRoot, 'libs/curriculum'),
      '@skolplattformen/hooks': path.resolve(workspaceRoot, 'libs/hooks'),
      react: path.resolve(workspaceRoot, 'node_modules/react'),
      'react-native': path.resolve(workspaceRoot, 'node_modules/react-native'),
      'react-dom': path.resolve(workspaceRoot, 'node_modules/react-dom'),
      'react-redux': path.resolve(workspaceRoot, 'node_modules/react-redux'),
      'react-native-svg': path.resolve(workspaceRoot, 'node_modules/react-native-svg'),
      'use-sync-external-store': path.resolve(workspaceRoot, 'node_modules/use-sync-external-store'),
      scheduler: path.resolve(workspaceRoot, 'node_modules/react-native/node_modules/scheduler'),
    },
  },
  watchFolders: [
    path.resolve(workspaceRoot, 'libs'),
    path.resolve(workspaceRoot, 'node_modules'),
  ],
}
