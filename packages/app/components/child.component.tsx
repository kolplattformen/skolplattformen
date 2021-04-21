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
  TopNavigationAction, useTheme
} from '@ui-kitten/components'
import React from 'react'
import { StyleProp, StyleSheet, TextProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Layout as LayoutStyle } from '../styles'
import { studentName } from '../utils/peopleHelpers'
import { Calendar } from './calendar.component'
import { ChildProvider } from './childContext.component'
import { Menu } from './menu.component'
import {
  BackIcon,
  CalendarOutlineIcon,
  MenuIcon,
  NewsIcon,
  NotificationsIcon,
} from './icon.component'
import { RootStackParamList } from './navigation.component'
import { NewsList } from './newsList.component'
import { NotificationsList } from './notificationsList.component'
import { translate } from '../utils/translation'

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

const MenuScreen = () => {
  return (
    <Layout>
      <Menu />
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
      title={(props) => (
        <TabTitle {...props}>{translate('navigation.news')}</TabTitle>
      )}
      icon={NewsIcon}
    />
    <BottomNavigationTab
      title={(props) => (
        <TabTitle {...props}>{translate('navigation.notifications')}</TabTitle>
      )}
      icon={NotificationsIcon}
    />
    <BottomNavigationTab
      title={(props) => (
        <TabTitle {...props}>{translate('navigation.calender')}</TabTitle>
      )}
      icon={CalendarOutlineIcon}
    />
    <BottomNavigationTab
      title={(props) => (
        <TabTitle {...props}>{translate('navigation.menu')}</TabTitle>
      )}
      icon={MenuIcon}
    />
  </BottomNavigation>
)

const TabNavigator = ({ initialRouteName = 'Nyheter' }) => (
  <Navigator
    initialRouteName={initialRouteName}
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Screen name={translate('navigation.news')} component={NewsScreen} />
    <Screen
      name={translate('navigation.notifications')}
      component={NotificationsScreen}
    />
    <Screen
      name={translate('navigation.calender')}
      component={CalendarScreen}
    />
    <Screen name={translate('navigation.menu')} component={MenuScreen} />
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
  const theme = useTheme();

  return (
    <SafeAreaView style={[{ ...styles.wrap }, { backgroundColor: theme['background-basic-color-1']}]}>
      <ChildProvider child={child}>
        <TopNavigation
          title={studentName(child.name)}
          alignment="center"
          accessoryLeft={BackAction}
          style={[styles.topBar, { backgroundColor: theme['background-basic-color-1']}]}
        />
        <TabNavigator initialRouteName={initialRouteName} />
      </ChildProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrap: {
    ...LayoutStyle.flex.full,
  },
  topBar: {

  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})
