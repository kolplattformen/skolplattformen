import { useCalendar } from '@skolplattformen/api-hooks'
import { CalendarItem } from '@skolplattformen/embedded-api'
import {
  Divider,
  List,
  ListItem,
  Text,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components'
import moment from 'moment'
import React from 'react'
import { ListRenderItemInfo, View } from 'react-native'
import { Typography } from '../styles'
import { useChild } from './childContext.component'
import { CalendarOutlineIcon } from './icon.component'
import { SaveToCalendar } from './saveToCalendar.component'
import { Week } from './week.component'

export const Calendar = () => {
  const child = useChild()
  const { data } = useCalendar(child)
  const styles = useStyleSheet(themedStyles)

  return (
    <View style={styles.container}>
      <Week child={child} />
      {data && data.length > 0 && (
        <List
          data={data.sort((a, b) =>
            a.startDate && b.startDate
              ? a.startDate.localeCompare(b.startDate)
              : 0
          )}
          ItemSeparatorComponent={Divider}
          renderItem={({ item }: ListRenderItemInfo<CalendarItem>) => (
            <ListItem
              disabled={true}
              title={`${item.title}`}
              description={(props) => (
                <Text style={[props?.style, styles.description]}>
                  {`${moment(item.startDate).format('dddd')} ${moment(
                    item.startDate
                  ).format('ll')} (${moment(item.startDate).fromNow()})`}
                </Text>
              )}
              accessoryLeft={CalendarOutlineIcon}
              accessoryRight={() => <SaveToCalendar event={item} />}
            />
          )}
        />
      )}
    </View>
  )
}

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-2',
    height: '100%',
    width: '100%',
  },
  description: {
    ...Typography.fontSize.xs,
    color: 'color-basic-600',
  },
})
