import { Card, Text } from '@ui-kitten/components'
import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'

export const Notification = ({ item }) => {
  const { api } = useApi()
  const cookie = api.getSessionCookie()
  const open = async () => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(item.url, {
          showTitle: true,
          enableBarCollapsing: true,
          enableUrlBarHiding: true,
          enableDefaultShare: false,        
          headers: { cookie }
        })
      } else {
        Alert.alert('Det gick inte att öppna webbläsaren.')
      }  
    } catch (error) {
      Alert.alert(`Ett fel inträffade när vi försökte öppna webbläsaren: ${error.message}`)
    }

  }

  const displayDate = DateTime.fromISO(item.dateCreated).toRelative({
    locale: 'sv',
  })

  return (
    <>
      <Card
        style={styles.card}
        onPress={open}
        header={(headerProps) => (
          <View {...headerProps}>
            <Text category="h6">{item.sender}</Text>
            <Text category="s1">
              {item.category ? item.category : ''}
              {item.category && displayDate ? ' ' : ''}
              {displayDate ? `(${displayDate})` : ''}
            </Text>
          </View>
        )}
      >
        <Text>{item.message}</Text>
      </Card>
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 2,
  },
})
