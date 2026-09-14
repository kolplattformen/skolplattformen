import * as eva from '@eva-design/eva'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiProvider, Reporter } from '@skolplattformen/hooks'
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React from 'react'
import { StatusBar, useColorScheme, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppNavigator } from './components/navigation.component'
import { FeatureProvider } from './context/feature/featureContext'
import { LanguageProvider } from './context/language/languageContext'
import { SchoolPlatformProvider } from './context/schoolPlatform/schoolPlatformContext'
import { schoolPlatforms } from './data/schoolPlatforms'
import { default as customMapping } from './design/mapping.json'
import { darkTheme, lightTheme } from './design/themes'
import useSettingsStorage from './hooks/useSettingsStorage'
import { translations } from './utils/translation'

const reporter: Reporter | undefined = __DEV__
  ? {
      log: (message: string) => console.log(message),
      error: (error: Error, label?: string) => console.log(label, error),
    }
  : undefined

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { DevSettings } = require('react-native')
  DevSettings.addMenuItem('Clear AsyncStorage from all contents', () =>
    AsyncStorage.clear().then(() => logAsyncStorage())
  )
  DevSettings.addMenuItem('Log AsyncStorage contents', () => logAsyncStorage())
}

const safeJsonParse = (maybeJson: string) => {
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
  // RELEASE-diagnostik: ohanterade JS-fel visas som text direkt på skärmen
  // (release har ingen röd ruta)
  const [fatalError, setFatalError] = React.useState<string | null>(null)
  React.useEffect(() => {
    if (__DEV__) return
    const handler = ErrorUtils.getGlobalHandler()
    ErrorUtils.setGlobalHandler((error, isFatal) => {
      const stack = typeof (error as any)?.stack === 'string' ? (error as any).stack : ''
      setFatalError(String(error) + '\n\n' + stack.slice(0, 2000))
    })
    return () => {
      ErrorUtils.setGlobalHandler(handler)
    }
  }, [])

  const [usingSystemTheme] = useSettingsStorage('usingSystemTheme')
  const [currentSchoolPlatform] = useSettingsStorage('currentSchoolPlatform')
  const [theme] = useSettingsStorage('theme')
  const systemTheme = useColorScheme()
  const colorScheme = usingSystemTheme ? systemTheme : theme

  if (fatalError)
    return (
      <View style={{ padding: 24, paddingTop: 60 }}>
        <Text>{fatalError}</Text>
      </View>
    )

  // Okänt sparat id (t.ex. borttagen plattform) => fall tillbaka på första
  // plattformen istället för att krascha hela appen vid boot.
  const platform =
    schoolPlatforms.find((pf) => pf.id === currentSchoolPlatform) ??
    schoolPlatforms[0]

  if (!platform)
    return (
      <View>
        <Text>ERROR</Text>
      </View>
    )

  return (
    <FeatureProvider features={platform.features}>
      <SchoolPlatformProvider>
        <ApiProvider
          api={platform.api}
          storage={AsyncStorage}
          reporter={reporter}
        >
          <SafeAreaProvider>
            <StatusBar
              backgroundColor={colorScheme === 'dark' ? '#2E3137' : '#FFF'}
              barStyle={
                colorScheme === 'dark' ? 'light-content' : 'dark-content'
              }
              translucent
            />
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider
              {...eva}
              // @ts-expect-error Unknown error
              customMapping={customMapping}
              theme={colorScheme === 'dark' ? darkTheme : lightTheme}
            >
              <LanguageProvider cache={true} data={translations}>
                <AppNavigator />
              </LanguageProvider>
            </ApplicationProvider>
          </SafeAreaProvider>
        </ApiProvider>
      </SchoolPlatformProvider>
    </FeatureProvider>
  )
}
