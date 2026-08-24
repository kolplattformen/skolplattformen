import { StyleService, useStyleSheet } from '@ui-kitten/components'
import React, { PropsWithChildren } from 'react'
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Layout } from '../styles'

export const KeyboardAvoidingView: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const styles = useStyleSheet(themedStyles)

  return (
    <RNKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      {children}
    </RNKeyboardAvoidingView>
  )
}

const themedStyles = StyleService.create({
  keyboardAvoidingView: {
    ...Layout.flex.full,
  },
})
