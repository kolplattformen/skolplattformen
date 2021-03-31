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
import { Login } from './login.component'
import { Colors, Layout as LayoutStyle, Sizing, Typography } from '../styles'

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

export const Auth = () => {
  const [argument] = useState(() => {
    const argNum = Math.floor(Math.random() * funArguments.length)
    return funArguments[argNum]
  })

  return (
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
              <Login />
            </Layout>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: { ...LayoutStyle.flex.full },
  safeArea: {
    ...LayoutStyle.flex.full,
    backgroundColor: Colors.neutral.white,
  },
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
    color: '#9CA3AF',
    marginTop: Sizing.t1,
  },
})
