import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  useCalendar,
  useNews,
  useNotifications,
  useSchedule,
} from '@skolplattformen/api-hooks'
import { Child } from '@skolplattformen/embedded-api'
import {
  Button,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components'
import moment from 'moment'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Layout, Sizing } from '../styles'
import { studentName } from '../utils/peopleHelpers'
import { translate } from '../utils/translation'
import { RootStackParamList } from './navigation.component'
import { StudentAvatar } from './studentAvatar.component'
import { DaySummary } from './daySummary.component'

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
  const { data: notifications } = useNotifications(child)
  const { data: news } = useNews(child)
  const { data: calendar } = useCalendar(child)
  const { data: schedule } = useSchedule(
    child,
    moment().toISOString(),
    moment().add(7, 'days').toISOString()
  )

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
  const date = moment()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Child', { child, color })}
    >
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <StudentAvatar name={studentName(child.name)} color={color} />
            <View style={styles.cardHeaderText}>
              <Text category="h6">{studentName(child.name)}</Text>
              {className ? <Text category="s1">{className}</Text> : null}
            </View>
          </View>
        </View>
        <DaySummary child={child} date={date} />
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
            accessible
            size="small"
            status="basic"
            onPress={() => navigation.navigate('Absence', { child })}
          >
            {translate('abscense.title')}
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const themeStyles = StyleService.create({
  card: {
    borderRadius: 25,
    padding: Sizing.t5,
    marginBottom: Sizing.t4,
    backgroundColor: 'background-basic-color-1',
  },
  cardHeader: {
    ...Layout.flex.row,
    ...Layout.mainAxis.center,
    ...Layout.crossAxis.spaceBetween,
    marginBottom: Sizing.t4,
  },
  cardHeaderLeft: {
    ...Layout.flex.row,
    ...Layout.mainAxis.center,
    flex: 1,
  },
  cardHeaderText: {
    marginHorizontal: Sizing.t4,
    flex: 1,
  },
  itemFooter: {
    ...Layout.flex.row,
    marginTop: Sizing.t4,
  },
  itemFooterAbsence: {
    ...Layout.mainAxis.flexStart,
    marginTop: Sizing.t4,
  },
  item: {
    marginRight: 12,
    paddingHorizontal: 2,
    paddingVertical: 0,
    marginBottom: 0,
  },
  noNewNewsItemsText: {},
})
