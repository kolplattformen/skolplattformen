module.exports = {
  displayName: 'skolplattformen',
  preset: 'jest-expo',
  // jest-expo@52-preseten kan peka på react-native-env (jest-29-API) som
  // kraschar mot jest 27 - node-env är den som sviten alltid körde i
  testEnvironment: 'node',
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFiles: ['<rootDir>/global-polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  moduleNameMapper: {
    '^react-native/Libraries/Animated/NativeAnimatedHelper$':
      '<rootDir>/test-mocks/nativeAnimatedHelper.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|@ui-kitten|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],
}
