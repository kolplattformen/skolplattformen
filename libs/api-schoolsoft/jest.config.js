module.exports = {
  displayName: 'api-schoolsoft',
  testEnvironment: 'node',
  resolver: '@nrwl/jest/plugins/resolver',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        isolatedModules: true,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/api-schoolsoft',
}
