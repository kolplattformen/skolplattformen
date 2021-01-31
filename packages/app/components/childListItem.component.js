import React from 'react'
import { StyleSheet, View, Image, SafeAreaView } from 'react-native'
import { DateTime } from 'luxon'
import moment from 'moment'
import { useNotifications, useNews, useClassmates, useCalendar, useMenu, useSchedule } from '@skolplattformen/react-native-embedded-api'
import { Button, Icon, Text, Card, Avatar } from '@ui-kitten/components'

const NotificationsIcon = (props) => (
  <Icon {...props} name='alert-circle-outline' />
)

const NewsIcon = (props) => (
  <Icon {...props} name='activity-outline' />
)

const CalendarIcon = (props) => (
  <Icon {...props} name='calendar-outline' />
)

const PeopleIcon = (props) => (
  <Icon {...props} name='people-outline' />
)

export const ChildListItem = ({ navigation, child, color }) => {
  const { data: notifications, status: notificationsStatus } = useNotifications(child)
  const { data: news, status: newsStatus } = useNews(child)
  const { data: classmates, status: classmatesStatus } = useClassmates(child)
  const { data: calendar, status: calendarStatus } = useCalendar(child)
  const { data: menu, status: menuStatus } = useMenu(child)
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
        style={[styles.item, styles[newsStatus]]}
        status='control'
        size='small'
        onPress={() => navigation.navigate('Child', { child, color, selectedTab: 0 })}
        accessoryLeft={NewsIcon}
      >
        {`${(news || []).length}`}
      </Button>
      <Button
        style={[styles.item, styles[notificationsStatus]]}
        status='control'
        size='small'
        onPress={() => navigation.navigate('Child', { child, color, selectedTab: 1 })}
        accessoryLeft={NotificationsIcon}
      >
        {`${(notifications || []).length}`}
      </Button>
      <Button
        style={[styles.item, styles[calendarStatus]]}
        status='control'
        size='small'
        onPress={() => navigation.navigate('Child', { child, color, selectedTab: 2 })}

        accessoryLeft={CalendarIcon}
      >
        {`${(notifications || []).length}`}
      </Button>
      <Button
        style={[styles.item, styles[classmatesStatus]]}
        status='control'
        size='small'
        onPress={() => navigation.navigate('Child', { child, color, selectedTab: 3 })}
        accessoryLeft={PeopleIcon}
      >
        {`${(classmates || []).length}`}
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
      {([...(calendar ?? []), ...(schedule ?? [])].filter(a => moment(a.startDate).isSame('week')).slice(0, 3).map((calendarItem, i) =>
        <Text appearance='hint' category='c1' key={i} style={{ textColor: styles.loaded(notificationsStatus) }}>
          {`${calendarItem.title}`}
        </Text>
      ))}

      {notifications.filter(n => moment(n).isSame('week')).map((notification, i) =>
        <Text appearance='hint' category='c1' key={i}>
          {`${notification.message}`}
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
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    margin: 0
  },
  item: {
    paddingHorizontal: 0,
  },
  loaded: {
    color: '#000'
  },
  loading: {
    color: '#555'
  },
  error: {
    color: '#500'
  }
})
