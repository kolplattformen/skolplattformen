import React from 'react'
import { StyleSheet, View, Image, SafeAreaView } from 'react-native'
import { DateTime } from 'luxon'
import { useNotifications, useNews, useClassmates, useCalendar, useSchedule } from '@skolplattformen/react-native-embedded-api'
import { Button, Icon, Text, Card, Avatar } from '@ui-kitten/components'

const NotificationIcon = (style) => (
  <Icon {...style} name='activity-outline' />
)

const CalendarIcon = (style) => (
  <Icon {...style} name='calendar-outline' />
)

const PeopleIcon = (style) => (
  <Icon {...style} name='people-outline' />
)

export const ChildListItem = ({ navigation, child, color }) => {
  const { data: notifications, status: notificationsStatus } = useNotifications(child)
  const { data: news, status: newsStatus } = useNews(child)
  const { data: classmates, status: classmatesStatus } = useClassmates(child)
  const { data: calendar, status: calendarStatus } = useCalendar(child)
  const { data: schedule, status: scheduleStatus } = useSchedule(child, DateTime.local(), DateTime.local().plus({ days: 7 }))

  const getClassName = () => {

    // hack: we can find the class name (ex. 8C) from the classmates. let's pick the first one and select theirs class
    if (classmates.length > 0) return classmates[0].className

    // otherwise we show the status: Grundskola, Gymnasium etc.
    const abbrevations = {
      G: 'Gymnasiet', // ? i'm guessing here
      GR: 'Grundskolan',
      F: 'Förskoleklass'
    }
    return child.status.split(';').map(status => abbrevations[status] || status).join(', ')
  }

  const Header = (props) => (
    <View {...props} style={{ flexDirection: 'row' }}>
      <View style={{ margin: 20 }}>
        <Avatar source={require('../assets/avatar.png')} shape='square' />
      </View>
      <View style={{ margin: 20 }}>
        <Text category='h6'>
          {child.name?.split('(')[0]}
        </Text>
        <Text category='s1'>
          {`${getClassName()}`}
        </Text>
      </View>
    </View>
  )

  const Footer = (props, info) => (
    <View style={styles.itemFooter}>
      <Button
        style={styles[notificationsStatus]}
        status='control'
        size='small'
        accessoryLeft={NotificationIcon}
      >
        {`${(news || []).length}`} nyheter
      </Button>
      <Button
        style={styles[calendarStatus]}
        status='control'
        size='small'
        accessoryLeft={CalendarIcon}
      >
        {`${(notifications || []).length}`}
      </Button>
      <Button
        style={styles[classmatesStatus]}
        status='control'
        size='small'
        accessoryLeft={PeopleIcon}
      >
        {`${(classmates || []).length} elever`}
      </Button>
    </View>
  )

  return (
    <Card
      style={{ ...styles.card }}
      appearance='filled'
      status={color}
      header={Header}
      footer={Footer}
      onPress={() => navigation.navigate('Child', { child, color })}
    >
      {([calendar ?? [], schedule ?? []].filter(a => a.startDate?.isSame('day'))).map((calendarItem, i) =>
        <Text appearance='hint' category='c1' key={i} style={{ textColor: styles.loaded(notificationsStatus) }}>
          {`${calendarItem.title}`}
        </Text>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
  },
  itemFooter: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    margin: 0
  },
  loaded: {
    paddingHorizontal: 0,
    color: '#000'
  },
  loading: {
    paddingHorizontal: 0,
    color: '#555'
  }, error: {
    paddingHorizontal: 0,
    color: '#500'
  }
})
