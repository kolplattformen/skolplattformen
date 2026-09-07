module.exports = {
  displayName: 'api-vklass',
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
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  coverageDirectory: '../../coverage/libs/api-vklass',
}
