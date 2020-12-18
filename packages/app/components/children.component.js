import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native'
import moment from 'moment'
import { Divider, Button, Icon, Layout, Text, TopNavigation, TopNavigationAction, List, Card, Avatar } from '@ui-kitten/components'
import children from '../output.json'

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

export const Children = ({ navigation }) => {

  const abbrevations = {
    G: 'Gymnasiet',
    GR: 'Grundskolan',
    F: 'Förskoleklass',
  }
  const navigateBack = () => {
    navigation.goBack()
  }

  const navigateChild = (child) => {
    navigation.navigate('Child', {child})
  }

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  const Header = (props, info) => (
    <View {...props}>
      <Text category='h6'>
        {info.item.name.split('(')[0]}
      </Text>
      <Text category='s1'>
        {`${info.item.status.split(';').map(status => abbrevations[status]).join(', ')}`}
      </Text>
    </View>
  )

  const Footer = (props, info) => (
    <View style={styles.itemFooter}>
      <Button
        style={styles.iconButton}
        status='control'
        size='small'
        accessoryLeft={NotificationIcon}>
        {`${info.item.news.length}`}
      </Button>
      <Button
        style={styles.iconButton}
        status='control'
        size='small'
        accessoryLeft={CalendarIcon}>
        {`${info.item.notifications.filter(c => moment(c.startDate).isSame('day') ).length}`}
      </Button>
      <Button
        style={styles.iconButton}
        status='control'
        size='small'
        accessoryLeft={PeopleIcon}>
        {`${info.item.classmates.length} i klassen`}
      </Button>
    </View>
  )

  const renderItem = (info) => (
    <Card 
      style={styles.card} 
      header={headerProps => Header(headerProps, info)} 
      footer={footerProps => Footer(footerProps, info)}
      onPress={() => navigateChild(info.item)}>
      {info.item.menu.map(menu => 
        <Text appearance='hint' category='c1'>
        {`${menu.title.split(' -')[0]} - ${menu.description.split('<br/>')[0]}`}
        </Text>
      )}
    </Card>
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Dina barn' alignment='center' accessoryLeft={BackAction} />
      <Divider/>
      <Layout style={{ flex: 1}} level='1'>
        <List
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={children}
          renderItem={renderItem} />
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    flex: 1,
    margin: 10
  },
  itemDescription: {
    zIndex: 1,
    marginVertical: 16
  },
  itemFooter: {
    flexDirection: 'row',
    paddingHorizontal: 12
  },
  iconButton: {
    paddingHorizontal: 0
  }
})
