import { Notification as NotificationType } from '@skolplattformen/embedded-api'
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
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
      <TouchableOpacity onPress={open}>
        <View style={styles.card}>
          <View>
            <Text style={styles.title}>{item.sender}</Text>
            <Text style={styles.subtitle}>
              {item.category ? item.category : ''}
              {item.category && displayDate ? ' • ' : ''}
              {displayDate ? displayDate : ''}
            </Text>
          </View>
          <Text>{item.message}</Text>
        </View>
      </TouchableOpacity>
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
    paddingVertical: Sizing.t3,
  },
  title: {
    ...Typography.header,
    marginBottom: Sizing.t1,
  },
  subtitle: {
    ...Typography.fontSize.xs,
    color: 'text-hint-color',
    marginBottom: Sizing.t2,
  },
})
