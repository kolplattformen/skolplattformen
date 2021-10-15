module.exports = function(api) {
    api.cache(true);
    const presets = [
      '@nrwl/next/babel',
      'module:metro-react-native-babel-preset'
    ];
    const plugins = [
      ["@babel/plugin-proposal-private-property-in-object", { "loose": false }]
    ];
  
    return {
      presets,
      plugins
    };
  };