import React, { useMemo, useState } from 'react'
import { useNews } from '@skolplattformen/api-hooks'
import {
  Divider,
  Input,
  List,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components'
import { TouchableWithoutFeedback } from 'react-native'
import { Sizing } from '../styles'
import {
  renderSearchResultPreview,
  useNewsListSearchResults,
} from '../utils/search'
import { translate } from '../utils/translation'
import { useChild } from './childContext.component'
import { CloseOutlineIcon, SearchIcon } from './icon.component'
import { NewsListItem } from './newsListItem.component'

export const NewsList = () => {
  const styles = useStyleSheet(themedStyles)
  const child = useChild()
  const { data } = useNews(child)

  const [searchQuery, setSearchQuery] = useState('')
  const searchResults = useNewsListSearchResults(searchQuery)

  const header = useMemo(
    () => (
      <Input
        accessibilityHint={translate('news.search.placeholder', {
          defaultValue: 'Sök alla nyheter...',
        })}
        placeholder={translate('news.search.placeholder', {
          defaultValue: 'Sök alla nyheter...',
        })}
        returnKeyType="search"
        status="basic"
        accessoryLeft={SearchIcon}
        onChangeText={setSearchQuery}
        value={searchQuery}
        accessoryRight={(props) => (
          <TouchableWithoutFeedback onPress={() => setSearchQuery('')}>
            <CloseOutlineIcon {...props} />
          </TouchableWithoutFeedback>
        )}
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
      ItemSeparatorComponent={Divider}
      renderItem={({ item }) => <NewsListItem key={item.id} item={item} />}
    />
  )
}

const themedStyles = StyleService.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'background-basic-color-1',
  },
  contentContainer: {
    paddingHorizontal: Sizing.t5,
  },
})
