import { Card, Text } from '@ui-kitten/components'
import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ModalWebView } from './modalWebView.component'

export const Notification = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

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
      {isOpen && <ModalWebView url={item.url} onClose={close} />}
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 2,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 12,
  },
})
