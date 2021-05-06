import { StyleService, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { SafeAreaView as RNSafeAreaView, ViewProps } from 'react-native'
import { Layout } from '../styles'

export const SafeAreaView: React.FC<ViewProps> = ({ children }) => {
  const styles = useStyleSheet(themedStyles)

  return <RNSafeAreaView style={styles.safeArea}>{children}</RNSafeAreaView>
}

const themedStyles = StyleService.create({
  safeArea: {
    ...Layout.flex.full,
    backgroundColor: 'background-basic-color-1',
  },
})
