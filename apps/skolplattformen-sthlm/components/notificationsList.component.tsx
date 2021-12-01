import { useNotifications } from '@skolplattformen/hooks'
import { List, StyleService, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { Sizing } from '../styles'
import { useChild } from './childContext.component'
import { Notification } from './notification.component'

export const NotificationsList = () => {
  const styles = useStyleSheet(themedStyles)
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

const themedStyles = StyleService.create({
  container: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: Sizing.t3,
    paddingVertical: Sizing.t3,
  },
})
