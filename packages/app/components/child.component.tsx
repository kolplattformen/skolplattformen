import {
  BottomTabBarOptions,
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import React from 'react'
import { StyleProp, StyleSheet, TextProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { studentName } from '../utils/peopleHelpers'
import { Calendar } from './calendar.component'
import { ChildProvider } from './childContext.component'
import { Classmates } from './classmates.component'
import {
  BackIcon,
  CalendarOutlineIcon,
  ClassIcon,
  NewsIcon,
  NotificationsIcon,
} from './icon.component'
import { RootStackParamList } from './navigation.component'
import { NewsList } from './newsList.component'
import { NotificationsList } from './notificationsList.component'

type ChildNavigationProp = StackNavigationProp<RootStackParamList, 'Child'>
type ChildRouteProps = RouteProp<RootStackParamList, 'Child'>

interface TabTitleProps {
  children: string
  style?: StyleProp<TextProps>
}

const { Navigator, Screen } = createBottomTabNavigator()

const NewsScreen = () => {
  return (
    <Layout>
      <NewsList />
    </Layout>
  )
}

const NotificationsScreen = () => {
  return (
    <Layout>
      <NotificationsList />
    </Layout>
  )
}

const CalendarScreen = () => {
  return (
    <Layout>
      <Calendar />
    </Layout>
  )
}

const ClassmatesScreen = () => {
  return (
    <Layout>
      <Classmates />
    </Layout>
  )
}

const TabTitle = ({ style, children }: TabTitleProps) => (
  <Text adjustsFontSizeToFit numberOfLines={1} style={style}>
    {children}
  </Text>
)

const BottomTabBar = ({
  navigation,
  state,
}: BottomTabBarProps<BottomTabBarOptions>) => (
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
      icon={CalendarOutlineIcon}
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

export const Child = () => {
  const navigation = useNavigation<ChildNavigationProp>()
  const route = useRoute<ChildRouteProps>()
  const { child, initialRouteName } = route.params

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  const navigateBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ ...styles.wrap }}>
      <ChildProvider child={child}>
        <TopNavigation
          title={studentName(child.name)}
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
