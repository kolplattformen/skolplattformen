import React, {useState, useMemo, useCallback, useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native'
import useFetch from 'use-http'
import moment from 'moment'
import { Divider, Button, Icon, Layout, Text, TopNavigation, TopNavigationAction, List, Card, Avatar, Spinner } from '@ui-kitten/components'
// import children from '../output.json'
import useAsyncStorage from '@rnhooks/async-storage'
import {api} from '../lib/backend'

const baseUrl = 'https://api.skolplattformen.org'

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

export const Children = ({navigation}) => {
  const [savedChildren, setSavedChildren, clearSavedChildren] = useAsyncStorage('@children', '[]')
  const [children, setChildren] = useState(JSON.parse(savedChildren) || []) 

  useEffect(() => {
    const load = async () => {
      try {
        const children = await api.getChildren()
        console.log('got children', children)
        //setChildren(children) 

        //TODO: lazy load these 
        const fullChildren = await Promise.all(children.map(async child => ({
          ...child,
          news: await api.getNews(child),
          calendar: await api.getCalendar(child),
          classmates: await api.getClassmates(child),
          schedule: await api.getSchedule(child, moment().startOf('day'), moment().add(7,'days').endOf('day')),
          menu: await api.getMenu(child),
          notifications:  await api.getNotifications(child),
        })))
        console.log('full', fullChildren)
        setChildren(fullChildren)
        setSavedChildren(JSON.stringify(savedChildren))
  
      } catch (err) {
        console.error('error when loading data', err)
        navigation.navigate('Login')
      }
    }
    load()
  }, [])

  return <ChildrenView navigation={navigation} children={children}></ChildrenView>
}


export const ChildrenView = ({ navigation, children }) => {

  

  const abbrevations = {
    G: 'Gymnasiet', // ? i'm guessing here
    GR: 'Grundskolan',
    F: 'Förskoleklass'
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
    <View {...props} style={{flexDirection: 'row', backgroundColor: '#FFD8D6'}}>
      <View style={{margin: 20}}>
        <Avatar source={require('../assets/avatar.png')} />
      </View>
      <View style={{margin: 20}}>
        <Text category='h6'>
          {info.item.name?.split('(')[0]}
        </Text>
        <Text category='s1'>
          {info.item.classmates ? `${(info.item.classmates || [])[0].className}` : `${info.item.status.split(';').map(status => abbrevations[status] || status).join(', ')}`}
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
        accessoryLeft={NotificationIcon}>
        {`${(info.item.news || []).length}`}
      </Button>
      <Button
        style={styles.iconButton}
        status='control'
        size='small'
        accessoryLeft={CalendarIcon}>
        {`${(info.item.notifications || []).filter(c => moment(c.startDate).isSame('day') ).length} idag`}
      </Button>
      <Button
        style={styles.iconButton}
        status='control'
        size='small'
        accessoryLeft={PeopleIcon}>
        {`${(info.item.classmates || []).length} i klassen`}
      </Button>
    </View>
  )

  const renderItem = (info) => {
    return <Card
      style={styles.card}
      header={headerProps => Header(headerProps, info)}
      footer={footerProps => Footer(footerProps, info)}
      onPress={() => navigateChild(info.item)}>
      
      {([...info.item.calendar, ...info.item.schedule].filter(a => moment(a.startDate).isSame('day'))).map((calendarItem, i) => <Text appearance='hint' category='c1' key={i}>
                                         {`${calendarItem.title}`}
                                       </Text>
       )}
    </Card>
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavigation title='Dina barn' alignment='center' accessoryLeft={BackAction} />
      <Divider/>
      <Layout style={{ flex: 1}} level='1'>
        {children.length ? <List
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={children}
          renderItem={renderItem} />
          : <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../assets/undraw_teaching_f1cm.png')} style={{height: 400, width: '100%'}}></Image>
              <View style={{flexDirection: 'row'}}>
                <Spinner size='large'/>
                <Text category='h1' style={{marginLeft: 10, marginTop: -7}}>Laddar...</Text>
              </View>
            </Layout>}
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
    marginVertical: 16
  },
  loading: {
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
