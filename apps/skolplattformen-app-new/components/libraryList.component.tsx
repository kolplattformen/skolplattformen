import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {Library} from 'libraries.json';
import React, {useCallback} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {Layout as LayoutStyle, Sizing} from '../styles';
import {LibraryListItem} from './libraryListItem.component';
import {SettingListSeparator} from './settingsComponents.component';

export const LibraryList = ({libraries}: {libraries: Library[]}) => {
  const styles = useStyleSheet(themedStyles);
  const renderItem = useCallback(
    ({item: library}: ListRenderItemInfo<Library>) => (
      <LibraryListItem library={library} />
    ),
    [],
  );

  const keyExtractor = useCallback((library: Library) => {
    return `${library.libraryName}:${library.version}`;
  }, []);

  return (
    <FlatList
      data={libraries}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={SettingListSeparator}
      style={styles.list}
      contentContainerStyle={styles.container}
      initialNumToRender={15}
    />
  );
};

const themedStyles = StyleService.create({
  list: {
    ...LayoutStyle.flex.full,
    paddingHorizontal: Sizing.t4,
    marginBottom: Sizing.t5,
  },
  container: {
    borderRadius: 15,
    backgroundColor: 'background-basic-color-1',
    overflow: 'hidden',
  },
});
