module.exports = function(api) {
  api.cache(true);
  const presets = [
    'module:metro-react-native-babel-preset'
  ];
  const plugins = [
    'jest-hoist',
    ["@babel/plugin-proposal-private-property-in-object", { "loose": false }]
  ];

  return {
    presets,
    plugins
  };
};