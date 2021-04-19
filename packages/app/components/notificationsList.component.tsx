import { useNotifications } from '@skolplattformen/api-hooks'
import { List, useTheme } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useChild } from './childContext.component'
import { Notification } from './notification.component'

export const NotificationsList = () => {
  const child = useChild()
  const { data } = useNotifications(child)
  const theme = useTheme();
  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={(info) => (
        <Notification key={info.item.id} item={info.item} theme={theme} />
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
