import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useApi } from '@skolplattformen/react-native-embedded-api'
import { Card, Text } from '@ui-kitten/components'
import { StyleSheet, View, Image } from 'react-native'

export const NewsListItem = ({ item }) => {
  const navigation = useNavigation()
  const { cookie } = useApi()

  return (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('NewsItem', { newsItem: item })}
      header={(headerProps) => (
        <View {...headerProps} >
          <Text category='h6'>{item.header}</Text>
          <Text category='s1'>Publicerad på Skolplattformen</Text>
        </View>
      )}>
      <Image
        source={{ uri: item.fullImageUrl, headers: { cookie } }}
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
