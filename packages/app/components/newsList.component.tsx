import React, { useState, useMemo } from 'react'
import { useNews } from '@skolplattformen/api-hooks'
import { List, Input } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { useChild } from './childContext.component'
import { NewsListItem } from './newsListItem.component'
import { translate } from '../utils/translation'
import {
  useNewsListSearchResults,
  renderSearchResultPreview,
} from '../utils/search'
import { SearchIcon } from './icon.component'

export const NewsList = () => {
  const child = useChild()
  const { data } = useNews(child)

  const [searchQuery, setSearchQuery] = useState('')
  const searchResults = useNewsListSearchResults(searchQuery)

  const header = useMemo(
    () => (
      <Input
        accessibilityLabel={translate('news.search.placeholder')}
        placeholder={translate('news.search.placeholder')}
        returnKeyType="search"
        status="basic"
        accessoryLeft={SearchIcon}
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    ),
    [searchQuery]
  )

  if (searchQuery) {
    return (
      <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardDismissMode="on-drag"
        data={searchResults}
        ListHeaderComponent={header}
        renderItem={({ item: searchResult }) => (
          <NewsListItem key={searchResult.item.id} item={searchResult.item}>
            {renderSearchResultPreview(searchResult)}
          </NewsListItem>
        )}
      />
    )
  }

  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardDismissMode="on-drag"
      data={data}
      ListHeaderComponent={header}
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
