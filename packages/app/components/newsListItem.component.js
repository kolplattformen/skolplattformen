import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Card, Text } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { Image } from './image.component'
import { useChild } from './childContext.component'
import { DateTime } from 'luxon'

const displayDate = (date) =>
  DateTime.fromISO(date).toRelative({ locale: 'sv', style: 'long' })

export const NewsListItem = ({ item }) => {
  const navigation = useNavigation()
  const child = useChild()

  return (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('NewsItem', { newsItem: item, child })}
      header={(headerProps) => (
        <View {...headerProps}>
          <Text category="h6">{item.header}</Text>
          <Text category="s1">
            {displayDate(item.published || item.modified)}
          </Text>
        </View>
      )}
    >
      <Image src={item.fullImageUrl} style={styles.image} />
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 2,
  },
  image: {
    height: 300,
  },
})
