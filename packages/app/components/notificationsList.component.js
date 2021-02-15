import { List } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Notification } from './notification.component'

export const NotificationsList = ({ notifications }) => {
  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={notifications}
      renderItem={(info) => (
        <Notification key={info.item.id} item={info.item} />
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    padding: 10,
  },
})
