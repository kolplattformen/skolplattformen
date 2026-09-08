import { Text } from '@ui-kitten/components'
import Constants from 'expo-constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export const VersionInfo = () => {
  const version = Constants.expoConfig?.version || '1.0.0'
  const buildNumber =
    Constants.expoConfig?.ios?.buildNumber ||
    Constants.expoConfig?.android?.versionCode?.toString() ||
    '1'

  return (
    <View style={styles.container}>
      <Text>
        v{version} ({buildNumber})
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
})
