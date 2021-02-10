import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Card, Text } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { Image } from './image.component'

export const NewsListItem = ({ item }) => {
  const navigation = useNavigation()

  return (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('NewsItem', { newsItem: item })}
      header={(headerProps) => (
        <View {...headerProps}>
          <Text category="h6">{item.header}</Text>
          <Text category="s1">Skolplattformen</Text>
        </View>
      )}>
      <Image
        src={item.fullImageUrl}
        style={{ height: 300 }}
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 2,
  },
})
