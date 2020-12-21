module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  production: {
    plugins: ["transform-remove-console"]
  }
};
