module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: ['./tsconfig.json']
  },
  extends: [
    'airbnb-typescript/base',
  ],
  ignorePatterns: ['*.test.ts'],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    // '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/semi': [2, 'never'],
    'max-len': ['error', { code: 120, 'ignoreUrls': true }],
    'import/prefer-default-export': 0,
  },
}
