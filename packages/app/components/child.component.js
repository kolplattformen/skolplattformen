import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  useCalendar,
  useClassmates,
  useNews,
  useNotifications,
  useSchedule,
} from '@skolplattformen/api-hooks'
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { DateTime } from 'luxon'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Calendar } from './calendar.component'
import { ChildProvider, useChild } from './childContext.component'
import { Classmates } from './classmates.component'
import { NewsList } from './newsList.component'
import { NotificationsList } from './notificationsList.component'
import { childName } from '../utils/childHelpers'

const { Navigator, Screen } = createBottomTabNavigator()

const NewsScreen = () => {
  const child = useChild()
  const { data: news } = useNews(child)

  return (
    <Layout>
      <NewsList news={news} />
    </Layout>
  )
}

const NotificationsScreen = () => {
  const child = useChild()
  const { data: notifications, status: notificationsStatus } = useNotifications(
    child
  )

  return (
    <Layout>
      <NotificationsList
        notifications={notifications}
        status={notificationsStatus}
      />
    </Layout>
  )
}

const CalendarScreen = () => {
  const child = useChild()
  const { data: calendar } = useCalendar(child)
  const { data: schedule } = useSchedule(
    child,
    DateTime.local(),
    DateTime.local().plus({ days: 7 })
  )

  return (
    <Layout>
      <Calendar calendar={[...(calendar ?? []), ...(schedule ?? [])]} />
    </Layout>
  )
}

const ClassmatesScreen = () => {
  const child = useChild()
  const { data: classmates } = useClassmates(child)

  return (
    <Layout>
      <Classmates
        classmates={classmates.sort((a, b) =>
          a.firstname.localeCompare(b.firstname)
        )}
      />
    </Layout>
  )
}

const TabTitle = ({ style, children }) => (
  <Text adjustsFontSizeToFit numberOfLines={1} style={style}>
    {children}
  </Text>
)

const NewsIcon = (props) => <Icon {...props} name="activity-outline" />
const NotificationsIcon = (props) => (
  <Icon {...props} name="alert-circle-outline" />
)
const CalendarIcon = (props) => <Icon {...props} name="calendar-outline" />
const ClassIcon = (props) => <Icon {...props} name="people-outline" />

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title={(props) => <TabTitle {...props}>Nyheter</TabTitle>}
      icon={NewsIcon}
    />
    <BottomNavigationTab
      title={(props) => <TabTitle {...props}>Aviseringar</TabTitle>}
      icon={NotificationsIcon}
    />
    <BottomNavigationTab
      title={(props) => <TabTitle {...props}>Kalender</TabTitle>}
      icon={CalendarIcon}
    />
    <BottomNavigationTab
      title={(props) => <TabTitle {...props}>Klassen</TabTitle>}
      icon={ClassIcon}
    />
  </BottomNavigation>
)

const TabNavigator = ({ initialRouteName = 'Nyheter' }) => (
  <Navigator
    initialRouteName={initialRouteName}
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Screen name="Nyheter" component={NewsScreen} />
    <Screen name="Notifieringar" component={NotificationsScreen} />
    <Screen name="Kalender" component={CalendarScreen} />
    <Screen name="Klassen" component={ClassmatesScreen} />
  </Navigator>
)

export const Child = ({ route, navigation }) => {
  const { child, color, initialRouteName } = route.params

  const BackIcon = (props) => <Icon {...props} name="arrow-back" />

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  const navigateBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ ...styles.wrap, color }}>
      <ChildProvider child={child}>
        <TopNavigation
          title={childName(child.name)}
          alignment="center"
          accessoryLeft={BackAction}
          style={styles.topBar}
        />
        <TabNavigator initialRouteName={initialRouteName} />
      </ChildProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    flex: 1,
  },
  topBar: {
    backgroundColor: '#fff',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})
