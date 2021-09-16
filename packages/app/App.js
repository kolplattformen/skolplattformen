import * as eva from '@eva-design/eva'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CookieManager from '@react-native-community/cookies'
import { ApiProvider } from '@skolplattformen/api-hooks'
import init from '@skolplattformen/embedded-api'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React from 'react'
import { StatusBar } from 'react-native'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppNavigator } from './components/navigation.component'
import { LanguageProvider } from './context/language/languageContext'
import { default as customMapping } from './design/mapping.json'
import { darkTheme, lightTheme } from './design/themes'
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

export default () => {
  const colorScheme = useColorScheme()

  return (
    <ApiProvider api={api} storage={AsyncStorage} reporter={reporter}>
      <SafeAreaProvider>
        <AppearanceProvider>
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
        </AppearanceProvider>
      </SafeAreaProvider>
    </ApiProvider>
  )
}
