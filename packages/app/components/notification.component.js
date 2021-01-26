import React, { useState } from 'react'
import { Card, Text } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { ModalWebView } from './modalWebView.component'

export const Notification = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <>
      <Card
        style={styles.card}
        onPress={open}
        header={(headerProps) => (
          <View {...headerProps} >
            <Text category='h6'>{item.sender}</Text>
            {item.category && (
              <Text category='s1'>{item.category}</Text>
            )}
            <Text>{item.message}</Text>
          </View>
        )}>
      </Card>
      {isOpen && (
        <ModalWebView url={item.url} onClose={close} />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 2,
  },
})
