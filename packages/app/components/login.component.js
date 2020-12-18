import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';

export const Login = ({ navigation }) => {

  const navigateDetails = () => {
    navigation.navigate('Children');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Skolplattformen' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={navigateDetails}>Login</Button>
      </Layout>
    </SafeAreaView>
  );
};