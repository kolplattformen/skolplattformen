import React from 'react'
import { StyleSheet } from 'react-native';
import { TabBar, TopNavigation, TopNavigationAction, Tab, TabView, OverflowMenu, MenuItem, Layout, Text, Divider, Icon } from '@ui-kitten/components'
import { NewsList } from './newsList.component'
import { Calendar } from './calendar.component'
import { Classmates } from './classmates.component'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment'

export const Child = ({route, navigation}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const { child, color } = route.params;
  const [menuVisible, setMenuVisible] = React.useState(false);

  const NewsIcon = (props) => (
    <Icon {...props} name='activity-outline'/>
  )
  const CalendarIcon = (props) => (
    <Icon {...props} name='calendar-outline'/>
  )

  const ClassIcon = (props) => (
    <Icon {...props} name='people-outline'/>
  )

  const EditIcon = (props) => (
    <Icon {...props} name='edit'/>
  )
  const SettingsIcon = (props) => (
    <Icon {...props} name='options-2-outline'/>
  )
  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  )

  const MenuIcon = (props) => (
    <Icon {...props} name='more-vertical'/>
  )

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )
  
  const navigateBack = () => {
    navigation.goBack()
  }



  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  )

  const renderRightActions = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={SettingsIcon} title='Anmäl frånvaro'/>
      </OverflowMenu>
    </React.Fragment>
  );

  return (
    <SafeAreaView style={{ flex: 1 }} style={{...styles.topBar, color: color}}>
      <TopNavigation title={ child.name} 
        alignment='center' 
        accessoryLeft={BackAction}
        accessoryRight={renderRightActions}
        style={styles.topBar}/>
      <TabView selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)}>
        <Tab title="Nyheter" icon={NewsIcon}>
          <Layout style={styles.tabContainer}>
            <NewsList news={child.news} />
          </Layout>
        </Tab>
        <Tab title="Schema" icon={CalendarIcon}>
          <Layout style={styles.tabContainer}>
            <Calendar calendar={[...child.calendar, ...child.schedule].filter(a => moment(a.startDate, 'YYYY-MM-DD hh:mm').isAfter(moment().startOf('day')) ) }></Calendar>
          </Layout>
        </Tab>
        <Tab title="Klassen" icon={ClassIcon}>
          <Layout style={styles.tabContainer}>
            <Text category='h5'>
              Klass {child.classmates?.length ? child.classmates[0].className : ''}
            </Text>
            <Classmates classmates={child.classmates}/>
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
    paddingTop: 10,
    paddingLeft: 10,
    flexDirection: 'column'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})