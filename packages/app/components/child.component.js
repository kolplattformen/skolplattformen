import React from 'react'
import { StyleSheet } from 'react-native'
import {
  TopNavigation,
  TopNavigationAction,
  Tab,
  TabView,
  OverflowMenu,
  MenuItem,
  Layout,
  Text,
  Icon,
} from '@ui-kitten/components'
import { DateTime } from 'luxon'
import { NewsList } from './newsList.component'
import { Calendar } from './calendar.component'
import { Classmates } from './classmates.component'
import { NotificationsList } from './notificationsList.component'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  useNotifications,
  useNews,
  useClassmates,
  useCalendar,
  useSchedule,
} from '@skolplattformen/react-native-embedded-api'

export const Child = ({ route, navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const { child, color } = route.params
  const { data: notifications, status: notificationsStatus } = useNotifications(child)
  const { data: news, status: newsStatus } = useNews(child)
  const { data: classmates, status: classmatesStatus } = useClassmates(child)
  const { data: calendar, status: calendarStatus } = useCalendar(child)
  const { data: schedule, status: scheduleStatus } = useSchedule(child, DateTime.local(), DateTime.local().plus({ days: 7 }))
  const [menuVisible, setMenuVisible] = React.useState(false)

  const NewsIcon = (props) => (
    <Icon {...props} name='activity-outline' />
  )
  const NotificationsIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
  )
  const CalendarIcon = (props) => (
    <Icon {...props} name='calendar-outline' />
  )
  const ClassIcon = (props) => (
    <Icon {...props} name='people-outline' />
  )
  const EditIcon = (props) => (
    <Icon {...props} name='edit' />
  )
  const SettingsIcon = (props) => (
    <Icon {...props} name='options-2-outline' />
  )
  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  )

  const MenuIcon = (props) => (
    <Icon {...props} name='more-vertical' />
  )

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  const navigateBack = () => {
    navigation.goBack()
  }



  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  )

  const renderRightActions = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={SettingsIcon} title='Anmäl frånvaro' />
      </OverflowMenu>
    </React.Fragment>
  )

  return (
    <SafeAreaView style={{ flex: 1 }} style={{ ...styles.topBar, color: color }}>
      <TopNavigation title={child.name.split('(')[0]}
        alignment='center'
        accessoryLeft={BackAction}
        accessoryRight={renderRightActions}
        style={styles.topBar} />
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Tab title="Nyheter" icon={NewsIcon}>
          <Layout style={styles.tabContainer}>
            <NewsList news={news} />
          </Layout>
        </Tab>
        <Tab title="Notifieringar" icon={NotificationsIcon}>
          <Layout style={styles.tabContainer}>
            <NotificationsList notifications={notifications} status={notificationsStatus} />
          </Layout>
        </Tab>
        <Tab title="Schema" icon={CalendarIcon}>
          <Layout style={styles.tabContainer}>
            <Calendar calendar={[...calendar ?? [], ...schedule ?? []]}></Calendar>
          </Layout>
        </Tab>
        <Tab title="Klassen" icon={ClassIcon}>
          <Layout style={styles.tabContainer}>
            <Text category='h5'>
              Klass {classmates?.length ? classmates[0].className : ''}
            </Text>
            <Classmates classmates={classmates} />
          </Layout>
        </Tab>
      </TabView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  topBar: {
    backgroundColor: "#fff"
  },
  tabContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingLeft: 10,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})