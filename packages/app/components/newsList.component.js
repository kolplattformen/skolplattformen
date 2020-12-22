import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, List, Text, Layout } from '@ui-kitten/components'
import { Image } from 'react-native-svg'
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
    </Card>
  )

  return (
    <Layout style={styles.topContainer} level='1'>
      <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={news}
        renderItem={renderItem} />
    </Layout>
  )
}


const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  contentContainer: {
    backgroundColor: 'transparent',
    paddingRight: 10
  }
});