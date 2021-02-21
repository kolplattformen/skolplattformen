import { useApi } from '@skolplattformen/api-hooks'
import { Button, Card, Input, Layout, Modal, Text } from '@ui-kitten/components'
import Personnummer from 'personnummer'
import React from 'react'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useAsyncStorage } from 'use-async-storage'
import { schema } from '../app.json'
import {
  CheckIcon,
  CloseOutlineIcon,
  PersonIcon,
  SecureIcon,
} from './icon.component'

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
  const [argument, setArgument] = React.useState('öppna')
  const [error, setError] = React.useState(null)
  const [cachedSsn, setCachedSsn] = useAsyncStorage('socialSecurityNumber', '')
  const [socialSecurityNumber, setSocialSecurityNumber] = React.useState('')
  const isFemale =
    Personnummer.valid(socialSecurityNumber) &&
    Personnummer.parse(socialSecurityNumber).isFemale()
  const [valid, setValid] = React.useState(false)

  /* Initial load functions */
  React.useEffect(() => {
    setValid(Personnummer.valid(socialSecurityNumber))
  }, [socialSecurityNumber])
  React.useEffect(() => {
    if (cachedSsn && socialSecurityNumber !== cachedSsn) {
      setSocialSecurityNumber(cachedSsn)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedSsn])

  const loginHandler = async () => {
    showModal(false)
    navigateToChildren()
  }

  React.useEffect(() => {
    setArgument(funArguments[Math.floor(Math.random() * funArguments.length)])
    api.on('login', loginHandler)

    return () => api.off('login', loginHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Helpers */
  const handleInput = (text) => {
    setValid(Personnummer.valid(text))
    setCachedSsn(text)
    setSocialSecurityNumber(text)
  }

  const openBankId = (token) => {
    try {
      const bankIdUrl =
        Platform.OS === 'ios'
          ? `https://app.bankid.com/?autostarttoken=${
              token.token
            }&redirect=${encodeURIComponent(schema)}`
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

  const ssnValue = socialSecurityNumber || cachedSsn

  const startLogin = async (text) => {
    showModal(true)
    const ssn = Personnummer.parse(text).format(true)
    setCachedSsn(ssn)
    setSocialSecurityNumber(ssn)
    const status = await api.login(ssn)
    if (status.token !== 'fake') {
      openBankId(status.token)
    }
    status.on('PENDING', () => console.log('BankID app not yet opened'))
    status.on('USER_SIGN', () => console.log('BankID app is open'))
    status.on(
      'ERROR',
      () =>
        setError('Inloggningen misslyckades, försök igen!') && showModal(false)
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

  const clearInput = (props) => (
    <TouchableWithoutFeedback onPress={() => handleInput('')}>
      <CloseOutlineIcon {...props} />
    </TouchableWithoutFeedback>
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          <>
            {isLoggedIn ? (
              <Layout style={styles.loggedInWrap}>
                <Text category="h2" adjustsFontSizeToFit numberOfLines={1}>
                  Öppna Skolplattformen
                </Text>
                <Text category="h6" style={styles.subtitle}>
                  Det {argument} alternativet
                </Text>
                {isFemale ? (
                  <Image
                    source={require('../assets/kvinna.png')}
                    style={styles.loggedInImage}
                  />
                ) : (
                  <Image
                    source={require('../assets/man.png')}
                    style={styles.loggedInImage}
                  />
                )}
                <View style={styles.loggedInContent}>
                  <Text category="h5">{ssnValue}</Text>
                  <Text style={styles.loggedInText}>
                    {error || 'Hurra, du är inloggad!'}
                  </Text>
                  <Button
                    status="success"
                    size="medium"
                    accessoryRight={CheckIcon}
                    onPress={() => navigateToChildren()}
                  >
                    {error ? 'Försök igen' : 'Fortsätt'}
                  </Button>
                  <View style={styles.logoutButton}>
                    <Button
                      onPress={() => startLogout()}
                      accessoryRight={CloseOutlineIcon}
                      size="medium"
                    >
                      Logga ut
                    </Button>
                  </View>
                </View>
              </Layout>
            ) : (
              <Layout style={styles.loginWrap}>
                <View style={styles.loginContent}>
                  <Text
                    category="h2"
                    style={styles.title}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                  >
                    Öppna Skolplattformen
                  </Text>
                  <Text category="h6" style={styles.subtitle}>
                    Det {argument} alternativet
                  </Text>
                  <Image
                    source={require('../assets/boys.png')}
                    style={styles.boysImage}
                  />
                  <View style={styles.socialSecurityNumberWrap}>
                    <Input
                      label="Personnummer"
                      autoFocus
                      value={ssnValue}
                      style={styles.socialSecurityNumber}
                      accessoryLeft={PersonIcon}
                      accessoryRight={clearInput}
                      keyboardType="numeric"
                      onSubmitEditing={async (event) =>
                        await startLogin(event.nativeEvent.text)
                      }
                      caption={error?.message || ''}
                      onChangeText={(text) => handleInput(text)}
                      placeholder="Ditt personnr"
                    />
                    <Button
                      onPress={async () =>
                        await startLogin(socialSecurityNumber)
                      }
                      style={styles.bankIdButton}
                      appearence="ghost"
                      disabled={!valid}
                      status="primary"
                      accessoryRight={SecureIcon}
                      size="medium"
                    >
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
              onBackdropPress={() => showModal(false)}
            >
              <Card disabled>
                <Text style={styles.bankIdLoading}>Väntar på BankID...</Text>

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
  keyboardAvoidingView: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: {
    minHeight: 192,
  },
  modal: {
    width: '80%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: { textAlign: 'center' },
  subtitle: {
    color: '#9CA3AF',
    marginTop: 4,
    marginBottom: 32,
    textAlign: 'center',
  },
  boysImage: {
    height: 320,
    marginTop: -20,
    marginLeft: -10,
    width: '110%',
  },
  socialSecurityNumberWrap: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 72,
    marginTop: 48,
  },
  socialSecurityNumber: { minHeight: 70 },
  bankIdButton: { width: '100%' },
  bankIdLoading: { margin: 10 },

  loggedInWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loggedInImage: {
    maxHeight: 300,
    width: '100%',
  },
  loggedInText: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  loggedInContent: {
    marginTop: 32,
  },
  logoutButton: { marginTop: 10 },

  loginWrap: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  loginContent: { justifyContent: 'flex-end' },
})
