import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './login.component';
import { Children } from './children.component';
import { Child } from './child.component';
import { DetailsScreen } from './details.component';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode='none'>
  <Screen name='Login' component={Login}/>
  <Screen name='Children' component={Children}/>
  <Screen name='Child' component={Child}/>
  <Screen name='Details' component={DetailsScreen}/>
  
  </Navigator>
);

export const AppNavigator = (children) => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);
