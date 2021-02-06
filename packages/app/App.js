import React from 'react'
import {
  ApplicationProvider,
  IconRegistry
} from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as eva from '@eva-design/eva'
import customization from './design/customization.json'
import { AppNavigator } from './components/navigation.component'
import init from '@skolplattformen/embedded-api'
import { ApiProvider } from '@skolplattformen/api-hooks'
import CookieManager from '@react-native-community/cookies'
import AsyncStorage from '@react-native-async-storage/async-storage'

const api = init(fetch, () => { CookieManager.clearAll() })

export default () => {
  return (
    <ApiProvider api={api} storage={AsyncStorage}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...customization }} >
        <AppNavigator />
      </ApplicationProvider>
    </ApiProvider>
  )
}