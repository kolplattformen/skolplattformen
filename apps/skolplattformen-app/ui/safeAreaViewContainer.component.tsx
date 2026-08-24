import React, { PropsWithChildren } from 'react'
import { View, StyleSheet, Platform, StatusBar } from 'react-native'

/**
 * This view takes in account for the status bar current height on Android
 */
export const SafeAreaViewContainer: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  return <View style={styles.wrapper}>{children}</View>
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})
