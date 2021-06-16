/* eslint-disable react-native-a11y/has-accessibility-hint */
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
  Button,
  IconProps,
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
import {
  BookOpenIcon,
  CalendarOutlineIcon,
  ClipboardIcon,
  NotificationsIcon,
} from './icon.component'
import { RootStackParamList } from './navigation.component'
import { StudentAvatar } from './studentAvatar.component'

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

  const colors = useTheme()
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

  const buttonAppearance = 'basic'

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
            accessibilityRole="button"
            accessibilityLabel={`${child.name}, ${translate('abscense.title')}`}
            size="small"
            status="primary"
            onPress={() => navigation.navigate('Absence', { child })}
          >
            {translate('abscense.title')}
          </Button>
        </View>
        <View style={styles.itemFooter}>
          <Button
            style={styles.item}
            size="small"
            accessible={true}
            accessibilityLabel={`${child.name}, ${translate(
              'navigation.news'
            )}`}
            accessibilityRole="button"
            appearance={buttonAppearance}
            status={statusColors[newsStatus]}
            onPress={() =>
              navigation.navigate('Child', {
                child,
                color,
                initialRouteName: translate('navigation.news'),
              })
            }
            accessoryLeft={createFooterIcon(
              BookOpenIcon,
              colors['color-basic-text']
            )}
          >
            {`${(news || []).length}`}
          </Button>
          <Button
            style={styles.item}
            size="small"
            accessible={true}
            accessibilityLabel={`${child.name}, ${translate(
              'navigation.notifications'
            )}`}
            accessibilityRole="button"
            appearance={buttonAppearance}
            status={statusColors[notificationsStatus]}
            onPress={() =>
              navigation.navigate('Child', {
                child,
                color,
                initialRouteName: translate('navigation.notifications'),
              })
            }
            accessoryLeft={createFooterIcon(
              NotificationsIcon,
              colors['color-basic-text']
            )}
          >
            {`${(notifications || []).length}`}
          </Button>
          <Button
            style={styles.item}
            size="small"
            accessible={true}
            accessibilityLabel={`${child.name}, ${translate(
              'navigation.calender'
            )}`}
            accessibilityRole="button"
            appearance={buttonAppearance}
            status={statusColors[calendarStatus]}
            onPress={() =>
              navigation.navigate('Child', {
                child,
                color,
                initialRouteName: translate('navigation.calender'),
              })
            }
            accessoryLeft={createFooterIcon(
              CalendarOutlineIcon,
              colors['color-basic-text']
            )}
          >
            {`${(calendar || []).length}`}
          </Button>
          <Button
            style={styles.item}
            size="small"
            accessible
            accessibilityLabel={`${child.name}, ${translate(
              'navigation.menu'
            )}`}
            accessibilityRole="button"
            appearance={buttonAppearance}
            status={statusColors[menuStatus]}
            onPress={() =>
              navigation.navigate('Child', {
                child,
                color,
                initialRouteName: translate('navigation.menu'),
              })
            }
            accessoryLeft={createFooterIcon(
              ClipboardIcon,
              colors['color-basic-text']
            )}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const createFooterIcon = (Icon: typeof BookOpenIcon, color: string) => (
  props: IconProps
) => {
  return <Icon {...props} fill={color} />
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
