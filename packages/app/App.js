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
import { useTranslation } from './hooks/use-translation'

const api = init(fetch, CookieManager)

export default () => {
  const FullBlurView = useBackgroundBlur()

  useTranslation()

  return (
    <ApiProvider api={api} storage={AsyncStorage}>
      <SafeAreaProvider>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" translucent />
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{ ...eva.light, ...customization }}
        >
          <AppNavigator />
          {FullBlurView}
        </ApplicationProvider>
      </SafeAreaProvider>
    </ApiProvider>
  )
}
