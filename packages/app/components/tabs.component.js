import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';
import { ChildList } from './childList.component';
import { DetailsScreen } from './details.component';

const { Navigator, Screen } = createMaterialTopTabNavigator();

const ChildScreen = ({data}) => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>Nyheter</Text>
  </Layout>
);

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title='Nyheter'/>
    <Tab title='Klassen'/>
  </TabBar>
);

const TabNavigator = ({children}) => (
  <Navigator tabBar={props => <TopTabBar {...props} />}>
    <Screen name='Child' component={ChildScreen} data={children}/>
    <Screen name='Class' component={DetailsScreen}/>
  </Navigator>
);

export const AppNavigator = ({children}) => (
  <NavigationContainer>
    <TabNavigator children={children }/>
  </NavigationContainer>
);