module.exports = {
  preset: 'react-native',
  // moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  // setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  // transform: {
  //   // '\\.(js|ts|tsx)$': require.resolve('react-native/jest/preprocessor.js'),
  //   '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': require.resolve(
  //     'react-native/jest/assetFileTransformer.js'
  //   ),
  // },
  // transformIgnorePatterns: [
  //   'node_modules/(?!(@react-native|react-native|@ronradtke/react-native-markdown-display|react-native-webview|react-native-calendar-events|react-native-simple-toast|react-native-modal-datetime-picker|@react-native-community/datetimepicker)/)',
  // ],
  testEnvironment: 'jsdom',
};
