module.exports = {
  extends: [
    'airbnb-typescript',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    project: `./tsconfig.json`,
  },
  rules: {
    '@typescript-eslint/semi': ['error', 'never'],
    'jest/no-mocks-import': [0],
    'max-len': [1, 110],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
  },
}
