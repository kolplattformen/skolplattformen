import { Notification as NotificationType } from '@skolplattformen/embedded-api'
import { Card, Text, useTheme } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors, Layout, Sizing, Typography } from '../styles'
import { ModalWebView } from './modalWebView.component'
import moment from 'moment'

interface NotificationProps {
  item: NotificationType
}

export const Notification = ({ item }: NotificationProps) => {
  const theme = useTheme()
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
        style={[
          styles.card,
          {
            backgroundColor: theme['background-basic-color-1'],
            borderColor: theme['border-basic-color-3'],
          },
        ]}
        onPress={open}
        header={(headerProps) => (
          <View {...headerProps}>
            <Text style={styles.title}>{item.sender}</Text>
            <Text
              style={[styles.subtitle, { color: theme['text-hint-color'] }]}
            >
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

const styles = StyleSheet.create({
  card: {
    ...Layout.flex.full,
    borderRadius: 2,
    borderColor: Colors.neutral.gray200,
    borderWidth: 1,
    marginBottom: Sizing.t2,
  },
  title: {
    ...Typography.header,
    marginBottom: Sizing.t1,
  },
  subtitle: {
    ...Typography.fontSize.xs,
    color: Colors.neutral.gray600,
  },
})
