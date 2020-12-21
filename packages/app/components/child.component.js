import React from 'react'
import { StyleSheet } from 'react-native';
import { TabBar, TopNavigation, TopNavigationAction, Tab, TabView, Layout, Text, Divider, Icon } from '@ui-kitten/components'
import { NewsList } from './newsList.component'
import { Calendar } from './calendar.component'
import { Classmates } from './classmates.component'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment'

export const Child = ({route, navigation}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const { child } = route.params;

  const NewsIcon = (props) => (
    <Icon {...props} name='activity-outline'/>
  )
  const CalendarIcon = (props) => (
    <Icon {...props} name='calendar-outline'/>
  )

  const ClassIcon = (props) => (
    <Icon {...props} name='people-outline'/>
  )

  const SettingsIcon = (props) => (
    <Icon {...props} name='options-2-outline'/>
  )

  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  )
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )
  
  const navigateBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1 }} style={styles.topBar}>
      <TopNavigation title={ child.name} alignment='center' accessoryLeft={BackAction} style={styles.topBar}/>
      <TabView selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)}>
        <Tab title="Nyheter" icon={NewsIcon}>
          <Layout style={styles.tabContainer}>
            <NewsList news={child.news} />
          </Layout>
        </Tab>
        <Tab title="Schema" icon={CalendarIcon}>
          <Layout style={styles.tabContainer}>
            <Calendar calendar={[...child.calendar, ...child.schedule].filter(a => moment(a.startDate).isAfter(moment().startOf('day')) ) }></Calendar>
          </Layout>
        </Tab>
        <Tab title="Klassen" icon={ClassIcon}>
          <Layout style={styles.tabContainer}>
            <Text category='h5'>
              Klass {child.classmates.length ? child.classmates[0].className : ''}
            </Text>
            <Classmates classmates={child.classmates}/>
          </Layout>
        </Tab>
        <Tab title="Inställningar" icon={SettingsIcon}>
          <Layout style={styles.tabContainer}>
            <Text category='h5'>
              Inställningar
            </Text>
            <Text category='c2'>
              Här kommer du kunna sjukanmäla och göra andra bra grejer...
            </Text>
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 5,
    paddingLeft: 10,
    flexDirection: 'column'
  },
})