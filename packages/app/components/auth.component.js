import { useApi } from '@skolplattformen/api-hooks'
import { Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Children } from './children.component'
import { Login } from './login.component'

const funArguments = [
  'agila',
  'billiga',
  'bättre',
  'coolare',
  'efterlängtade',
  'enkla',
  'fantastiska',
  'fria',
  'fungerande',
  'första',
  'hemmagjorda',
  'operfekta',
  'rebelliska',
  'roliga',
  'snabba',
  'upplysta',
  'öppna',
]

export const Auth = (props) => {
  const { isLoggedIn } = useApi()
  const [argument] = useState(() => {
    const argNum = Math.floor(Math.random() * funArguments.length)
    return funArguments[argNum]
  })

  return isLoggedIn ? (
    <Children />
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <Layout style={styles.container}>
              <Text category="h2" adjustsFontSizeToFit numberOfLines={1}>
                Öppna Skolplattformen
              </Text>
              <Text category="h6" style={styles.subtitle}>
                Det {argument} alternativet
              </Text>
              <Login {...props} />
            </Layout>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
})
