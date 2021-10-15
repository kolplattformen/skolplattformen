module.exports = function(api) {
    api.cache(true);
    const presets = [
      [
        '@nrwl/next/babel',
        {
          modules: 'auto',
          targets: {
            browsers: ['defaults']
          },
        }
      ],
      "@nrwl/react/babel",
    ];
    const plugins = [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-class-properties',
      ["@babel/plugin-proposal-private-property-in-object", { "loose": false }],
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true,
        "corejs": 3
      }
    ];
  
    return {
      presets,
      plugins
    };
  };