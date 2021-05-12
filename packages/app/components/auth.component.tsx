import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components'
import React from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { Login } from './login.component'
import { Layout as LayoutStyle, Sizing, Typography } from '../styles'
import { SafeAreaViewContainer } from '../ui/safeAreaViewContainer.component'
import { translate, languages } from '../utils/translation'
import { GlobeIcon } from './icon.component'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from './navigation.component'
import { SafeAreaView } from '../ui/safeAreaView.component'
import { KeyboardAvoidingView } from '../ui/keyboardAvoidingView.component'
import { LanguageService } from '../services/languageService'

const randomWord = () => {
  const words = translate('auth.words')
  const keys = Object.keys(words)

  const randomIndex: number = Math.floor(Math.random() * keys.length)
  const argumentKey: string = keys[randomIndex]

  // @ts-expect-error Fix this later
  return words[argumentKey]
}

interface AuthProps {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>
}

export const Auth: React.FC<AuthProps> = ({ navigation }) => {
  const styles = useStyleSheet(themeStyles)

  const currentLanguage = LanguageService.getLanguageCode()
  const currentLanguageName = languages.find(
    (language) => language.langCode === currentLanguage
  )?.languageLocalName

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <SafeAreaViewContainer>
            <TopNavigation
              alignment="start"
              subtitle={currentLanguageName}
              accessoryLeft={() => (
                <TopNavigationAction
                  accessibilityHint={translate(
                    'auth.a11y_navigate_to_change_language',
                    {
                      defaultValue: 'Navigerar till byt språk skärmen',
                    }
                  )}
                  accessibilityLabel={translate('auth.a11y_change_language', {
                    defaultValue: 'Byt språk',
                  })}
                  accessible={true}
                  icon={GlobeIcon}
                  onPress={() => navigation.navigate('SetLanguage')}
                />
              )}
            />
            <View style={styles.content}>
              <Layout style={styles.container}>
                <Text category="h2" adjustsFontSizeToFit numberOfLines={1}>
                  {translate('general.title')}
                </Text>
                <Text style={styles.subtitle}>
                  {translate('auth.subtitle', {
                    word: randomWord(),
                  })}
                </Text>
                <Login />
              </Layout>
            </View>
          </SafeAreaViewContainer>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const themeStyles = StyleService.create({
  container: {
    ...LayoutStyle.mainAxis.center,
    ...LayoutStyle.crossAxis.flexEnd,
    padding: Sizing.t5,
  },
  content: {
    ...LayoutStyle.center,
    ...LayoutStyle.flex.full,
  },
  subtitle: {
    ...Typography.align.center,
    ...Typography.fontSize.base,
    ...Typography.fontWeight.bold,
    color: 'color-basic-500',
    marginTop: Sizing.t1,
  },
})
