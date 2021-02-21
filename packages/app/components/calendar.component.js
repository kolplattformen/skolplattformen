import { useCalendar } from '@skolplattformen/api-hooks'
import { Divider, List, ListItem, Text } from '@ui-kitten/components'
import moment from 'moment'
import 'moment/locale/sv'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useChild } from './childContext.component'
import { CalendarOutlineIcon } from './icon.component'

moment.locale('sv')

export const Calendar = () => {
  const child = useChild()
  const { data } = useCalendar(child)

  const renderItem = ({ item }) => (
    <ListItem
      disabled={true}
      title={`${item.title}`}
      description={`${moment(item.startDate).fromNow()}`}
      accessoryLeft={CalendarOutlineIcon}
    />
  )

  return !data?.length ? (
    <View style={styles.emptyState}>
      <Image
        source={require('../assets/girls.png')}
        style={styles.emptyStateImage}
      />
      <Text category="h5">Det ser lite tomt ut i kalendern</Text>
    </View>
  ) : (
    <List
      contentContainerStyle={styles.contentContainer}
      data={data.sort((a, b) => b.startDate < a.startDate)}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
      style={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
  },
  emptyStateImage: {
    height: 200,
    width: '100%',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    padding: 10,
  },
})
