import { useNews } from '@skolplattformen/api-hooks'
import { List, useTheme } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useChild } from './childContext.component'
import { NewsListItem } from './newsListItem.component'
const theme = useTheme();

export const NewsList = () => {
  const child = useChild()
  const { data } = useNews(child)

  return (
    <>
      <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={data}
        renderItem={(info) => (
          <NewsListItem key={info.item.id} item={info.item} theme={theme} />
        )}
      />
    </>
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
