import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { Divider, List, ListItem, Icon, Text, Layout } from '@ui-kitten/components'
import { DateTime } from 'luxon'

export const Calendar = ({ calendar }) => {
  const renderItemIcon = (startDate, endDate) =>
    (props) => <Icon {...props} name={'calendar'} />

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.title}`}
      description={`${item.startDate}`}
      accessoryLeft={renderItemIcon(item.startDate, item.endDate)}
    />
  )

  return (!calendar?.length
    ? <View style={{ flex: 1 }}>
      <Image source={require('../assets/girls.png')} style={{ height: 200, width: '100%' }} />
      <Text category='h5'>Det ser lite tomt ut i kalendern</Text>
    </View>
    : <List
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
    paddingBottom: 330,
  },
  ongoing: {
    color: 'red'
  },
  normal: {
    color: 'black'
  }
})
