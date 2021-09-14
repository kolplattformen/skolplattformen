import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import { fontSize } from '../styles/typography'

export type TabBarLabelProps = {
  label: string
  focused: boolean
}

export const TabBarLabel = ({ label, focused }: TabBarLabelProps) => {
  const styles = useStyleSheet(themedStyles)

  return (
    <View>
      <Text
        style={[styles.label, focused ? styles.focused : null]}
        maxFontSizeMultiplier={2}
      >
        {label}
      </Text>
    </View>
  )
}

const themedStyles = StyleService.create({
  label: {
    fontWeight: '600',
    color: 'color-tab-default',
    ...fontSize.xxs,
  },
  focused: {
    color: 'color-tab-focused',
  },
})
