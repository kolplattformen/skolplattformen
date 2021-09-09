import { useNavigation } from '@react-navigation/native'
import {
  Button,
  ButtonGroup,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components'
import React, { useState } from 'react'
import { View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import RNRestart from 'react-native-restart'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackNavigationOptions } from 'react-native-screens/native-stack'
import { useLanguage } from '../hooks/useLanguage'
import { isRTL, LanguageService } from '../services/languageService'
import { Layout as LayoutStyle, Sizing } from '../styles'
import { fontSize } from '../styles/typography'
import { languages, translate } from '../utils/translation'
import { CheckIcon } from './icon.component'

export const setLanguageRouteOptions = (): NativeStackNavigationOptions => ({
  title: translate('language.changeLanguage'),
})

export const SetLanguage = () => {
  const navigation = useNavigation()
  const styles = useStyleSheet(themedStyles)
  const colors = useTheme()

  const currentLanguage = LanguageService.getLanguageCode()

  const [selectedLanguage, setSelectedLanguage] =
    useState<string>(currentLanguage)
  const { setLanguageCode } = useLanguage()

  const shouldRestart = () => {
    return isRTL(selectedLanguage) || isRTL(currentLanguage)
  }

  const saveLanguage = () => {
    setLanguageCode({ languageCode: selectedLanguage })

    // Checks if rtl mode has changed, then we need to restart the app
    if (shouldRestart()) {
      RNRestart.Restart()
    } else {
      goBack()
    }
  }

  const isSelected = (lang: string): boolean => {
    return selectedLanguage === lang
  }

  const goBack = () => {
    // Need to reset the view so it updates the language
    navigation.navigate('Login', { rand: Math.random() })
  }

  const activeLanguages = languages.filter((language) => language.active)

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.languageList}>
            {activeLanguages.map((language) => (
              <TouchableOpacity
                key={language.langCode}
                style={styles.languageButton}
                onPress={() => setSelectedLanguage(language.langCode)}
              >
                <View>
                  <Text style={styles.languageButtonTitle}>
                    {language.languageLocalName}
                  </Text>
                  <Text style={styles.languageButtonSubtitle}>
                    {language.languageName}
                  </Text>
                </View>
                {isSelected(language.langCode) ? (
                  <CheckIcon
                    height={24}
                    width={24}
                    fill={colors['color-success-600']}
                  />
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <ButtonGroup style={styles.buttonGroup}>
        <Button
          onPress={() => saveLanguage()}
          appearance="ghost"
          status="primary"
          disabled={currentLanguage === selectedLanguage}
          style={styles.button}
          size="medium"
        >
          {translate('language.changeLanguageButton')}
        </Button>
      </ButtonGroup>
    </SafeAreaView>
  )
}

const themedStyles = StyleService.create({
  languageList: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    marginTop: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  content: {
    ...LayoutStyle.center,
    ...LayoutStyle.flex.full,
    margin: Sizing.t5,
    paddingBottom: Sizing.t5,
  },
  buttonGroup: {
    minHeight: 45,
    marginTop: 20,
    marginHorizontal: Sizing.t5,
  },
  languageButton: {
    minHeight: 45,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageButtonTitle: {
    ...fontSize.lg,
  },
  languageButtonSubtitle: {
    ...fontSize.sm,
    opacity: 0.4,
  },
  button: { ...LayoutStyle.flex.full },
})
