import {MenuItem} from '../libs/api/lib';
import {useMenu} from '../libs/hooks/src';
import {
  Divider,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import 'moment/locale/sv';
import React from 'react';
import {
  Image,
  ImageStyle,
  ListRenderItemInfo,
  RefreshControl,
  View,
} from 'react-native';
import {Layout as LayoutStyle, Sizing, Typography} from '../styles';
import {translate} from '../utils/translation';
import {useChild} from './childContext.component';
import {MenuListItem} from './menuListItem.component';

// const translate = (key: string) => key;

export const Menu = () => {
  const styles = useStyleSheet(themedStyles);
  const child = useChild();
  const {data, status, reload} = useMenu(child);

  return (
    <List
      contentContainerStyle={styles.contentContainer}
      data={data}
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text category="h4">{translate('menu.emptyHeadline')}</Text>
          <Text style={styles.emptyStateDescription}>
            {translate('menu.emptyText')}
          </Text>
          <Image
            accessibilityIgnoresInvertColors={false}
            source={require('../assets/children.png')}
            style={styles.emptyStateImage as ImageStyle}
          />
        </View>
      }
      renderItem={({item}: ListRenderItemInfo<MenuItem>) => (
        <MenuListItem key={item.title} item={item} />
      )}
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={status === 'loading'} onRefresh={reload} />
      }
    />
  );
};

const themedStyles = StyleService.create({
  container: {
    height: '100%',
    width: '100%',
    padding: Sizing.t3,
  },
  contentContainer: {
    paddingHorizontal: Sizing.t5,
    paddingVertical: Sizing.t2,
    backgroundColor: 'background-basic-color-1',
    borderRadius: 25,
  },
  emptyState: {
    ...LayoutStyle.center,
    ...LayoutStyle.flex.full,
  },
  emptyStateDescription: {
    ...Typography.align.center,
    lineHeight: 21,
    paddingHorizontal: Sizing.t3,
    marginTop: Sizing.t3,
  },
  emptyStateImage: {
    ...Sizing.aspectRatio(0.8),
    marginTop: 50,
  },
});
