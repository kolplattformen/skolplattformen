import React from 'react'
import { StyleSheet } from 'react-native'
import { List } from '@ui-kitten/components'
import { NewsListItem } from './newsListItem.component'


export const NewsList = ({ news }) => {
  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={news}
      renderItem={(info) => (
        <NewsListItem key={info.item.id} item={info.item} />
      )} />
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  contentContainer: {
    alignItems: 'stretch',
    paddingRight: 10
  }
})