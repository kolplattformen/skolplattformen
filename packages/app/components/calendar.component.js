import { useCalendar } from '@skolplattformen/api-hooks'
import { Divider, Icon, List, ListItem, Text } from '@ui-kitten/components'
import moment from 'moment'
import 'moment/locale/sv'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useChild } from './childContext.component'

moment.locale('sv')

export const Calendar = ({ }) => {
  const child = useChild()
  const { data, status, reload } = useCalendar(child)
  const [refreshing, setRefreshing] = useState(status === 'loading')
  useEffect(() => {
    setRefreshing(status === 'loading')
  }, [status])

  const refresh = () => reload()

  const renderItemIcon = () => (props) => <Icon {...props} name={'calendar'} />

  const renderItem = ({ item }) => (
    <ListItem
      disabled={true}
      title={`${item.title}`}
      description={`${moment(item.startDate).fromNow()}`}
      accessoryLeft={renderItemIcon(item.startDate, item.endDate)}
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
        onRefresh={refresh}
        refreshing={refreshing}
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
