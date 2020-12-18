import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import {Linking} from 'react-native'
import { Button, Icon, Modal, Card, Text, Image, Divider, Layout, TopNavigation, Input } from '@ui-kitten/components';
import Personnummer from 'personnummer'
import useAsyncStorage from '@rnhooks/async-storage';

const baseUrl = 'https://api.skolplattformen.org'
const funArguments = ['öppna', 'roliga', 'fungerande', 'billiga', 'snabba', 'fria', 'efterlängtade', 'coolare', 'första', 'upplysta', 'hemmagjorda', 'bättre', 'rebelliska', 'enkla', 'operfekta', 'fantastiska'] // TODO: add moare

export const Login = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [valid, setValid] = React.useState(false);
  const [argument, setArgument] = React.useState('öppna');
  const [error, setError] = React.useState(null);
  const [hasBankId, setHasBankId] = React.useState(false);
  const [socialSecurityNumber, setSocialSecurityNumber, clearSocialSecurityNumber] = useAsyncStorage('@socialSecurityNumber')
  const [jwt, setJwt, clearJwt] = useAsyncStorage('@jwt')

  useFocusEffect(() => {
    setArgument(funArguments[Math.floor(Math.random() * funArguments.length)])
    setValid(Personnummer.valid(socialSecurityNumber))
    //setHasBankId(Linking.canOpenUrl('bankid://'))
  }, [socialSecurityNumber])

  const navigateDetails = (children) => {
    console.log('continuing..')
    navigation.navigate('Children', {children});
  };

  const SecureIcon = (style) => (
    <Icon {...style} name='keypad-outline' />
  ) 
  const CheckIcon = (style) => (
    <Icon {...style} name='checkmark-outline' />
  ) 
  const LogoutIcon = (style) => (
    <Icon {...style} name='close-outline' />
  ) 
  const PersonIcon = (style) => (
    <Icon {...style} name='person-outline' />
  )

  const handleInput = (text) => {
    const isValid = Personnummer.valid(text)
    setValid(isValid)

    if (isValid) {
      const parsedInput = Personnummer.parse(text).format(true)
      setSocialSecurityNumber(parsedInput)
    } else {
      setSocialSecurityNumber(text)
    }
  }

  const startLogin = async () => {
      if (jwt) return navigateDetails([])
    /*setVisible(true)
    try {
      console.log('requesting login for', socialSecurityNumber)
      const token = await fetch(`${baseUrl}/login?socialSecurityNumber=${socialSecurityNumber}`, {method: 'POST'}).then(res => res.json())

      console.log('got token', token)
      if (hasBankId) Linking.openURL(`bankid:///?autostarttoken=${token.token}`)
      const jwt = await fetch(`${baseUrl}/login/${token.order}/jwt`, {timeoutInterval: 60000}).then(res => res.json())
      console.log('got jwt', jwt)
      await setJwt(jwt)
      console.log('requesting children...')
      const children = await getChildren(jwt)
      console.log('navigating to details...', children)
    } catch (err) {
      console.error(err)
      setError(err.message)
    }*/
  }

  // TODO - move this logic to other file than login...
  const getChildren = async (jwt) => {
    const headers = {authorization: 'Bearer ' + jwt}
    try {
      console.log('requesting children...', {headers})
      const children = await fetch(`${baseUrl}/children`, {headers}).then(res => res.json())
      console.log('got children', children)
      return children
    } catch (err) {
      setError(children.err)
    }
  }

  const logout = async () => {
    setVisible(false)
    clearJwt()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title={`Skolplattformen.org - det ${argument} alternativet`} alignment='center'/>

      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', padding: 20}}>
        <Text category="h3">Vårdnadshavare</Text>
        <Input label='Personnummer' autoFocus={true} value={socialSecurityNumber}
          accessoryLeft = {PersonIcon}
          caption={error && error.message || ''}
          onChangeText = {text => handleInput(text)}
          placeholder="Ditt personnr (12 siffror)"/>
        <Button onPress={startLogin} style={{marginTop: 7, width: "100%"}} 
          appearence='ghost' 
          disabled={!valid}
          status='primary'
          accessoryRight={SecureIcon}
          size='medium'>
          Öppna BankID
        </Button>
      </Layout>
      <Modal
        visible={visible}
        style={styles.modal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          {hasBankId ? <Text style={{margin: 10}}>Öppnar BankID. Växla tillbaka till denna app sen.</Text> : <Text style={{margin: 10}}>Väntar på BankID...</Text>}
          <Button 
            visible={!jwt}
            onPress={() => setVisible(false)}>
            Avbryt
          </Button>
          <Button onPress={logout} style={{marginTop: 7}} 
            disabled={!jwt}
            status='danger'
            
            accessoryLeft={LogoutIcon}
            size='medium'>
            Logga ut
          </Button>
          <Button onPress={navigateDetails} style={{marginTop: 7}} 
            disabled={!jwt}
            status='success'
            accessoryRight={CheckIcon}
            size='medium'>
            Fortsätt
          </Button>
        </Card>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  modal: {
    width: "80%"
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});