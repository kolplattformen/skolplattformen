import React, { useEffect } from 'react'
import { StyleSheet, View, Image, SafeAreaView } from 'react-native'

import moment from 'moment'
import { Divider, Button, Icon, Layout, Text, TopNavigation, TopNavigationAction, List, Card, Avatar, Spinner } from '@ui-kitten/components'
// import children from '../output.json'
import { useAsyncStorage } from 'use-async-storage'
import { api, fillChild } from '../lib/backend'

const colors = ['primary', 'success', 'info', 'warning', 'danger']

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
  const [children, setChildren] = useAsyncStorage('@children', [])
  const [cookie] = useAsyncStorage('@cookie')
  useEffect(() => {
    let abort = false
    const load = async () => {
      try {
        const childrenList = (children?.length && children) || await api.getChildren()
        if (!childrenList?.length) {
          console.log('no children found', await api.getChildren())
          return navigation.navigate('Login', { error: 'Hittar inga barn för det personnumret' })
        }

        childrenList.forEach(async (child, i) => {
          let result
          let updatedChild = child // keep a reference to the latest updated information so we don't patch an old object
          child.loading = true
          const iter = fillChild(child)
          while (!abort && !result?.done) {
            result = await iter.next() // get updated values for every updated property
            const updated = await result.value
            childrenList[i] = updatedChild = { ...updatedChild, ...updated, loading: !result.done, updated: moment() }
            await setChildren(childrenList) // update after each new information we get. Might be too much?
          }
        })
      } catch (err) {
        console.log('err', err)
        navigation.navigate('Login', { error: 'Fel uppstod, försök igen' })
      }
    }
    if (cookie) load()
    return () => abort = true
  }, [cookie])
  return <ChildrenView navigation={navigation} childList={children} />
}

export const ChildrenView = ({ navigation, childList, eva }) => {
  const abbrevations = {
    G: 'Gymnasiet', // ? i'm guessing here
    GR: 'Grundskolan',
    F: 'Förskoleklass'
  }
  const navigateBack = () => {
    navigation.goBack()
  }

  const navigateChild = (child, color) => {
    navigation.navigate('Child', { child, color })
  }

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  const Header = (props, info, i) => (
    <View {...props} style={{ flexDirection: 'row' }}>
      <View style={{ margin: 20 }}>
        <Avatar source={require('../assets/avatar.png')} shape='square' />
      </View>
      <View style={{ margin: 20 }}>
        <Text category='h6'>
          {info.item?.name?.split('(')[0]}
        </Text>
        <Text category='s1'>
          {info.item?.classmates ? `${(info.item?.classmates || [])[0].className}` : `${info.item?.status.split(';').map(status => abbrevations[status] || status).join(', ')}`}
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
        {`${(info.item?.news || []).length}`} nyheter
      </Button>
      <Button
        style={styles.iconButton}
        status='control'
        size='small'
        accessoryLeft={CalendarIcon}
      >
        {`${(info.item?.notifications || []).filter(c => moment(c.startDate, 'YYYY-MM-DD hh:mm').isSame('day')).length} idag`}
      </Button>
      <Button
        style={styles.iconButton}
        status='control'
        size='small'
        accessoryLeft={PeopleIcon}
      >
        {`${(info.item?.classmates || []).length} elever`}
      </Button>
      <Text>{info.item?.loading}</Text>
      <Text>{info.item?.updated}</Text>
      {info.item?.loading ? <Spinner /> : <Text category='c2'>{info.item?.updated?.calendar()}</Text>}
    </View>
  )

  const renderItem = (info) => {
    const color = colors[info.index % colors.length]
    return (
      <Card
        style={{ ...styles.card }}
        appearance='filled'
        status={color}
        header={headerProps => Header(headerProps, info, info.index)}
        footer={footerProps => Footer(footerProps, info)}
        onPress={() => navigateChild(info.item, color)}
      >

        {([...info.item?.calendar ?? [], ...info.item?.schedule ?? []].filter(a => moment(a.startDate, 'YYYY-MM-DD hh:mm').isSame('day'))).map((calendarItem, i) =>
          <Text appearance='hint' category='c1' key={i}>
            {`${calendarItem.title}`}
          </Text>
        )}
      </Card>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <TopNavigation title='Dina barn' alignment='center' accessoryLeft={BackAction} />
      <Divider />
      <Layout style={{ flex: 1 }} level='1'>
        {
        childList?.length
          ? <Layout style={{ flex: 1, justifyContent: 'space-between' }}>
            <List
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
              data={childList}
              renderItem={renderItem}
            />
          </Layout>
          : <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/girls.png')} style={{ height: 400, width: '100%' }} />
            <View style={{ flexDirection: 'row' }}>
              <Spinner size='large' status='warning' />
              <Text category='h1' style={{ marginLeft: 10, marginTop: -7 }}>Laddar...</Text>
            </View>
          </Layout>
        }

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
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5
  },
  iconButton: {
    paddingHorizontal: 0
  }
})
