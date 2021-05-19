import { useNavigation } from '@react-navigation/native'
import {
  Layout,
  Text,
  Button,
  ButtonGroup,
  TopNavigationAction,
  TopNavigation,
} from '@ui-kitten/components'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useLanguage } from '../hooks/useLanguage'
import { isRTL, LanguageService } from '../services/languageService'
import { Layout as LayoutStyle, Sizing } from '../styles'
import { translate, languages } from '../utils/translation'
import { BackIcon } from './icon.component'
import { SafeAreaViewContainer } from '../ui/safeAreaViewContainer.component'
import RNRestart from 'react-native-restart'
import { SafeAreaView } from '../ui/safeAreaView.component'

export const SetLanguage = () => {
  const navigation = useNavigation()

  const currentLanguage = LanguageService.getLanguageCode()

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    currentLanguage
  )
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
    <SafeAreaView>
      <SafeAreaViewContainer>
        <TopNavigation
          accessoryLeft={() => (
            <TopNavigationAction icon={BackIcon} onPress={() => goBack()} />
          )}
          alignment="center"
          title={translate('language.changeLanguage')}
        />
        
        <View style={styles.content}>
        <ScrollView>
          <Layout style={styles.container}>
            <View style={styles.languageList}>
              {activeLanguages.map((language) => (
                <TouchableOpacity
                  key={language.langCode}
                  style={styles.languageButton}
                  onPress={() => setSelectedLanguage(language.langCode)}
                >
                  <Text style={styles.check}>
                    {isSelected(language.langCode) ? '✓' : ''}
                  </Text>
                  <Text>{language.languageName}</Text>
                  <Text style={styles.languageButtonSubtitle}>
                    {language.languageLocalName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Layout>
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
        </View>
        
      </SafeAreaViewContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  languageList: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    marginTop: 40,
  },
  icon: {
    width: 30,
    height: 30,
  },
  check: {
    position: 'absolute',
    left: -20,
    color: 'green',
  },
  container: {
    ...LayoutStyle.mainAxis.center,
    ...LayoutStyle.crossAxis.flexEnd,
    padding: Sizing.t5,
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
  },
  languageButton: {
    minHeight: 45,
    marginBottom: 10,
  },
  languageButtonSubtitle: {
    opacity: 0.4,
  },
  button: { ...LayoutStyle.flex.full },
})
