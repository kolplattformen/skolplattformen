import { Text } from '@ui-kitten/components'
import Constants from 'expo-constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export const VersionInfo = () => {
  const version = Constants.expoConfig?.version ?? ''
  const build =
    Constants.expoConfig?.ios?.buildNumber ??
    Constants.expoConfig?.android?.versionCode?.toString() ??
    ''
  return (
    <View style={styles.container}>
      <Text>
        v{version} ({build})
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
})
