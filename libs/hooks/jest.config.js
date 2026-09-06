module.exports = {
  displayName: 'hooks',
  preset: '../../jest.preset.js',
  transform: {
    // rootMode: 'upward' gör att babel hittar repo-rotens babel.config.json
    // (babelrcRoots: ['*']) även när jest körs med projektet som cwd,
    // så att .babelrc i grannpaket (t.ex. libs/api-skolplattformen)
    // tillämpas på filer som resolvern pekar dit.
    '^.+\\.[tj]sx?$': ['babel-jest', { rootMode: 'upward' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/hooks',
}
