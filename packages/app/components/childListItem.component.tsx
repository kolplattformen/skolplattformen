import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  useCalendar,
  useClassmates,
  useNews,
  useNotifications,
  useSchedule,
} from '@skolplattformen/api-hooks'
import { Child } from '@skolplattformen/embedded-api'
import { Avatar, Button, Card, Text } from '@ui-kitten/components'
import moment from 'moment'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors, Layout, Sizing } from '../styles'
import { studentName } from '../utils/peopleHelpers'
import {
  CalendarOutlineIcon,
  ClassIcon,
  NewsIcon,
  NotificationsIcon,
} from './icon.component'
import { RootStackParamList } from './navigation.component'

interface ChildListItemProps {
  child: Child
  color: string
}

type ChildListItemNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Children'
>

export const ChildListItem = ({ child, color }: ChildListItemProps) => {
  // Forces rerender when child.id changes
  React.useEffect(() => {}, [child.id])

  const navigation = useNavigation<ChildListItemNavigationProp>()
  const { data: notifications, status: notificationsStatus } = useNotifications(
    child
  )
  const { data: news, status: newsStatus } = useNews(child)
  const { data: classmates, status: classmatesStatus } = useClassmates(child)
  const { data: calendar, status: calendarStatus } = useCalendar(child)
  const { data: schedule } = useSchedule(
    child,
    moment().toISOString(),
    moment().add(7, 'days').toISOString()
  )

  const notificationsThisWeek = notifications.filter(({ dateCreated }) => {
    dateCreated ? moment(dateCreated).isSame(moment(), 'week') : false
  })

  const scheduleAndCalendarThisWeek = [
    ...(calendar ?? []),
    ...(schedule ?? []),
  ].filter(({ startDate }) =>
    startDate ? moment(startDate).isSame(moment(), 'week') : false
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
      F: 'Fritids',
      FS: 'Förskola',
    }

    return child.status
      ? child.status
          .split(';')
          .map((status) => {
            const statusAsAbbreviation = status as keyof typeof abbrevations

            return abbrevations[statusAsAbbreviation] || status
          })
          .join(', ')
      : null
  }

  const className = getClassName()

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
        accessoryLeft={CalendarOutlineIcon}
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
        accessoryLeft={ClassIcon}
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
      header={(props) => (
        <View {...props} style={styles.cardHeader}>
          <View style={styles.cardAvatar}>
            <Avatar source={require('../assets/avatar.png')} shape="square" />
          </View>
          <View style={styles.cardHeaderText}>
            <Text category="h6">{studentName(child.name)}</Text>
            {className ? <Text category="s1">{className}</Text> : null}
          </View>
        </View>
      )}
      footer={Footer}
      onPress={() => navigation.navigate('Child', { child, color })}
    >
      {scheduleAndCalendarThisWeek.slice(0, 3).map((calendarItem, i) => (
        <Text appearance="hint" category="c1" key={i} style={styles.loaded}>
          {`${calendarItem.title}`}
        </Text>
      ))}
      {notificationsThisWeek.map((notification, i) => (
        <Text appearance="hint" category="c1" key={i}>
          {`${notification.message}`}
        </Text>
      ))}
      {scheduleAndCalendarThisWeek.length ||
      notificationsThisWeek.length ? null : (
        <Text appearance="hint" category="c1">
          Inga nya inlägg denna vecka.
        </Text>
      )}
      <View style={styles.itemFooterAbsence}>
        <Button
          size="small"
          onPress={() => navigation.navigate('Absence', { child })}
        >
          Anmäl frånvaro
        </Button>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Sizing.t5,
  },
  cardHeader: {
    ...Layout.flex.row,
    ...Layout.mainAxis.center,
  },
  cardAvatar: { margin: Sizing.t5, marginRight: 0 },
  cardHeaderText: { margin: Sizing.t5, flex: 1 },
  itemFooter: {
    ...Layout.flex.row,
    ...Layout.crossAxis.evenly,
    paddingVertical: Sizing.t2,
    borderRadius: 5,
    margin: 0,
  },
  itemFooterAbsence: {
    ...Layout.mainAxis.flexStart,
    marginTop: Sizing.t4,
  },
  item: {
    paddingHorizontal: 0,
  },
  loaded: {
    color: Colors.neutral.black,
  },
  loading: {
    color: '#555',
  },
  error: {
    color: '#500',
  },
  pending: {},
})
