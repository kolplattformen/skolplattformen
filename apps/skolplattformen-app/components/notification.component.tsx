import { Notification as NotificationType } from '@skolplattformen/api'
import { Box, Card, Text } from '@skolplattformen/design-system'
import moment from 'moment'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ModalWebView } from './modalWebView.component'
interface NotificationProps {
  item: NotificationType
}

export const Notification = ({ item }: NotificationProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const date = item.dateModified || item.dateCreated
  const displayDate = date ? moment(date).fromNow() : null

  const sharedCookiesEnabled = Boolean(
    item.url &&
      (item.url.startsWith('https://start.unikum.net/') ||
        item.url.startsWith('https://hjarntorget.goteborg.se'))
  )

  return (
    <>
      <Box mb="m">
        <TouchableOpacity onPress={open}>
          <Card>
            <Text variant="listItemTitle">{item.sender}</Text>
            <Text variant="listItemSubTitle">
              {item.category ?? ''}
              {item.category && displayDate ? ' • ' : ''}
              {displayDate ?? ''}
            </Text>
            <Text>{item.message}</Text>
          </Card>
        </TouchableOpacity>
      </Box>
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
