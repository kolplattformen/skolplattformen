import { useNavigation } from '@react-navigation/native'
import {
  Layout,
  Text,
  Button,
  ButtonGroup,
  TopNavigationAction,
  TopNavigation,
  useTheme,
} from '@ui-kitten/components'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useLanguage } from '../hooks/useLanguage'
import { LanguageService } from '../services/languageService'
import { Colors, Layout as LayoutStyle, Sizing } from '../styles'
import { translate } from '../utils/translation'
import { BackIcon } from './icon.component'
import { SafeAreaViewContainer } from './safeAreaViewContainer.component'

const theme = useTheme();

export const SetLanguage = () => {
  const navigation = useNavigation()

  const currentLanguage = LanguageService.getLanguageCode()

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    currentLanguage
  )
  const { setLanguageCode } = useLanguage()

  const saveLanguage = () => {
    setLanguageCode({ languageCode: selectedLanguage })
    goBack()
  }

  const isSelected = (lang: string): boolean => {
    return selectedLanguage === lang
  }

  const goBack = () => {
    // Need to reset the view so it updates the language
    navigation.navigate('Login', { rand: Math.random() })
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
            <View style={styles.languageList}>
              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => setSelectedLanguage('sv')}
              >
                <Text style={styles.check}>{isSelected('sv') ? '✓' : ''}</Text>
                <Text>Swedish</Text>
                <Text style={styles.languageButtonSubtitle}>svenska</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => setSelectedLanguage('en')}
              >
                <Text style={styles.check}>{isSelected('en') ? '✓' : ''}</Text>
                <Text>English</Text>
                <Text style={styles.languageButtonSubtitle}>engelska</Text>
              </TouchableOpacity>
            </View>
          </Layout>

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
  keyboardAvoidingView: { ...LayoutStyle.flex.full },
  safeArea: {
    ...LayoutStyle.flex.full,
    backgroundColor: theme['background-basic-color-1'],
  },
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
