import { Notification as NotificationType } from '@skolplattformen/embedded-api'
import { Card, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import { Layout, Sizing, Typography } from '../styles'
import { ModalWebView } from './modalWebView.component'
import moment from 'moment'

interface NotificationProps {
  item: NotificationType
}

export const Notification = ({ item }: NotificationProps) => {
  const styles = useStyleSheet(themedStyles)
  const [isOpen, setIsOpen] = React.useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const displayDate = item.dateCreated
    ? moment(item.dateCreated).fromNow()
    : null

  const sharedCookiesEnabled: boolean = Boolean(
    item.url && item.url.startsWith('https://start.unikum.net/')
  )

  return (
    <>
      <Card
        style={styles.card}
        onPress={open}
        header={(headerProps) => (
          <View {...headerProps}>
            <Text style={styles.title}>{item.sender}</Text>
            <Text style={styles.subtitle}>
              {item.category ? item.category : ''}
              {item.category && displayDate ? ' • ' : ''}
              {displayDate ? displayDate : ''}
            </Text>
          </View>
        )}
      >
        <Text>{item.message}</Text>
      </Card>
      {isOpen && (
        <ModalWebView
          url={item.url}
          onClose={close}
          sharedCookiesEnabled={sharedCookiesEnabled}
        />
      )}
    </>
  )
}

const themedStyles = StyleService.create({
  card: {
    ...Layout.flex.full,
    borderRadius: 2,

    borderWidth: 1,
    marginBottom: Sizing.t2,

    backgroundColor: 'background-basic-color-1',
    borderColor: 'border-basic-color-3',
  },
  title: {
    ...Typography.header,
    marginBottom: 2,
  },
  subtitle: {
    ...Typography.fontSize.xs,
    color: 'text-hint-color',
  },
})
