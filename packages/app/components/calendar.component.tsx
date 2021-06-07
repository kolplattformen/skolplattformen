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

  const formatStartDate = (startDate: moment.MomentInput) => {
    const date = moment(startDate)
    const output = `${date.format('dddd')} ${date.format(
      'll'
    )} • ${date.fromNow()}`

    // Hack to remove yarn if it is this year
    const currentYear = moment().year().toString(10)
    return output.replace(currentYear, '')
  }

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
                  {formatStartDate(item.startDate)}
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
    backgroundColor: 'background-basic-color-1',
    height: '100%',
    width: '100%',
  },
  description: {
    ...Typography.fontSize.xs,
    color: 'color-basic-600',
  },
})
