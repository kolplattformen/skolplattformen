import { useNavigation, CommonActions } from '@react-navigation/native'
import {
  Layout,
  Text,
  Button,
  ButtonGroup,
  TopNavigationAction,
  TopNavigation,
} from '@ui-kitten/components'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTranslation } from '../hooks/use-translation'
import { Colors, Layout as LayoutStyle, Sizing } from '../styles'
import {
  AvailableLanguages,
  changeLanguage,
  currentLocale,
  translate,
} from '../utils/translation'
import { BackIcon } from './icon.component'
import { SafeAreaViewContainer } from './safeAreaViewContainer.component'

export const SetLanguage = () => {
  const navigation = useNavigation()
  const [selectedLanguage, setSelectedLanguage] = useState<AvailableLanguages>(
    currentLocale() as AvailableLanguages
  )
  const { setCurrentLanguage } = useTranslation()

  const saveLanguage = () => {
    setCurrentLanguage(selectedLanguage)
    changeLanguage(selectedLanguage)
    goBack()
  }

  const isDisabled = (lang: string): boolean => {
    return selectedLanguage === lang
  }

  const goBack = () => {
    navigation.navigate('Login', { locale: currentLocale() })
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <SafeAreaViewContainer>
        <TopNavigation
          accessoryLeft={() => (
            <TopNavigationAction icon={BackIcon} onPress={() => goBack()} />
          )}
          alignment="center"
          title={translate('language.changeLanguage')}
        />
        <View style={styles.content}>
          <Layout style={styles.container}>
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => setSelectedLanguage('sv')}
            >
              <Text style={styles.check}>{isDisabled('sv') ? '✓' : ''}</Text>
              <Text>Swedish</Text>
              <Text style={styles.languageButtonSubtitle}>svenska</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => setSelectedLanguage('en')}
            >
              <Text style={styles.check}>{isDisabled('en') ? '✓' : ''}</Text>
              <Text>English</Text>
              <Text style={styles.languageButtonSubtitle}>engelska</Text>
            </TouchableOpacity>
          </Layout>

          <ButtonGroup style={styles.buttonGroup}>
            <Button
              onPress={() => saveLanguage()}
              appearance="ghost"
              status="primary"
              disabled={currentLocale() === selectedLanguage}
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
  keyboardAvoidingView: { ...LayoutStyle.flex.full },
  safeArea: {
    ...LayoutStyle.flex.full,
    backgroundColor: Colors.neutral.white,
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
  },
  buttonGroup: {
    minHeight: 45,
    marginTop: 20,
  },
  languageButton: {
    minHeight: 45,
  },
  languageButtonSubtitle: {
    opacity: 0.4,
  },
  button: { ...LayoutStyle.flex.full },
})
