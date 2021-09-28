import * as eva from '@eva-design/eva'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CookieManager from '@react-native-community/cookies'
import { ApiProvider } from '@skolplattformen/api-hooks'
import init from '@skolplattformen/embedded-api'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppNavigator } from './components/navigation.component'
import { LanguageProvider } from './context/language/languageContext'
import { default as customMapping } from './design/mapping.json'
import { darkTheme, lightTheme } from './design/themes'
import useSettingsStorage from './hooks/useSettingsStorage'
import { useLangCode } from './services/languageService'
import { translations } from './utils/translation'
const api = init(fetch, CookieManager)

const reporter = __DEV__
  ? {
      log: (message) => console.log(message),
      error: (error, label) => console.error(label, error),
    }
  : {
      log: () => {},
      error: () => {},
    }

if (__DEV__) {
  const DevMenu = require('react-native-dev-menu')
  DevMenu.addItem('Log AsyncStorage contents', () => logAsyncStorage())
}

const safeJsonParse = (maybeJson) => {
  if (maybeJson) {
    try {
      return JSON.parse(maybeJson)
    } catch (error) {
      return maybeJson
    }
  }
  return 'null'
}

const logAsyncStorage = async () => {
  const allKeys = await AsyncStorage.getAllKeys()
  const keysAndValues = await AsyncStorage.multiGet(allKeys)
  console.log('*** AsyncStorage contents:')
  keysAndValues.forEach((keyAndValue) => {
    console.log(
      keyAndValue[0],
      '=>',
      keyAndValue[1] ? safeJsonParse(keyAndValue[1]) : 'null'
    )
  })
  console.log('***')
}

export default () => {
  const [usingSystemTheme] = useSettingsStorage('usingSystemTheme')
  const [theme] = useSettingsStorage('theme')
  const systemTheme = useColorScheme()

  // For now, this hook is only used to rerender the whole app when the language change.
  useLangCode()

  const colorScheme = usingSystemTheme ? systemTheme : theme

  return (
    <ApiProvider api={api} storage={AsyncStorage} reporter={reporter}>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={colorScheme === 'dark' ? '#2E3137' : '#FFF'}
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          translucent
        />
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          customMapping={customMapping}
          theme={colorScheme === 'dark' ? darkTheme : lightTheme}
        >
          <LanguageProvider cache={true} data={translations}>
            <AppNavigator />
          </LanguageProvider>
        </ApplicationProvider>
      </SafeAreaProvider>
    </ApiProvider>
  )
}
