import React, {useState} from 'react'
import {Card, Text} from '@ui-kitten/components'
import {StyleSheet, View} from 'react-native'
import {ModalWebView} from './modalWebView.component'
import {DateTime} from 'luxon'

export const Notification = ({item}) => {
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
            <Text category="h6">{item.sender}</Text>
            <Text category="s1">
              {item.category ? `${item.category} ` : ''}({displayDate})
            </Text>
          </View>
        )}>
        <Text>{item.message}</Text>
      </Card>
      {isOpen && <ModalWebView url={item.url} onClose={close} />}
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 2,
  },
})
