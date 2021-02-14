import React, { useEffect } from 'react'
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Image,
  Linking,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native'

import {
  Button,
  Icon,
  Modal,
  Card,
  Text,
  Layout,
  Input,
} from '@ui-kitten/components'
import Personnummer from 'personnummer'
import { useAsyncStorage } from 'use-async-storage'
import { useApi } from '@skolplattformen/api-hooks'

const funArguments = [
  'öppna',
  'roliga',
  'fungerande',
  'billiga',
  'snabba',
  'fria',
  'efterlängtade',
  'coolare',
  'första',
  'upplysta',
  'hemmagjorda',
  'bättre',
  'rebelliska',
  'enkla',
  'operfekta',
  'fantastiska',
  'agila',
] // TODO: add moare

export const Login = ({ navigation }) => {
  const { api, isLoggedIn } = useApi()
  const [visible, showModal] = React.useState(false)
  const [valid, setValid] = React.useState(false)
  const [argument, setArgument] = React.useState('öppna')
  const [error, setError] = React.useState(null)
  const [
    socialSecurityNumberCache,
    setSocialSecurityNumberCache,
  ] = useAsyncStorage('socialSecurityNumber')
  const [socialSecurityNumber, setSocialSecurityNumber] = React.useState(
    socialSecurityNumberCache,
  )
  const isFemale =
    Personnummer.valid(socialSecurityNumber) &&
    Personnummer.parse(socialSecurityNumber).isFemale()

  /* Initial load functions */
  useEffect(() => {
    setValid(Personnummer.valid(socialSecurityNumber))
  }, [socialSecurityNumber])

  const loginHandler = async () => {
    showModal(false)
    navigateToChildren()
  }

  useEffect(() => {
    setArgument(funArguments[Math.floor(Math.random() * funArguments.length)])
    api.on('login', loginHandler)

    return () => api.off('login', loginHandler)
  }, [])

  /* Helpers */
  const handleInput = (text) => {
    const isValid = Personnummer.valid(text)
    setValid(isValid)

    if (isValid) {
      const parsedInput = Personnummer.parse(text).format(true)
      setSocialSecurityNumber(parsedInput)
      setSocialSecurityNumberCache(parsedInput)
    } else {
      setSocialSecurityNumber(text)
    }
  }

  const openBankId = (token) => {
    try {
      const bankIdUrl =
        Platform.OS === 'ios'
          ? `https://app.bankid.com/?autostarttoken=${token.token}&redirect=null`
          : `bankid:///?autostarttoken=${token.token}&redirect=null`
      Linking.openURL(bankIdUrl)
    } catch (err) {
      setError('Öppna BankID manuellt')
    }
  }

  /* Navigation actions */
  const navigateToChildren = () => {
    navigation.navigate('Children')
  }

  const startLogin = async () => {
    showModal(true)
    const status = await api.login(socialSecurityNumber)
    if (status.token !== 'fake') {
      openBankId(status.token)
    }
    status.on('PENDING', () => console.log('BankID app not yet opened'))
    status.on('USER_SIGN', () => console.log('BankID app is open'))
    status.on(
      'ERROR',
      () =>
        setError('Inloggningen misslyckades, försök igen!') && showModal(false),
    )
    status.on('OK', () => console.log('BankID ok'))
  }

  const startLogout = async () => {
    showModal(false)
    try {
      api.logout()
    } catch (err) {
      setError('fel uppdatod vid utloggning')
    }
  }

  /* Icons */
  const SecureIcon = (style) => <Icon {...style} name="keypad-outline" />
  const CheckIcon = (style) => <Icon {...style} name="checkmark-outline" />
  const LogoutIcon = (style) => <Icon {...style} name="close-outline" />
  const PersonIcon = (style) => <Icon {...style} name="person-outline" />

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <>
            {isLoggedIn ? (
              <Layout
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                }}>
                <Text category="h2" adjustsFontSizeToFit numberOfLines={1}>
                  Öppna Skolplattformen
                </Text>
                <Text
                  category="h6"
                  style={{ color: '#9CA3AF', marginTop: 4, marginBottom: 20 }}>
                  Det {argument} alternativet
                </Text>
                {isFemale ? (
                  <Image
                    source={require('../assets/kvinna.png')}
                    style={{ maxHeight: 300, width: '100%' }}
                  />
                ) : (
                    <Image
                      source={require('../assets/man.png')}
                      style={{
                        maxHeight: 300,
                        width: '100%',
                        borderBottomWidth: 1,
                      }}
                    />
                  )}
                <View
                  style={{
                    marginTop: 32,
                  }}>
                  <Text category="h5">{socialSecurityNumber}</Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginBottom: 20,
                      marginTop: 10,
                    }}>
                    {error || 'Hurra, du är inloggad!'}
                  </Text>
                  <Button
                    status="success"
                    size="medium"
                    accessoryRight={CheckIcon}
                    onPress={() => navigateToChildren()}>
                    {error ? 'Försök igen' : 'Fortsätt'}
                  </Button>
                  <View style={{ marginTop: 10 }}>
                    <Button
                      onPress={() => startLogout()}
                      accessoryRight={LogoutIcon}
                      size="medium">
                      Logga ut
                    </Button>
                  </View>
                </View>
              </Layout>
            ) : (
                <Layout
                  style={{
                    flex: 1,
                    padding: 24,
                    justifyContent: 'center',
                  }}>
                  <View style={{ justifyContent: 'flex-end' }}>
                    <Text
                      category="h2"
                      style={{ textAlign: 'center' }}
                      adjustsFontSizeToFit
                      numberOfLines={1}>
                      Öppna Skolplattformen
                  </Text>
                    <Text
                      category="h6"
                      style={{
                        color: '#9CA3AF',
                        marginTop: 4,
                        marginBottom: 32,
                        textAlign: 'center',
                      }}>
                      Det {argument} alternativet
                  </Text>
                    <Image
                      source={require('../assets/boys.png')}
                      style={{
                        height: 320,
                        marginTop: -20,
                        marginLeft: -10,
                        width: '110%',
                      }}
                    />
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                        paddingHorizontal: 20,
                        paddingBottom: 72,
                        marginTop: 48,
                      }}>
                      <Input
                        label="Personnummer"
                        autoFocus
                        value={socialSecurityNumberCache}
                        style={{ minHeight: 70 }}
                        accessoryLeft={PersonIcon}
                        keyboardType="numeric"
                        caption={error?.message || ''}
                        onChangeText={(text) => handleInput(text)}
                        placeholder="Ditt personnr (10 eller 12 siffror)"
                      />
                      <Button
                        onPress={startLogin}
                        style={{ width: '100%' }}
                        appearence="ghost"
                        disabled={!valid}
                        status="primary"
                        accessoryRight={SecureIcon}
                        size="medium">
                        Öppna BankID
                    </Button>
                    </View>
                  </View>
                </Layout>
              )}
            <Modal
              visible={visible}
              style={styles.modal}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => showModal(false)}>
              <Card disabled>
                <Text style={{ margin: 10 }}>Väntar på BankID...</Text>

                <Button visible={!isLoggedIn} onPress={() => showModal(false)}>
                  Avbryt
                </Button>
              </Card>
            </Modal>
          </>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  modal: {
    width: '80%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})
