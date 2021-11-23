import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Icon } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import { StyleProp, TextProps } from 'react-native'
import { NativeStackNavigationOptions } from 'react-native-screens/native-stack'
import { defaultStackStyling } from '../design/navigationThemes'
import { studentName } from '../utils/peopleHelpers'
import { translate } from '../utils/translation'
import { Calendar } from './calendar.component'
import { ChildProvider } from './childContext.component'
import { Menu } from './menu.component'
import { RootStackParamList } from './navigation.component'
import { NavigationTitle } from './navigationTitle.component'
import { NewsList } from './newsList.component'
import { NotificationsList } from './notificationsList.component'
import { Classmates } from './classmates.component'
import { TabBarLabel } from './tabBarLabel.component'
import { useFeature } from '../hooks/useFeature'

type ChildNavigationProp = StackNavigationProp<RootStackParamList, 'Child'>
type ChildRouteProps = RouteProp<RootStackParamList, 'Child'>

export type ChildTabParamList = {
  News: undefined
  Notifications: undefined
  Calendar: undefined
  Menu: undefined
  Classmates: undefined
}

interface TabTitleProps {
  children: string
  style?: StyleProp<TextProps>
}

const { Navigator, Screen } = createBottomTabNavigator<ChildTabParamList>()

const NewsScreen = () => <NewsList />
const NotificationsScreen = () => <NotificationsList />
const CalendarScreen = () => <Calendar />
const MenuScreen = () => <Menu />
const ClassmatesScreen = () => <Classmates />

interface ScreenSettings {
  NEWS_SCREEN: boolean
  NOTIFICATIONS_SCREEN: boolean
  CALENDER_SCREEN: boolean
  MENU_SCREEN: boolean
  CLASSMATES_SCREEN: boolean
}

const TabNavigator = ({
  initialRouteName = 'News',
  screenSettings,
}: {
  initialRouteName?: keyof ChildTabParamList
  screenSettings: ScreenSettings
}) => (
  <Navigator
    initialRouteName={initialRouteName}
    screenOptions={({ route }) => {
      return {
        tabBarLabel: ({ focused }) => (
          <TabBarLabel
            label={getRouteTitleFromName(route.name)}
            focused={focused}
          />
        ),
        tabBarIcon: ({ focused, color }) => {
          let iconName = 'news'

          if (route.name === 'News')
            iconName = focused ? 'book-open' : 'book-open-outline'
          else if (route.name === 'Notifications')
            iconName = focused ? 'alert-circle' : 'alert-circle-outline'
          else if (route.name === 'Calendar')
            iconName = focused ? 'calendar' : 'calendar-outline'
          else if (route.name === 'Menu')
            iconName = focused ? 'clipboard' : 'clipboard-outline'
          else if (route.name === 'Classmates')
            iconName = focused ? 'people' : 'people-outline'
          return <Icon name={iconName} fill={color} height={24} width={24} />
        },
      }
    }}
  >
    {screenSettings.NEWS_SCREEN && (
      <Screen
        name="News"
        component={NewsScreen}
        options={{ title: translate('navigation.news') }}
      />
    )}
    {screenSettings.NOTIFICATIONS_SCREEN && (
      <Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: translate('navigation.notifications') }}
      />
    )}
    {screenSettings.CALENDER_SCREEN && (
      <Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ title: translate('navigation.calender') }}
      />
    )}
    {screenSettings.MENU_SCREEN && (
      <Screen
        name="Menu"
        component={MenuScreen}
        options={{ title: translate('navigation.menu') }}
      />
    )}
    {screenSettings.CLASSMATES_SCREEN && (
      <Screen
        name="Classmates"
        component={ClassmatesScreen}
        options={{ title: translate('navigation.classmates') }}
      />
    )}
  </Navigator>
)

const getHeaderTitle = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'News'
  return getRouteTitleFromName(routeName)
}

const getRouteTitleFromName = (routeName: string) => {
  switch (routeName) {
    case 'News':
      return translate('navigation.news')
    case 'Notifications':
      return translate('navigation.notifications')
    case 'Calendar':
      return translate('navigation.calender')
    case 'Menu':
      return translate('navigation.menu')
    case 'Classmates':
      return translate('navigation.classmates')
  }
}

export const childRouteOptions =
  (darkMode: boolean) =>
  ({
    route,
  }: {
    route: RouteProp<RootStackParamList, 'Child'>
  }): NativeStackNavigationOptions => {
    const { child } = route.params

    return {
      ...defaultStackStyling(darkMode),
      headerCenter: () => (
        <NavigationTitle
          title={getHeaderTitle(route)}
          subtitle={studentName(child?.name)}
        />
      ),
    }
  }

export const Child = () => {
  const route = useRoute<ChildRouteProps>()
  const { child, initialRouteName } = route.params
  const useFoodMenu = useFeature('FOOD_MENU')
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ title: getHeaderTitle(route) })
  }, [navigation, route])

  const screenSettings: ScreenSettings = {
    NEWS_SCREEN: true,
    NOTIFICATIONS_SCREEN: true,
    CALENDER_SCREEN: true,
    MENU_SCREEN: useFoodMenu,
    CLASSMATES_SCREEN: true,
  }
  return (
    <ChildProvider child={child}>
      <TabNavigator
        screenSettings={screenSettings}
        initialRouteName={initialRouteName as keyof ChildTabParamList}
      />
    </ChildProvider>
  )
}
