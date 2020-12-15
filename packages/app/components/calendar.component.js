import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, List, ListItem, Icon, Text} from '@ui-kitten/components';

export const Calendar = ({calendar}) => {

  const renderItemIcon = (props) => (
    <Icon {...props} name='calendar-outline'/>
  );

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.title}`}
      description={`${item.startDate}`}
      accessoryLeft={renderItemIcon}
    />
  );


  return (
    <List
      style={styles.container}
      data={calendar}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
    width: "100%"
  },
});