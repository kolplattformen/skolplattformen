import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, List, ListItem, Icon, Text} from '@ui-kitten/components';
import moment from 'moment'

export const Calendar = ({calendar}) => {

  const parseMoment = (date) => moment(date, 'YYYY-MM-DD hh:mm')

  const renderItemIcon = (startDate, endDate) => 
    (props) => <Icon {...props} fill={parseMoment(startDate).isBefore() && parseMoment(endDate).isAfter() ? '#33f' : '#333'} name={parseMoment(endDate || startDate).isBefore() ? 'calendar' : 'calendar-outline'}/>

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.title}`}
      description={`${moment(item.startDate).calendar()}`}
      accessoryLeft={renderItemIcon(item.startDate, item.endDate)}
    />
  );


  return (
    <List
      style={styles.container}
      data={calendar.sort((a, b) => b.startDate < a.startDate)}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  ongoing: {
    color: 'red'
  },
  normal: {
    color: 'black'
  }
});