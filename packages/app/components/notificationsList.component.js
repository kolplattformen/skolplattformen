import React from 'react'
import { StyleSheet } from 'react-native'
import { List } from '@ui-kitten/components'
import { Notification } from './notification.component'


export const NotificationsList = ({ notifications, status }) => {
  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={notifications}
      renderItem={(info) => (
        <Notification key={info.item.id} item={info.item} />
      )} />
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  contentContainer: {
    alignItems: 'stretch',
    paddingRight: 10,
    paddingBottom: 330
  }
})
