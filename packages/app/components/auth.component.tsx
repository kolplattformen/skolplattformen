import { StackNavigationProp } from '@react-navigation/stack'
import {
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components'
import React from 'react'
import {
  Image,
  ImageStyle,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { NativeStackNavigationOptions } from 'react-native-screens/native-stack'
import { LanguageService } from '../services/languageService'
import { Layout as LayoutStyle, Sizing, Typography } from '../styles'
import { fontSize } from '../styles/typography'
import { KeyboardAvoidingView } from '../ui/keyboardAvoidingView.component'
import { SafeAreaView } from '../ui/safeAreaView.component'
import { SafeAreaViewContainer } from '../ui/safeAreaViewContainer.component'
import { languages, translate } from '../utils/translation'
import { GlobeIcon } from './icon.component'
import { Login } from './login.component'
import { RootStackParamList } from './navigation.component'

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

export const authRouteOptions = (): NativeStackNavigationOptions => {
  return {
    headerShown: false,
    replaceAnimation: 'push',
    stackAnimation: 'fade',
  }
}

export const Auth: React.FC<AuthProps> = ({ navigation }) => {
  const styles = useStyleSheet(themeStyles)
  const colors = useTheme()

  const currentLanguage = LanguageService.getLanguageCode()
  const currentLanguageName = languages.find(
    (language) => language.langCode === currentLanguage
  )?.languageLocalName

  return (
    <SafeAreaView>
      <SafeAreaViewContainer>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={LayoutStyle.flex.full}>
            <TouchableWithoutFeedback
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              onPress={() => navigation.navigate('SetLanguage')}
              accessibilityHint={translate(
                'auth.a11y_navigate_to_change_language',
                {
                  defaultValue: 'Navigerar till vyn för att byta språk',
                }
              )}
              accessibilityLabel={translate('auth.a11y_change_language', {
                defaultValue: 'Byt språk',
              })}
            >
              <View style={styles.language}>
                <GlobeIcon
                  height={24}
                  width={24}
                  fill={colors['color-primary-500']}
                />
                <Text style={styles.languageText}>{currentLanguageName}</Text>
              </View>
            </TouchableWithoutFeedback>
            <KeyboardAvoidingView>
              <View style={styles.content}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={require('../assets/boys.png')}
                    style={styles.image as ImageStyle}
                    accessibilityHint={translate('login.a11y_image_two_boys', {
                      defaultValue: 'Bild på två personer som kollar i mobilen',
                    })}
                    resizeMode="contain"
                    accessibilityIgnoresInvertColors={false}
                  />
                </View>
                <View style={styles.container}>
                  <Text
                    category="h1"
                    style={styles.header}
                    adjustsFontSizeToFit
                    numberOfLines={2}
                  >
                    Öppna skolplattformen
                  </Text>
                  <Login />
                  <Text category="c2" style={styles.subtitle}>
                    {translate('auth.subtitle', {
                      word: randomWord(),
                    })}
                  </Text>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaViewContainer>
    </SafeAreaView>
  )
}

const themeStyles = StyleService.create({
  container: {
    ...LayoutStyle.mainAxis.flexStart,
    ...LayoutStyle.crossAxis.flexEnd,
    padding: Sizing.t6,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    ...Sizing.aspectRatio(1.5, Sizing.Ratio['4:3']),
  },
  content: {
    ...LayoutStyle.flex.full,
  },
  header: {
    width: '100%',
    marginBottom: Sizing.t5,
    fontFamily: 'Poppins-Black',
    fontWeight: '900',
  },
  subtitle: {
    width: '100%',
    textAlign: 'center',
    ...Typography.fontSize.xs,
    marginTop: Sizing.t5,
  },
  language: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Sizing.t4,
  },
  languageText: {
    ...fontSize.xs,
    marginLeft: Sizing.t1,
  },
})
