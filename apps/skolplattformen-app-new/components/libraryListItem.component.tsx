import {NavigationProp, useNavigation} from '@react-navigation/core';
import {StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import {Library} from 'libraries.json';
import React from 'react';
import {Platform, View} from 'react-native';
import {fontSize} from '../styles/typography';
import {RootStackParamList} from './navigation.component';
import {SettingListItem} from './settingsComponents.component';

export const LibraryListItem = ({library}: {library: Library}) => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <SettingListItem
      onNavigate={() => navigation.navigate('Library', {library})}>
      <View style={styles.container}>
        <Text style={styles.name}>{library.libraryName}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.version}>v{library.version}</Text>
          <Text style={styles.license}>
            {library._license?.toString() ?? 'Unknown'}
          </Text>
        </View>
      </View>
    </SettingListItem>
  );
};

const themedStyles = StyleService.create({
  container: {},
  name: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontWeight: '700',
  },
  license: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontWeight: '700',
    marginLeft: 10,
    color: 'text-hint-color',
    ...fontSize.sm,
  },
  version: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    minWidth: 55,
    fontWeight: '700',
    color: 'text-hint-color',
    ...fontSize.sm,
  },
  bottomRow: {
    marginTop: 4,
    flexDirection: 'row',
  },
});
