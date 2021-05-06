import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  useCalendar,
  useMenu,
  useNews,
  useNotifications,
  useSchedule,
} from '@skolplattformen/api-hooks'
import { Child } from '@skolplattformen/embedded-api'

import {
  Avatar,
  Button,
  Card,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components'
import moment from 'moment'
import React from 'react'
import { View, useColorScheme } from 'react-native'
import { Layout, Sizing } from '../styles'
import { studentName } from '../utils/peopleHelpers'
import { translate } from '../utils/translation'
import {
  CalendarOutlineIcon,
  MenuIcon,
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
  const colorScheme = useColorScheme()

  // Forces rerender when child.id changes
  React.useEffect(() => {}, [child.id])

  const navigation = useNavigation<ChildListItemNavigationProp>()
  const { data: notifications, status: notificationsStatus } = useNotifications(
    child
  )
  const { data: news, status: newsStatus } = useNews(child)
  const { data: calendar, status: calendarStatus } = useCalendar(child)
  const { data: schedule } = useSchedule(
    child,
    moment().toISOString(),
    moment().add(7, 'days').toISOString()
  )
  const { status: menuStatus } = useMenu(child)

  const notificationsThisWeek = notifications.filter(({ dateCreated }) =>
    dateCreated ? moment(dateCreated).isSame(moment(), 'week') : false
  )

  const newsThisWeek = news.filter(({ published }) =>
    published ? moment(published).isSame(moment(), 'week') : false
  )

  const scheduleAndCalendarThisWeek = [
    ...(calendar ?? []),
    ...(schedule ?? []),
  ].filter(({ startDate }) =>
    startDate
      ? moment(startDate).isBetween(
          moment().startOf('day'),
          moment().add(7, 'days')
        )
      : false
  )

  const displayDate = (date: moment.MomentInput) => {
    return moment(date).fromNow()
  }

  const getClassName = () => {
    // Taken from Skolverket
    // https://www.skolverket.se/skolutveckling/anordna-och-administrera-utbildning/administrera-utbildning/skoltermer-pa-engelska
    const abbrevations = {
      G: translate('abbrevations.upperSecondarySchool'),
      GR: translate('abbrevations.compulsorySchool'),
      F: translate('abbrevations.leisureTimeCentre'),
      FS: translate('abbrevations.preSchool'),
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
  const styles = useStyleSheet(themeStyles)

  const statusColors = {
    loading: 'basic',
    loaded: 'basic',
    error: 'error',
    pending: 'basic',
  }

  const buttonAppearance: string = 'ghost'

  const Footer = () => {
    return (
      <View style={styles.itemFooter}>
        <Button
          style={styles.item}
          size="small"
          appearance={buttonAppearance}
          status={statusColors[newsStatus]}
          onPress={() =>
            navigation.navigate('Child', {
              child,
              color,
              initialRouteName: translate('navigation.news'),
            })
          }
          accessoryLeft={NewsIcon}
        >
          {`${(news || []).length}`}
        </Button>
        <Button
          style={styles.item}
          size="small"
          appearance={buttonAppearance}
          status={statusColors[notificationsStatus]}
          onPress={() =>
            navigation.navigate('Child', {
              child,
              color,
              initialRouteName: translate('navigation.notifications'),
            })
          }
          accessoryLeft={NotificationsIcon}
        >
          {`${(notifications || []).length}`}
        </Button>
        <Button
          style={styles.item}
          size="small"
          appearance={buttonAppearance}
          status={statusColors[calendarStatus]}
          onPress={() =>
            navigation.navigate('Child', {
              child,
              color,
              initialRouteName: translate('navigation.calender'),
            })
          }
          accessoryLeft={CalendarOutlineIcon}
        >
          {`${(calendar || []).length}`}
        </Button>
        <Button
          style={styles.item}
          size="small"
          appearance={buttonAppearance}
          status={statusColors[menuStatus]}
          onPress={() =>
            navigation.navigate('Child', {
              child,
              color,
              initialRouteName: translate('navigation.menu'),
            })
          }
          accessoryLeft={MenuIcon}
        />
      </View>
    )
  }

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
        <Text category="p1" key={i}>
          {`${calendarItem.title} (${displayDate(calendarItem.startDate)})`}
        </Text>
      ))}
      {notificationsThisWeek.slice(0, 3).map((notification, i) => (
        <Text category="p1" key={i}>
          {translate('notifications.notificationTitle', {
            message: notification.message,
            dateCreated: displayDate(notification.dateCreated),
          })}
        </Text>
      ))}
      {newsThisWeek.slice(0, 3).map((newsItem, i) => (
        <Text category="p1" key={i}>
          {translate('news.notificationTitle', {
            header: newsItem.header,
            published: displayDate(newsItem.published),
          })}
        </Text>
      ))}
      {scheduleAndCalendarThisWeek.length ||
      notificationsThisWeek.length ||
      newsThisWeek.length ? null : (
        <Text category="p1" style={styles.noNewNewsItemsText}>
          {translate('news.noNewNewsItemsThisWeek')}
        </Text>
      )}
      <View style={styles.itemFooterAbsence}>
        <Button
          size="small"
          status="primary"
          onPress={() => navigation.navigate('Absence', { child })}
        >
          {translate('abscense.title')}
        </Button>
      </View>
    </Card>
  )
}

const themeStyles = StyleService.create({
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
   // backgroundColor: 'background-basic-color-1',
   // borderColor:  'background-basic-color-1'
  },
  noNewNewsItemsText: {
    color: 'color-basic-600',
  },
})
