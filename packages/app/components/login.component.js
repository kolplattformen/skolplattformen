import { useApi } from '@skolplattformen/api-hooks'
import {
  Button,
  ButtonGroup,
  Card,
  Input,
  Modal,
  Text,
} from '@ui-kitten/components'
import Personnummer from 'personnummer'
import React, { useEffect, useState } from 'react'
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from 'react-native'
import { useAsyncStorage } from 'use-async-storage'
import { schema } from '../app.json'
import {
  CloseOutlineIcon,
  PersonIcon,
  SecureIcon,
  SelectIcon,
} from './icon.component'
import ActionSheet from 'rn-actionsheet-module'

const { width } = Dimensions.get('window')

export const Login = ({ navigation }) => {
  const { api, isLoggedIn } = useApi()
  const [visible, showModal] = useState(false)
  const [error, setError] = useState(null)
  const [cachedSsn, setCachedSsn] = useAsyncStorage('socialSecurityNumber', '')
  const [socialSecurityNumber, setSocialSecurityNumber] = useState('')
  const [valid, setValid] = useState(false)
  const [loginMethodIndex, setLoginMethodIndex] = useState(0)
  const [cachedLoginMethodIndex, setCachedLoginMethodIndex] = useAsyncStorage(
    'loginMethodIndex',
    '0'
  )
  const loginMethods = [
    'Öppna BankID på denna enhet',
    'Öppna BankID på annan enhet',
    'Logga in som testanvändare',
  ]
  const selectLoginMethod = () => {
    const options = {
      title: 'Välj inloggningsmetod',
      optionsIOS: loginMethods,
      optionsAndroid: loginMethods,
      onCancelAndroidIndex: loginMethodIndex,
    }
    ActionSheet(options, (index) => setLoginMethodIndex(index))
  }
  useEffect(() => {
    if (loginMethodIndex !== parseInt(cachedLoginMethodIndex, 10)) {
      setCachedLoginMethodIndex(loginMethodIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginMethodIndex])
  useEffect(() => {
    if (loginMethodIndex !== parseInt(cachedLoginMethodIndex, 10)) {
      setLoginMethodIndex(parseInt(cachedLoginMethodIndex, 10))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedLoginMethodIndex])

  /* Initial load functions */
  useEffect(() => {
    setValid(Personnummer.valid(socialSecurityNumber))
  }, [socialSecurityNumber])

  useEffect(() => {
    if (cachedSsn && socialSecurityNumber !== cachedSsn) {
      setSocialSecurityNumber(cachedSsn)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedSsn])

  const loginHandler = async () => {
    showModal(false)
    navigateToChildren()
  }

  useEffect(() => {
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
      const redirect = loginMethodIndex === 0 ? encodeURIComponent(schema) : ''
      const bankIdUrl =
        Platform.OS === 'ios'
          ? `https://app.bankid.com/?autostarttoken=${token}&redirect=${redirect}`
          : `bankid:///?autostarttoken=${token}&redirect=null`
      Linking.openURL(bankIdUrl)
    } catch (err) {
      setError('Öppna BankID manuellt')
    }
  }

  /* Navigation actions */
  const navigateToChildren = () => {
    navigation.navigate('Children')
  }

  const startLogin = async (text) => {
    if (loginMethodIndex < 2) {
      showModal(true)
      const ssn = Personnummer.parse(text).format(true)
      setCachedSsn(ssn)
      setSocialSecurityNumber(ssn)
      const status = await api.login(ssn)
      if (status.token !== 'fake' && loginMethodIndex === 0) {
        openBankId(status.token)
      }
      status.on('PENDING', () => console.log('BankID app not yet opened'))
      status.on('USER_SIGN', () => console.log('BankID app is open'))
      status.on(
        'ERROR',
        () =>
          setError('Inloggningen misslyckades, försök igen!') &&
          showModal(false)
      )
      status.on('OK', () => console.log('BankID ok'))
    } else {
      await api.login('201212121212')
    }
  }

  const clearInput = (props) => (
    <TouchableWithoutFeedback onPress={() => handleInput('')}>
      <CloseOutlineIcon {...props} />
    </TouchableWithoutFeedback>
  )

  return (
    <>
      <Image source={require('../assets/boys.png')} style={styles.image} />
      <View style={styles.loginForm}>
        {loginMethodIndex !== 2 && (
          <Input
            label="Personnummer"
            autoFocus
            value={socialSecurityNumber}
            style={styles.pnrInput}
            accessoryLeft={PersonIcon}
            accessoryRight={clearInput}
            keyboardType="numeric"
            onSubmitEditing={(event) => startLogin(event.nativeEvent.text)}
            caption={error?.message || ''}
            onChangeText={(text) => handleInput(text)}
            placeholder="Ditt personnr"
          />
        )}
        <ButtonGroup style={styles.loginButtonGroup}>
          <Button
            onPress={() => startLogin(socialSecurityNumber)}
            style={styles.loginButton}
            appearence="ghost"
            disabled={loginMethodIndex !== 2 && !valid}
            status="primary"
            accessoryLeft={SecureIcon}
            size="medium"
          >
            <Text adjustsFontSizeToFit style={styles.loginButtonText}>
              {loginMethods[loginMethodIndex]}
            </Text>
          </Button>
          <Button
            onPress={selectLoginMethod}
            style={styles.loginMethodButton}
            appearence="ghost"
            status="primary"
            accessoryLeft={SelectIcon}
            size="medium"
          />
        </ButtonGroup>
      </View>
      <Modal
        visible={visible}
        style={styles.modal}
        backdropStyle={styles.modalBackdrop}
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
  )
}

const styles = StyleSheet.create({
  image: {
    height: ((width * 0.9) / 4) * 3,
    marginVertical: 16,
    width: width * 0.9,
  },
  loginForm: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  pnrInput: { minHeight: 70 },
  loginButtonGroup: {
    minHeight: 45,
  },
  loginButton: { flex: 1 },
  loginButtonText: { color: '#fff' },
  loginMethodButton: { width: 45 },
  modal: {
    width: '80%',
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bankIdLoading: { margin: 10 },
})
