import React from 'react'
import { StyleSheet, View, Image, SafeAreaView } from 'react-native'
import { DateTime } from 'luxon'
import { useNotifications, useNews, useClassmates, useCalendar, useSchedule } from '@skolplattformen/react-native-embedded-api'
import { Divider, Button, Icon, Layout, Text, TopNavigation, TopNavigationAction, List, Card, Avatar, Spinner } from '@ui-kitten/components'

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
)

const NotificationIcon = (style) => (
  <Icon {...style} name='activity-outline' />
)

const CalendarIcon = (style) => (
  <Icon {...style} name='calendar-outline' />
)

const PeopleIcon = (style) => (
  <Icon {...style} name='people-outline' />
)

export const ChildListItem = ({ navigation, child, color }) => {
  const { data: notifications } = useNotifications(child)
  const { data: news } = useNews(child)
  const { data: classmates } = useClassmates(child)
  const { data: calendar } = useCalendar(child)
  const { data: schedule } = useSchedule(child, DateTime.local(), DateTime.local().plus({days: 7}))

  const navigateChild = (child, color) => {
    navigation.navigate('Child', { child, color })
  }

  const getClassName = () => {
    
    // hack: we can find the class name (ex. 8C) from the classmates. let's pick the first one and select theirs class
    if (classmates.length > 0) return classmates[0].className

    // otherwise we show the status: Grundskola, Gymnasium etc.
    const abbrevations = {
      G: 'Gymnasiet', // ? i'm guessing here
      GR: 'Grundskolan',
      F: 'Förskoleklass'
    }
    return child.status.split(';').map(status => abbrevations[status] || status).join(', ')
  }

  const Header = (props) => (
    <View {...props} style={{ flexDirection: 'row' }}>
      <View style={{ margin: 20 }}>
        <Avatar source={require('../assets/avatar.png')} shape='square' />
      </View>
      <View style={{ margin: 20 }}>
        <Text category='h6'>
          {child.name?.split('(')[0]}
        </Text>
        <Text category='s1'>
          {`${getClassName()}`}
        </Text>
      </View>
    </View>
  )

  const Footer = (props, info) => (
    <View style={styles.itemFooter}>
      <Button
        style={styles.iconButton}
        status='control'
        size='small'
        accessoryLeft={NotificationIcon}
      >
        {`${(news || []).length}`} nyheter
      </Button>
      <Button
        style={styles.iconButton}
        status='control'
        size='small'
        accessoryLeft={CalendarIcon}
      >
        {`${(notifications || []).length}`} 
      </Button>
      <Button
        style={styles.iconButton}
        status='control'
        size='small'
        accessoryLeft={PeopleIcon}
      >
        {`${(classmates || []).length} elever`}
      </Button>
    </View>
  )

  return (
    <Card
      style={{ ...styles.card }}
      appearance='filled'
      status={color}
      header={Header}
      footer={Footer}
      onPress={() => navigateChild(child, color)}
    >
      {([calendar ?? [], schedule ?? []].filter(a => a.startDate?.isSame('day'))).map((calendarItem, i) =>
        <Text appearance='hint' category='c1' key={i}>
          {`${calendarItem.title}`}
        </Text>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10
  },
  itemFooter: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5
  },
  iconButton: {
    paddingHorizontal: 0
  }
})
