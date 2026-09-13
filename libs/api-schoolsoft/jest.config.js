module.exports = {
  displayName: 'api-schoolsoft',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.js'],
  resolver: '@nrwl/jest/plugins/resolver',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        isolatedModules: true,
        // typfel i beroendepaket (h2m-typningar etc) ska inte stoppa testen -
        // typdata granskas separat (lint/IDE). Köra (ts 4.5 + ts-jest 29
        // variera här annars) transpileringsbeteende som tidigare.
        diagnostics: false,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/api-schoolsoft',
}
