// react-native/Libraries/Animated/NativeAnimatedHelper togs bort i RN 0.76,
// men test-setup.ts mockar fortfarande modulen. Denna stub gör att
// moduleNameMapper kan peka dit utan att test-setup.ts behöver skrivas om.
module.exports = {}
