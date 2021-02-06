module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: `./tsconfig.json`
  },
  rules: {
    '@typescript-eslint/semi': ['error', 'never']
  }
}
