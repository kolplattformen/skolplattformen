import {MenuItem} from '../libs/api/lib';
import {StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {Sizing, Typography} from '../styles';

interface MenuListItemProps {
  item: MenuItem;
}

export const MenuListItem = ({item}: MenuListItemProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text category="p1">{item.description}</Text>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    width: '100%',
    paddingVertical: Sizing.t3,
  },
  topContainer: {
    margin: Sizing.t1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    ...Typography.header,
    marginBottom: Sizing.t1,
  },
});
