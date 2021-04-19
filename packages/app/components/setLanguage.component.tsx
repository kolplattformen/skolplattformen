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
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useLanguage } from '../hooks/useLanguage'
import { isRTL, LanguageService } from '../services/languageService'
import { Colors, Layout as LayoutStyle, Sizing } from '../styles'
import { translate } from '../utils/translation'
import { BackIcon } from './icon.component'
import { SafeAreaViewContainer } from './safeAreaViewContainer.component'
import RNRestart from 'react-native-restart'

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

              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => setSelectedLanguage('ar')}
              >
                <Text style={styles.check}>{isSelected('ar') ? '✓' : ''}</Text>
                <Text>Arabic</Text>
                <Text style={styles.languageButtonSubtitle}>
                  (اَلْعَرَبِيَّةُ,
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => setSelectedLanguage('de')}
              >
                <Text style={styles.check}>{isSelected('de') ? '✓' : ''}</Text>
                <Text>German</Text>
                <Text style={styles.languageButtonSubtitle}>Deutsch</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => setSelectedLanguage('pl')}
              >
                <Text style={styles.check}>{isSelected('pl') ? '✓' : ''}</Text>
                <Text>Polish</Text>
                <Text style={styles.languageButtonSubtitle}>Polski</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => setSelectedLanguage('so')}
              >
                <Text style={styles.check}>{isSelected('so') ? '✓' : ''}</Text>
                <Text>Somali</Text>
                <Text style={styles.languageButtonSubtitle}>af-Soomaali</Text>
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
    backgroundColor: Colors.neutral.white,
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
