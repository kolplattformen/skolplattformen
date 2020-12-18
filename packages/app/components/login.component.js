import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import {Linking} from 'react-native'
import { Button, Icon, Modal, Card, Text, ImageBackground, Divider, Layout, TopNavigation, Input } from '@ui-kitten/components';
import Personnummer from 'personnummer'
import useAsyncStorage from '@rnhooks/async-storage';

const baseUrl = 'https://api.skolplattformen.org'
const funArguments = ['öppna', 'roliga', 'fungerande', 'billiga', 'snabba', 'fria', 'efterlängtade', 'coolare', 'första', 'upplysta', 'hemmagjorda', 'bättre', 'rebelliska', 'enkla', 'operfekta', 'fantastiska', 'agila'] // TODO: add moare

export const Login = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [valid, setValid] = React.useState(false);
  const [argument, setArgument] = React.useState('öppna');
  const [error, setError] = React.useState(null);
  const [hasBankId, setHasBankId] = React.useState(false);
  const [socialSecurityNumber, setSocialSecurityNumber, clearSocialSecurityNumber] = useAsyncStorage('@socialSecurityNumber')
  const [jwt, setJwt, clearJwt] = useAsyncStorage('@jwt')

  useEffect(() => {
    setValid(Personnummer.valid(socialSecurityNumber))
    // setHasBankId(Linking.canOpenUrl('bankid://'))
  }, [socialSecurityNumber])

  useEffect(() => {
    setArgument(funArguments[Math.floor(Math.random() * funArguments.length)])
  }, [])

  const navigateToChildren = (children) => {
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
    setVisible(true)
    try {
      console.log('requesting login for', socialSecurityNumber)
      const token = await fetch(`${baseUrl}/login?socialSecurityNumber=${socialSecurityNumber}`, {method: 'POST'}).then(res => res.json())

      console.log('got token', token)
      if (hasBankId) Linking.openURL(`bankid:///?autostarttoken=${token.token}`)
      const jwt = await fetch(`${baseUrl}/login/${token.order}/jwt`, {timeoutInterval: 60000}).then(res => res.ok ? res : Promise.reject(res.json())).then(res => res.json())
      console.log('got jwt', jwt)
      await setJwt(jwt)
      setVisible(false)
      if (jwt) return navigateToChildren([])
  } catch (err) {
      console.error(err)
      setError(err.message || err)
    }
  }

  const logout = async () => {
    setVisible(false)
    clearJwt()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title={`Skolplattformen.org - det ${argument} alternativet`} alignment='center'/>
      {jwt ? <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', padding: 20}}>
        <Text category="h3">{socialSecurityNumber}</Text>
        <Button 
          onPress={() => logout()}>
          Logga ut
        </Button>

        <Button
          status="success"
          accessoryRight = {CheckIcon}
          onPress={() => navigateToChildren()}>
          Fortsätt
        </Button>
      </Layout>
      : <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', padding: 20}}>
            <Text category="h3">Vårdnadshavare</Text>
            <Input label='Personnummer' autoFocus={true} value={socialSecurityNumber}
              accessoryLeft = {PersonIcon}
              caption={error && error.message || ''}
              onChangeText = {text => handleInput(text)}
              placeholder="Ditt personnr (10 eller 12 siffror)"/>
            <Button onPress={startLogin} style={{marginTop: 7, width: "100%"}} 
              appearence='ghost' 
              disabled={!valid}
              status='primary'
              accessoryRight={SecureIcon}
              size='medium'>
              Öppna BankID
            </Button>
          </Layout>
        }
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