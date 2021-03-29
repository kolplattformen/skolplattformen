module.exports = {
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  preset: 'react-native',
  setupFilesAfterEnv: [
    '<rootDir>/setupTests.js',
    '@testing-library/jest-native/extend-expect',
  ],
  testPathIgnorePatterns: ['__tests__/Classmates.test.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native|react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry|@ui-kitten|rn-actionsheet-module/.*)',
  ],
}
