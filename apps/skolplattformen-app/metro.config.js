const { getDefaultConfig } = require('expo/metro-config')
const MetroConfig = require('@ui-kitten/metro-config')
const path = require('path')
const fs = require('fs')

// VIKTIGT: projectRoot MÅSTE vara app-katalogen. Babel-transformern letar
// efter babel.config.{json,js} i projectRoot - hittar den en fil (t.ex.
// repo-rotens babelrcRoots-stub) läggs ingen RN-preset till och RN 0.76:s
// TS-in-js + class properties kraschar parsingen. App-katalogen har ingen
// babel-config => babel-preset-expo används som default av expo-transformern.
const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')

console.log(`[metro.config] laddad (projectRoot=${projectRoot})`)

const workspaceLibs = {
  '@skolplattformen/api': 'libs/api',
  '@skolplattformen/api-skolplattformen': 'libs/api-skolplattformen',
  '@skolplattformen/api-schoolsoft': 'libs/api-schoolsoft',
  '@skolplattformen/hooks': 'libs/hooks',
  '@skolplattformen/curriculum': 'libs/curriculum',
}
const extraNodeModules = {}
for (const [key, rel] of Object.entries(workspaceLibs)) {
  const abs = path.join(workspaceRoot, rel)
  if (fs.existsSync(abs)) extraNodeModules[key] = abs
}

const defaultConfig = getDefaultConfig(projectRoot)

const config = {
  ...defaultConfig,
  projectRoot,
  watchFolders: [
    ...(defaultConfig.watchFolders || []),
    path.join(workspaceRoot, 'node_modules'),
    path.join(workspaceRoot, 'libs'),
  ].filter((folder) => fs.existsSync(folder)),
  resolver: {
    ...defaultConfig.resolver,
    // RN 0.76.5 har assets under react-native-paketet (det nyare
    // @react-native/assets-registry kräver RN >=0.76.9) - men vi har
    // installerat assets-registry-shimmet så expons default fungerar.
    nodeModulesPaths: [
      path.join(projectRoot, 'node_modules'),
      path.join(workspaceRoot, 'node_modules'),
    ],
    extraNodeModules,
  },
  transformer: {
    ...defaultConfig.transformer,
    // RN 0.76:s källor innehåller TS-in-.js (EventEmitter m.fl.) - kräver
    // hermes-parser i expo-transformerns parse-väg
    hermesParser: true,
    // release-test: enkel minifier (terser misstänks förstöra koden)
    minifierConfig: { compress: false, mangle: false },
  },
}

module.exports = MetroConfig.create(
  {
    evaPackage: '@eva-design/eva',
    customMappingPath: path.join(projectRoot, 'design/mapping.json'),
  },
  config
)
