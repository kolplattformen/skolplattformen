import React, { useEffect } from 'react'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as eva from '@eva-design/eva'
import customization from './design/customization.json'
import { AppNavigator } from './components/navigation.component'
import init from '@skolplattformen/embedded-api'
import { ApiProvider } from '@skolplattformen/api-hooks'
import CookieManager from '@react-native-community/cookies'
import AsyncStorage from '@react-native-async-storage/async-storage'
import crashlytics from '@react-native-firebase/crashlytics'

const api = init(fetch, () => {
  CookieManager.clearAll()
})
const reporter = {
  log: (message) => crashlytics().log(message),
  error: (error, label) => crashlytics().recordError(error, label),
}

export default () => {
  useEffect(() => {
    crashlytics().log('App mounted')
  }, [])
  return (
    <ApiProvider api={api} reporter={reporter} storage={AsyncStorage}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...customization }}>
        <AppNavigator />
      </ApplicationProvider>
    </ApiProvider>
  )
}
