module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '.(ts|tsx)': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ["ts", "tsx", "js"]
}
