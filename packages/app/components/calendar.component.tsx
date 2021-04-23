import { useCalendar } from '@skolplattformen/api-hooks'
import { CalendarItem } from '@skolplattformen/embedded-api'
import { Divider, List, ListItem, Text } from '@ui-kitten/components'
import moment from 'moment'
import React from 'react'
import { Image, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import { Colors, Typography } from '../styles'
import { useChild } from './childContext.component'
import { CalendarOutlineIcon } from './icon.component'
import { SaveToCalendar } from './saveToCalendar.component'

export const Calendar = () => {
  const child = useChild()
  const { data } = useCalendar(child)

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
      data={data.sort((a, b) =>
        a.startDate && b.startDate ? a.startDate.localeCompare(b.startDate) : 0
      )}
      ItemSeparatorComponent={Divider}
      renderItem={({ item }: ListRenderItemInfo<CalendarItem>) => (
        <ListItem
          disabled={true}
          title={`${item.title}`}
          description={(props) => (
            <Text style={[props?.style, styles.description]}>
              {`${moment(item.startDate).format('YYYY-MM-DD')} (${moment(
                item.startDate
              ).fromNow()})`}
            </Text>
          )}
          accessoryLeft={CalendarOutlineIcon}
          accessoryRight={() => <SaveToCalendar event={item} />}
        />
      )}
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
  description: {
    ...Typography.fontSize.xs,
    color: Colors.neutral.gray500,
  },
})
