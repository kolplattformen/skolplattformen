const React = require('react')
const { View } = require('react-native')

// Minimal mock: react-native-webview kräver native TurboModule
// (RNCWebViewModule) redan vid import, vilket inte finns i jest-miljö.
const WebView = (props) => React.createElement(View, props)

module.exports = { WebView, default: WebView }
module.exports.default = WebView
module.exports.WebView = WebView
