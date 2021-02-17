import { useNews, useNewsDetails } from '@skolplattformen/api-hooks'
import { List } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useChild } from './childContext.component'
import { NewsListItem } from './newsListItem.component'

export const NewsList = () => {
  const child = useChild()
  const { data, status, reload } = useNews(child)
  const [refreshing, setRefreshing] = useState(status === 'loading')
  useEffect(() => {
    setRefreshing(status === 'loading')
  }, [status])

  const refresh = () => reload()

  return (
    <List
      onRefresh={refresh}
      refreshing={refreshing}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={(info) => (
        <NewsListItem key={info.item.id} item={info.item} />
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    padding: 10,
  },
})
