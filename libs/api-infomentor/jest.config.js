module.exports = {
  displayName: 'api-infomentor',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/api-infomentor',
  moduleNameMapper: {
    '^@skolplattformen/api$': '<rootDir>/../api/lib/index.ts',
  },
}
