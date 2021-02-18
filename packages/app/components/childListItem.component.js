import {
  useCalendar,
  useClassmates,
  useNews,
  useNotifications,
  useSchedule,
} from '@skolplattformen/api-hooks'
import { Avatar, Button, Card, Icon, Text } from '@ui-kitten/components'
import { DateTime } from 'luxon'
import moment from 'moment'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { childName } from '../utils/childHelpers'

const NotificationsIcon = (props) => (
  <Icon {...props} name="alert-circle-outline" />
)

const NewsIcon = (props) => <Icon {...props} name="activity-outline" />

const CalendarIcon = (props) => <Icon {...props} name="calendar-outline" />

const PeopleIcon = (props) => <Icon {...props} name="people-outline" />

export const ChildListItem = ({ navigation, child, color }) => {
  // Forces rerender when child.id changes
  useEffect(() => {}, [child.id])

  const { data: notifications, status: notificationsStatus } = useNotifications(
    child
  )
  const { data: news, status: newsStatus } = useNews(child)
  const { data: classmates, status: classmatesStatus } = useClassmates(child)
  const { data: calendar, status: calendarStatus } = useCalendar(child)
  const { data: schedule } = useSchedule(
    child,
    DateTime.local(),
    DateTime.local().plus({ days: 7 })
  )

  const getClassName = () => {
    // hack: we can find the class name (ex. 8C) from the classmates. let's pick the first one and select theirs class
    if (classmates.length > 0) {
      return classmates[0].className
    }

    // otherwise we show the status: Grundskola, Gymnasium etc.
    const abbrevations = {
      G: 'Gymnasiet', // ? i'm guessing here
      GR: 'Grundskolan',
      F: 'Förskoleklass',
    }
    return child.status
      .split(';')
      .map((status) => abbrevations[status] || status)
      .join(', ')
  }

  const Header = (props) => (
    <View {...props} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ margin: 20, marginRight: 0 }}>
        <Avatar source={require('../assets/avatar.png')} shape="square" />
      </View>
      <View style={{ margin: 20, flex: 1 }}>
        <Text category="h6">{childName(child.name)}</Text>
        <Text category="s1">{`${getClassName()}`}</Text>
      </View>
    </View>
  )

  const Footer = () => (
    <View style={styles.itemFooter}>
      <Button
        style={[styles.item, styles[newsStatus]]}
        status="control"
        size="small"
        onPress={() =>
          navigation.navigate('Child', {
            child,
            color,
            initialRouteName: 'Nyheter',
          })
        }
        accessoryLeft={NewsIcon}
      >
        {`${(news || []).length}`}
      </Button>
      <Button
        style={[styles.item, styles[notificationsStatus]]}
        status="control"
        size="small"
        onPress={() =>
          navigation.navigate('Child', {
            child,
            color,
            initialRouteName: 'Notifieringar',
          })
        }
        accessoryLeft={NotificationsIcon}
      >
        {`${(notifications || []).length}`}
      </Button>
      <Button
        style={[styles.item, styles[calendarStatus]]}
        status="control"
        size="small"
        onPress={() =>
          navigation.navigate('Child', {
            child,
            color,
            initialRouteName: 'Kalender',
          })
        }
        accessoryLeft={CalendarIcon}
      >
        {`${(notifications || []).length}`}
      </Button>
      <Button
        style={[styles.item, styles[classmatesStatus]]}
        status="control"
        size="small"
        onPress={() =>
          navigation.navigate('Child', {
            child,
            color,
            initialRouteName: 'Klassen',
          })
        }
        accessoryLeft={PeopleIcon}
      >
        {`${(classmates || []).length}`}
      </Button>
    </View>
  )

  return (
    <Card
      style={styles.card}
      appearance="filled"
      status={color}
      header={Header}
      footer={Footer}
      onPress={() => navigation.navigate('Child', { child, color })}
    >
      {[...(calendar ?? []), ...(schedule ?? [])]
        .filter((a) => moment(a.startDate).isSame('week'))
        .slice(0, 3)
        .map((calendarItem, i) => (
          <Text
            appearance="hint"
            category="c1"
            key={i}
            style={{ textColor: styles.loaded(notificationsStatus) }}
          >
            {`${calendarItem.title}`}
          </Text>
        ))}

      {notifications
        .filter((n) => moment(n).isSame('week'))
        .map((notification, i) => (
          <Text appearance="hint" category="c1" key={i}>
            {`${notification.message}`}
          </Text>
        ))}

      <Button onPress={() => navigation.navigate('Absence', { child })}>
        Anmäl frånvaro
      </Button>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    margin: 0,
  },
  item: {
    paddingHorizontal: 0,
  },
  loaded: {
    color: '#000',
  },
  loading: {
    color: '#555',
  },
  error: {
    color: '#500',
  },
})
