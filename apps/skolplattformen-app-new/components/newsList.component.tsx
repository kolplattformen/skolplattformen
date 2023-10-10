import {useNews} from '../libs/hooks/src';
import {Input, List, StyleService, useStyleSheet} from '@ui-kitten/components';
import React, {useMemo, useState} from 'react';
import {TouchableOpacity, View, RefreshControl} from 'react-native';
import {Sizing} from '../styles';
import {
  renderSearchResultPreview,
  useNewsListSearchResults,
} from '../utils/search';
import {translate} from '../utils/translation';
import {useChild} from './childContext.component';
import {CloseOutlineIcon, SearchIcon} from './icon.component';
import {NewsListItem} from './newsListItem.component';

// const translate = (key: string) => key;

export const NewsList = () => {
  const styles = useStyleSheet(themedStyles);
  const child = useChild();
  const {data, status, reload} = useNews(child);

  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useNewsListSearchResults(searchQuery);

  const header = useMemo(
    () => (
      <Input
        accessibilityHint={translate(
          'news.search.placeholder',
          // {
          //   defaultValue: 'Sök alla nyheter...',
          // }
        )}
        placeholder={translate(
          'news.search.placeholder',
          // {
          //   defaultValue: 'Sök alla nyheter...',
          // }
        )}
        returnKeyType="search"
        status="basic"
        accessoryLeft={SearchIcon}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.search}
        accessoryRight={props =>
          searchQuery.length > 0 ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <CloseOutlineIcon {...props} />
            </TouchableOpacity>
          ) : (
            <View />
          )
        }
      />
    ),
    [searchQuery, styles.search],
  );

  if (searchQuery) {
    return (
      <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardDismissMode="on-drag"
        data={searchResults}
        ListHeaderComponent={header}
        renderItem={({item: searchResult}) => (
          <NewsListItem key={searchResult.item.id} item={searchResult.item}>
            {renderSearchResultPreview(searchResult)}
          </NewsListItem>
        )}
        refreshControl={
          <RefreshControl
            refreshing={status === 'loading'}
            onRefresh={reload}
            tintColor={'color-basic-100'}
          />
        }
      />
    );
  }

  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardDismissMode="on-drag"
      data={data}
      ListHeaderComponent={header}
      renderItem={({item}) => <NewsListItem key={item.id} item={item} />}
      refreshControl={
        <RefreshControl
          refreshing={status === 'loading'}
          onRefresh={reload}
          tintColor={'color-basic-100'}
        />
      }
    />
  );
};

const themedStyles = StyleService.create({
  container: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    paddingVertical: Sizing.t3,
    paddingHorizontal: Sizing.t3,
  },
  search: {
    backgroundColor: 'background-basic-color-1',
    borderRadius: 40,
    marginBottom: Sizing.t2,
  },
});
