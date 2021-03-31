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
} from 'react-native'
import ActionSheet from 'rn-actionsheet-module'
import { useAsyncStorage } from 'use-async-storage'
import { schema } from '../app.json'
import { Colors, Layout, Sizing } from '../styles'
import {
  CloseOutlineIcon,
  PersonIcon,
  SecureIcon,
  SelectIcon,
} from './icon.component'

export const Login = () => {
  const { api } = useApi()
  const [cancelLoginRequest, setCancelLoginRequest] = useState<
    (() => Promise<void>) | (() => null)
  >(() => () => null)
  const [visible, showModal] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
    ActionSheet(options, (index: number) => setLoginMethodIndex(index))
  }
  useEffect(() => {
    if (loginMethodIndex !== parseInt(cachedLoginMethodIndex, 10)) {
      setCachedLoginMethodIndex(loginMethodIndex.toString())
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
  }

  useEffect(() => {
    api.on('login', loginHandler)
    return () => {
      api.off('login', loginHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Helpers */
  const handleInput = (text: string) => {
    setValid(Personnummer.valid(text))
    setCachedSsn(text)
    setSocialSecurityNumber(text)
  }

  const openBankId = (token: string) => {
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

  const startLogin = async (text: string) => {
    if (loginMethodIndex < 2) {
      showModal(true)
      const ssn = Personnummer.parse(text).format(true)
      setCachedSsn(ssn)
      setSocialSecurityNumber(ssn)
      const status = await api.login(ssn)
      setCancelLoginRequest(() => () => status.cancel())
      if (status.token !== 'fake' && loginMethodIndex === 0) {
        openBankId(status.token)
      }
      status.on('PENDING', () => console.log('BankID app not yet opened'))
      status.on('USER_SIGN', () => console.log('BankID app is open'))
      status.on('ERROR', () => {
        setError('Inloggningen misslyckades, försök igen!')
        showModal(false)
      })
      status.on('OK', () => console.log('BankID ok'))
    } else {
      await api.login('201212121212')
    }
  }

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
            accessoryRight={(props) => (
              <TouchableWithoutFeedback onPress={() => handleInput('')}>
                <CloseOutlineIcon {...props} />
              </TouchableWithoutFeedback>
            )}
            keyboardType="numeric"
            onSubmitEditing={(event) => startLogin(event.nativeEvent.text)}
            caption={error || ''}
            onChangeText={(text) => handleInput(text)}
            placeholder="Ditt personnr"
          />
        )}
        <ButtonGroup style={styles.loginButtonGroup}>
          <Button
            onPress={() => startLogin(socialSecurityNumber)}
            style={styles.loginButton}
            appearance="ghost"
            disabled={loginMethodIndex !== 2 && !valid}
            status="primary"
            accessoryLeft={SecureIcon}
            size="medium"
          >
            {loginMethods[loginMethodIndex]}
          </Button>
          <Button
            onPress={selectLoginMethod}
            style={styles.loginMethodButton}
            appearance="ghost"
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

          <Button
            onPress={() => {
              cancelLoginRequest()
              showModal(false)
            }}
          >
            Avbryt
          </Button>
        </Card>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    ...Sizing.aspectRatio(0.9, Sizing.Ratio['4:3']),
    marginVertical: Sizing.t4,
  },
  loginForm: {
    ...Layout.mainAxis.flexStart,
    ...Layout.crossAxis.flexEnd,
    paddingHorizontal: Sizing.t5,
  },
  pnrInput: { minHeight: 70 },
  loginButtonGroup: {
    minHeight: 45,
  },
  loginButton: { ...Layout.flex.full },
  loginButtonText: { color: Colors.neutral.white },
  loginMethodButton: { width: 45 },
  modal: {
    width: '80%',
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bankIdLoading: { margin: 10 },
})
