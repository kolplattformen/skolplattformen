import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Divider, List, ListItem, Icon, Text, Layout} from '@ui-kitten/components';
import moment from 'moment'
import 'moment/locale/sv'  // without this line it didn't work
moment.locale('sv')

export const Calendar = ({calendar}) => {


  const renderItemIcon = (startDate, endDate) => 
    (props) => <Icon {...props} fill={moment(startDate).isBefore() && moment(endDate).isAfter() ? '#33f' : '#333'} name={moment(endDate || startDate).isBefore() ? 'calendar' : 'calendar-outline'}/>

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.title}`}
      description={`${moment(item.startDate).locale('sv').calendar()}`}
      accessoryLeft={renderItemIcon(item.startDate, item.endDate)}
    />
  )

  return (!calendar.length ?
    <View style={{flex: 1}}>
      <Image source={require('../assets/girls.png')} style={{height: 200, width: '100%'}}></Image>
      <Text category="h5">Det ser lite tomt ut i kalendern</Text>
    </View>
      :
    <List
      style={styles.container}
      data={calendar.sort((a, b) => b.startDate < a.startDate)}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  )
}

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