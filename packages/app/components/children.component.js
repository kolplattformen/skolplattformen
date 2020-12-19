import React, {useState, useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import moment from 'moment'
import { Divider, Button, Icon, Layout, Text, TopNavigation, TopNavigationAction, List, Card, Avatar } from '@ui-kitten/components'
// import children from '../output.json'
import useAsyncStorage from '@rnhooks/async-storage'

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

export const Children = ({ navigation }) => {
  const [jwt, setJwt, clearJwt] = useAsyncStorage('@jwt')
  const headers = {authorization: 'Bearer ' + jwt}
  const [children, setChildren] = useState([])

  useEffect(useCallback(() => {
    fetch(`${baseUrl}/children/`, {headers}).then(res => res.json()).then(children => {
      // TODO: performance
      Promise.all((children || [] ).map(async child => ({
        ...child,
        classmates: await fetch(`${baseUrl}/children/${child.sdsId}/classmates`, {headers}).then(res => res.json()),
        news: await fetch(`${baseUrl}/children/${child.id}/news`, {headers}).then(res => res.json()),
        calendar: await fetch(`${baseUrl}/children/${child.id}/calendar`, {headers}).then(res => res.json()),
        schedule: await fetch(`${baseUrl}/children/${child.sdsId}/schedule`, {headers}).then(res => res.json()),
        menu: await fetch(`${baseUrl}/children/${child.id}/menu`, {headers}).then(res => res.json()),
        notifications: await fetch(`${baseUrl}/children/${child.sdsId}/notifications`, {headers}).then(res => res.json())
      }))).then(children => console.log(children) || setChildren(children))
    })

    return () => {
      console.log('when?')
    }
  }, [jwt]))

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
    <View {...props}>
      <Text category='h6'>
        {info.item.name.split('(')[0]}
      </Text>
      <Text category='s1'>
        {`${info.item.status.split(';').map(status => abbrevations[status] || status).join(', ')}`}
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
        {`${(info.item.news || []).length}`}
      </Button>
      <Button
        style={styles.iconButton}
        status='control'
        size='small'
        accessoryLeft={CalendarIcon}>
        {`${(info.item.notifications || []).filter(c => moment(c.startDate).isSame('day') ).length}`}
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

  const renderItem = (info) => (
    <Card
      style={styles.card}
      header={headerProps => Header(headerProps, info)}
      footer={footerProps => Footer(footerProps, info)}
      onPress={() => navigateChild(info.item)}>
      {(info.item.menu || []).map((menu, i) => <Text appearance='hint' category='c1' key={i}>
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
        {children.length ? <List
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={children}
          renderItem={renderItem} />
          : <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text category='h1'>Laddar...</Text>
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
