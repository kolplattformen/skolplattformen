import { useCalendar } from '@skolplattformen/api-hooks'
import { Divider, List, ListItem, Text } from '@ui-kitten/components'
import moment from 'moment'
import 'moment/locale/sv'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useChild } from './childContext.component'
import { CalendarOutlineIcon } from './icon.component'
import { SaveToCalendar } from './saveToCalendar.component'

moment.locale('sv')

export const Calendar = () => {
  const child = useChild()
  const { data } = useCalendar(child)
  const [selected, setSelected] = React.useState()

  const renderItem = ({ item }) => (
    <ListItem
      disabled={true}
      title={`${item.title}`}
      description={`${moment(item.startDate).fromNow()}`}
      accessoryLeft={CalendarOutlineIcon}
      accessoryRight={() => <SaveToCalendar event={item} />}
    />
  )

  return !data?.length ? (
    <View style={{ flex: 1 }}>
      <Image
        source={require('../assets/girls.png')}
        style={{ height: 200, width: '100%' }}
      />
      <Text category="h5">Det ser lite tomt ut i kalendern</Text>
    </View>
  ) : (
    <List
      style={styles.container}
      data={data.sort((a, b) => b.startDate < a.startDate)}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    padding: 10,
  },
  ongoing: {
    color: 'red',
  },
  normal: {
    color: 'black',
  },
})
