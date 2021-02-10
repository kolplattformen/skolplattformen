import React from 'react'
import {StyleSheet, Image, View} from 'react-native'
import {
  Divider,
  List,
  ListItem,
  Icon,
  Text,
  Layout,
} from '@ui-kitten/components'
import {DateTime} from 'luxon'
import moment from 'moment'
import 'moment/locale/sv'

moment.locale('sv')

// is not as versatile as moment.calendar()
const displayDate = (date) =>
  DateTime.fromISO(date).toRelative({locale: 'sv', style: 'long'})

export const Calendar = ({calendar}) => {
  const renderItemIcon = (startDate, endDate) => (props) => (
    <Icon {...props} name={'calendar'} />
  )

  const renderItem = ({item}) => (
    <ListItem
      disabled={true}
      title={`${item.title}`}
      description={`${moment(item.startDate).fromNow()}`}
      accessoryLeft={renderItemIcon(item.startDate, item.endDate)}
    />
  )

  return !calendar?.length ? (
    <View style={{flex: 1}}>
      <Image
        source={require('../assets/girls.png')}
        style={{height: 200, width: '100%'}}
      />
      <Text category="h5">Det ser lite tomt ut i kalendern</Text>
    </View>
  ) : (
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
    width: '100%',
  },
  ongoing: {
    color: 'red',
  },
  normal: {
    color: 'black',
  },
})
