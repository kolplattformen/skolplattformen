import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components'
import React from 'react'
import { Keyboard, TouchableWithoutFeedback, View, Image } from 'react-native'
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
                      defaultValue: 'Navigerar till vyn för att byta språk',
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
                <Image
                  source={require('../assets/boys.png')}
                  // @ts-expect-error Don't know why this occurs
                  style={styles.image}
                  accessibilityHint={translate('login.a11y_image_two_boys', {
                    defaultValue: 'Bild på två personer som kollar i mobilen',
                  })}
                  accessibilityIgnoresInvertColors={false}
                />
              <Layout style={styles.container}>
                <Text category="h5" style={styles.header} adjustsFontSizeToFit numberOfLines={2}>
                  {translate('general.title')}
                </Text>
                <Login />
                <Text category="c2" style={styles.subtitle}>
                  {translate('auth.subtitle', {
                    word: randomWord(),
                  })}
                </Text>
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
    ...LayoutStyle.mainAxis.flexStart,
    ...LayoutStyle.crossAxis.flexEnd,
    padding: Sizing.t6,
  },
  image: {
    ...Sizing.aspectRatio(1.7, Sizing.Ratio['4:3']),
    marginLeft: '-17%',
  },
  content: {
    ...LayoutStyle.flex.full,
  },
  header: {
    width: '50%',
    marginBottom: Sizing.t5,
  },
  subtitle: {
    width: '100%',
    textAlign: 'center',
    ...Typography.fontSize.xs,
    color: 'color-basic-800',
    marginTop: Sizing.t5,
  },
})
