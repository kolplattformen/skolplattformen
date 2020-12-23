import React from 'react'
import { SafeAreaView, StyleSheet, View, Image } from 'react-native'
import { Card, List, Text, Layout } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'


export const NewsList = ({news}) => {
  const navigation = useNavigation()

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps} >
      <Text category='h6'>{info.item.header}</Text>
      <Text category='s1'>Publicerad på Skolplattformen</Text>
    </View>
  )

  const renderItem = (info) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('NewsItem', {newsItem: info.item})}
      header={headerProps => renderItemHeader(headerProps, info)}>
        <Image source={{ uri: `https://etjanst.stockholm.se/Vardnadshavare/inloggad2/NewsBanner?url=${info.item.imageUrl}`}} style={{height: 300}}></Image>
    </Card>
  )

  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={news}
      renderItem={renderItem} />
  )
}


const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 2,
  },
  contentContainer: {
    paddingRight: 10,
    paddingBottom: 330
  }
});