/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
 const path = require('path');
 const exclusionList = require('metro-config/src/defaults/exclusionList');

 const watchFolders = [
   path.resolve(__dirname + '/..'), //Relative path to packages directory
   path.resolve(__dirname + '/../../node_modules') //Relative path to packages directory
 ];
 
 module.exports = {
  resolver: {
    blacklistRE: exclusionList([/dist\/.*/]),
    sourceExts: ['jsx', 'js', 'ts', 'tsx'],
  },
   transformer: {
     getTransformOptions: async () => ({
       transform: {
         experimentalImportSupport: false,
         inlineRequires: false,
       },
     }),
   },
   watchFolders
 };