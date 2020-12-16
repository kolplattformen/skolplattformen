import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, List, Text, Layout } from '@ui-kitten/components'
import Markdown from 'react-native-markdown-display'
import { Image } from 'react-native-svg'


export const NewsList = ({news}) => {

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps} >
      <Text category='h6'>{info.item.header}</Text>
      <Text category='s1'>By Wikipedia</Text>
    </View>
  )

  const renderItem = (info) => (
    <Card
      style={styles.card}
      header={headerProps => renderItemHeader(headerProps, info)}>
      <Markdown style={{ body: {color: 'black', fontSize: 15}, heading1: {color: 'black'} }}>
        {decodeURIComponent(info.item.body)}
      </Markdown>
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
});