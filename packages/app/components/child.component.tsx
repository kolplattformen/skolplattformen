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
import { StyleProp, TextProps } from 'react-native'
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
import { SafeAreaView } from '../ui/safeAreaView.component'

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
  <Text
    maxFontSizeMultiplier={1.5}
    adjustsFontSizeToFit
    numberOfLines={1}
    style={style}
  >
    {children}
  </Text>
)

const BottomTabBar = ({
  navigation,
  state,
}: BottomTabBarProps<BottomTabBarOptions>) => (
  <BottomNavigation
    accessibilityRole="menu"
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      accessibilityRole="menuitem"
      title={(props) => (
        <TabTitle {...props}>{translate('navigation.news')}</TabTitle>
      )}
      icon={NewsIcon}
    />
    <BottomNavigationTab
      accessibilityRole="menuitem"
      title={(props) => (
        <TabTitle {...props}>{translate('navigation.notifications')}</TabTitle>
      )}
      icon={NotificationsIcon}
    />
    <BottomNavigationTab
      accessibilityRole="menuitem"
      title={(props) => (
        <TabTitle {...props}>{translate('navigation.calender')}</TabTitle>
      )}
      icon={CalendarOutlineIcon}
    />
    <BottomNavigationTab
      accessibilityRole="menuitem"
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

  return (
    <SafeAreaView>
      <ChildProvider child={child}>
        <TopNavigation
          title={() => (
            <Text maxFontSizeMultiplier={2}>{studentName(child.name)}</Text>
          )}
          alignment="center"
          accessoryLeft={BackAction}
        />
        <TabNavigator initialRouteName={initialRouteName} />
      </ChildProvider>
    </SafeAreaView>
  )
}
