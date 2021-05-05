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
import { translate } from '../utils/translation'
import { GlobeIcon } from './icon.component'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from './navigation.component'
import { SafeAreaView } from '../ui/safeAreaView.component'
import { KeyboardAvoidingView } from '../ui/keyboardAvoidingView.component'

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

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <SafeAreaViewContainer>
            <TopNavigation
              alignment="center"
              accessoryRight={() => (
                <TopNavigationAction
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
                <Text category="h6" style={styles.subtitle}>
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
    color: 'text-hint-color',
    marginTop: Sizing.t1,
  },
})
