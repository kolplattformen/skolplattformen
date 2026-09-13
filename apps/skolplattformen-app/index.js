import 'react-native-gesture-handler'
import '@formatjs/intl-getcanonicallocales/polyfill'
import '@formatjs/intl-locale/polyfill'
import '@formatjs/intl-numberformat/polyfill'
import '@formatjs/intl-numberformat/locale-data/en'
import '@formatjs/intl-numberformat/locale-data/sv'
import '@formatjs/intl-pluralrules/polyfill'
import '@formatjs/intl-pluralrules/locale-data/en'
import '@formatjs/intl-pluralrules/locale-data/sv'
import '@formatjs/intl-datetimeformat/polyfill'
import '@formatjs/intl-datetimeformat/locale-data/en'
import '@formatjs/intl-datetimeformat/locale-data/sv'
import '@formatjs/intl-datetimeformat/add-all-tz'

import { AppRegistry, Text, View } from 'react-native'
import React from 'react'
import { name as appName } from './app.json'

// DIAGNOSTIK-BOOT: endast React + minimal vy i entry. Hela App importeras
// först inuti try - alla fel (modul-init + render) fångas och VISAS.
let App = null
let bootError = ''
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  App = require('./App').default
} catch (e) {
  bootError = 'require(App) kraschade:\n' + String((e && e.stack) || e)
}

if (!App) {
  App = () => (
    <View style={{ padding: 24, paddingTop: 80 }}>
      <Text style={{ fontSize: 16, fontFamily: 'Menlo' }}>{bootError}</Text>
    </View>
  )
}

// Rendering-error i trädet fångas också: visa istället för abort
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: '' }
  }
  static getDerivedStateFromError(error) {
    return { error: String((error && error.stack) || error) }
  }
  render() {
    if (this.state.error)
      return (
        <View style={{ padding: 24, paddingTop: 80 }}>
          <Text style={{ fontSize: 14, fontFamily: 'Menlo' }}>
            {'Render-krasch:\n' + this.state.error}
          </Text>
        </View>
      )
    return this.props.children
  }
}

// global handlerräddare (asynkrona fel) - abort guardian:s text behålls sista
if (typeof ErrorUtils !== 'undefined' && typeof global !== 'undefined') {
  const original = ErrorUtils.getGlobalHandler()
  ErrorUtils.setGlobalHandler((error, isFatal) => {
    try {
      const { Alert } = require('react-native')
      Alert.alert(
        isFatal ? 'JS-fel (fatal)' : 'JS-fel',
        String((error && error.stack) || error).slice(0, 600)
      )
    } catch {}
    if (original) original(error, isFatal)
  })
}

// expo-prebuildens native-sida ropar 'main' (oavsett app-namn) - registrera
// båda så produktionsnamn + dev-entry fungerar
const Root = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
AppRegistry.registerComponent('main', () => Root)
AppRegistry.registerComponent(appName, () => Root)

// säkerställ att bundlen har logs på plats
if (typeof global !== 'undefined') {
  global.__DEV_DIAGNOSTIC_BOOT__ = 'index.js ok'
}
