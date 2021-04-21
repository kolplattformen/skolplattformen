import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as eva from '@eva-design/eva'
import customization from './design/customization.json'
import { AppNavigator } from './components/navigation.component'
import init from '@skolplattformen/embedded-api'
import { ApiProvider } from '@skolplattformen/api-hooks'
import CookieManager from '@react-native-community/cookies'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'react-native'
import { useBackgroundBlur } from './utils/blur'
import { LanguageProvider } from './context/language/languageContext'
import { translations } from './utils/translation'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
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
  const FullBlurView = useBackgroundBlur()
  const colorScheme = useColorScheme()
  return (
    <ApiProvider api={api} storage={AsyncStorage} reporter={reporter}>
      <SafeAreaProvider>
        <AppearanceProvider>
          <StatusBar
            backgroundColor={colorScheme === 'dark' ? '#222B45' : '#FFF'}
            barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
            translucent
          />
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider
            {...eva}
            theme={{
              ...(colorScheme === 'dark' ? eva.dark : eva.light),
              ...customization,
            }}
          >
            <LanguageProvider cache={true} data={translations}>
              <AppNavigator />
            </LanguageProvider>
            {FullBlurView}
          </ApplicationProvider>
        </AppearanceProvider>
      </SafeAreaProvider>
    </ApiProvider>
  )
}
