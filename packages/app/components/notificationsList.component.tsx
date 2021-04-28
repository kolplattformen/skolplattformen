import { useNotifications } from '@skolplattformen/api-hooks'
import { List } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Sizing } from '../styles'
import { useChild } from './childContext.component'
import { Notification } from './notification.component'

export const NotificationsList = () => {
  const child = useChild()
  const { data } = useNotifications(child)

  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
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
    padding: Sizing.t3,
  },
})
