import { useApi } from '@skolplattformen/api-hooks'
import {
  Button,
  ButtonGroup,
  Card,
  Input,
  Modal,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components'
import Personnummer from 'personnummer'
import React, { useEffect, useState } from 'react'
import {
  Image,
  Linking,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import ActionSheet from 'rn-actionsheet-module'
import { useAsyncStorage } from 'use-async-storage'
import { schema } from '../app.json'
import { Layout } from '../styles'
import { translate } from '../utils/translation'
import { CloseOutlineIcon, PersonIcon, SelectIcon } from './icon.component'

const BankId = () => (
  <Image
    style={themedStyles.icon}
    source={require('../assets/bankid_low_rgb.png')}
    accessibilityIgnoresInvertColors
  />
)

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
    translate('auth.bankid.OpenOnThisDevice'),
    translate('auth.bankid.OpenOnAnotherDevice'),
    translate('auth.loginAsTestUser'),
    translate('general.cancel'),
  ]

  const selectLoginMethod = () => {
    const options = {
      cancelButtonIndex: 3,
      title: translate('auth.chooseLoginMethod'),
      optionsIOS: loginMethods,
      optionsAndroid: loginMethods,
      onCancelAndroidIndex: loginMethodIndex,
    }
    ActionSheet(options, (index: number) => {
      if (options.cancelButtonIndex !== index) {
        setLoginMethodIndex(index)
      }
    })
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
      setError(translate('auth.bankid.OpenManually'))
    }
  }

  const startLogin = async (text: string) => {
    if (loginMethodIndex < 2) {
      showModal(true)

      let ssn
      if (loginMethodIndex === 1) {
        ssn = Personnummer.parse(text).format(true)
        setCachedSsn(ssn)
        setSocialSecurityNumber(ssn)
      }

      const status = await api.login(ssn)
      setCancelLoginRequest(() => () => status.cancel())
      if (status.token !== 'fake' && loginMethodIndex === 0) {
        openBankId(status.token)
      }
      status.on('PENDING', () => console.log('BankID app not yet opened'))
      status.on('USER_SIGN', () => console.log('BankID app is open'))
      status.on('ERROR', () => {
        setError(translate('auth.loginFailed'))
        showModal(false)
      })
      status.on('OK', () => console.log('BankID ok'))
    } else {
      await api.login('201212121212')
    }
  }

  const styles = useStyleSheet(themedStyles)

  return (
    <>
      <View style={styles.loginForm}>
        {loginMethodIndex === 1 && (
          <Input
            accessible={true}
            label={translate('general.socialSecurityNumber')}
            autoFocus
            value={socialSecurityNumber}
            style={styles.pnrInput}
            accessoryLeft={PersonIcon}
            accessoryRight={(props) => (
              <TouchableWithoutFeedback
                accessible={true}
                onPress={() => handleInput('')}
                accessibilityHint={translate(
                  'login.a11y_clear_social_security_input_field',
                  {
                    defaultValue: 'Rensa fältet för personnummer',
                  }
                )}
              >
                <CloseOutlineIcon {...props} />
              </TouchableWithoutFeedback>
            )}
            keyboardType="numeric"
            onSubmitEditing={(event) => startLogin(event.nativeEvent.text)}
            caption={error || ''}
            onChangeText={(text) => handleInput(text)}
            placeholder={translate('auth.placeholder_SocialSecurityNumber')}
          />
        )}
        <ButtonGroup style={styles.loginButtonGroup} status="primary">
          <Button
            accessible={true}
            onPress={() => startLogin(socialSecurityNumber)}
            style={styles.loginButton}
            appearance="ghost"
            disabled={loginMethodIndex === 1 && !valid}
            status="primary"
            accessoryLeft={BankId}
            size="medium"
          >
            {loginMethods[loginMethodIndex]}
          </Button>
          <Button
            accessible={true}
            onPress={selectLoginMethod}
            style={styles.loginMethodButton}
            appearance="ghost"
            status="primary"
            accessoryLeft={SelectIcon}
            size="medium"
            accessibilityHint={translate('login.a11y_select_login_method', {
              defaultValue: 'Välj inloggningsmetod',
            })}
          />
        </ButtonGroup>
      </View>
      <Modal
        visible={visible}
        style={styles.modal}
        onBackdropPress={() => showModal(false)}
        backdropStyle={styles.backdrop}
      >
        <Card disabled>
          <Text style={styles.bankIdLoading}>
            {translate('auth.bankid.Waiting')}
          </Text>

          <Button
            status="primary"
            accessible={true}
            onPress={() => {
              cancelLoginRequest()
              showModal(false)
            }}
          >
            {translate('general.cancel')}
          </Button>
        </Card>
      </Modal>
    </>
  )
}

const themedStyles = StyleService.create({
  backdrop: {
    backgroundColor: 'color-basic-transparent-600',
  },
  loginForm: {
    ...Layout.mainAxis.flexStart,
  },
  pnrInput: { minHeight: 70 },
  loginButtonGroup: {
    minHeight: 45,
  },
  loginButton: { ...Layout.flex.full },
  loginMethodButton: { width: 45 },
  modal: {
    width: '80%',
  },
  bankIdLoading: { margin: 10 },
  icon: {
    width: 20,
    height: 20,
  },
})
