import { useApi } from '@skolplattformen/api-hooks'
import { Layout, Text } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import { Login } from './login.component'
import { Logout } from './logout.component'

const funArguments = [
  'öppna',
  'roliga',
  'fungerande',
  'billiga',
  'snabba',
  'fria',
  'efterlängtade',
  'coolare',
  'första',
  'upplysta',
  'hemmagjorda',
  'bättre',
  'rebelliska',
  'enkla',
  'operfekta',
  'fantastiska',
  'agila',
]

export const Auth = (props) => {
  const { isLoggedIn } = useApi()
  const [argument, setArgument] = useState('')

  useEffect(() => {
    const argNum = Math.floor(Math.random() * funArguments.length)
    setArgument(funArguments[argNum])
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          <Layout style={styles.container}>
            <Text category="h2" adjustsFontSizeToFit numberOfLines={1}>
              Öppna Skolplattformen
            </Text>
            <Text category="h6" style={styles.subtitle}>
              Det {argument} alternativet
            </Text>
            {isLoggedIn ? <Logout {...props} /> : <Login {...props} />}
          </Layout>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  subtitle: {
    color: '#9CA3AF',
    marginTop: 4,
    marginBottom: 32,
    textAlign: 'center',
  },
})
