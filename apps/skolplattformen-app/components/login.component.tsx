/* eslint-disable no-console */
import { useApi } from '@skolplattformen/hooks'
import {
  Button,
  ButtonGroup,
  Card,
  Divider,
  Input,
  List,
  ListItem,
  Modal,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components'
import Personnummer from 'personnummer'
import React, { useContext, useEffect, useState } from 'react'
import {
  Image,
  ImageProps,
  Linking,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
const schema = 'oppnaskolplattformen' // eslint-disable-line @typescript-eslint/no-unused-vars
import { SchoolPlatformContext } from '../context/schoolPlatform/schoolPlatformContext'
import { schoolPlatforms } from '../data/schoolPlatforms'
import { useFeature } from '../hooks/useFeature'
import useSettingsStorage from '../hooks/useSettingsStorage'
import { useTranslation } from '../hooks/useTranslation'
import { Layout } from '../styles'
import {
  CheckIcon,
  CloseOutlineIcon,
  PersonIcon,
  SelectIcon,
} from './icon.component'
import AppStorage from '../services/appStorage'

const BankId = () => (
  <Image
    style={themedStyles.icon}
    source={require('../assets/bankid_low_rgb.png')}
    accessibilityIgnoresInvertColors
  />
)
const FrejaEid = () => (
  <Image
    style={themedStyles.icon}
    source={require('../assets/freja_eid_logo.png')}
    accessibilityIgnoresInvertColors
  />
)

export const Login = () => {
  const { api } = useApi()
  const [cancelLoginRequest, setCancelLoginRequest] = useState<
    (() => Promise<void>) | (() => null)
  >(() => () => null)
  const [visible, showModal] = useState(false)
  const [showLoginMethod, setShowLoginMethod] = useState(false)
  const [showSchoolPlatformPicker, setShowSchoolPlatformPicker] =
    useState(false)
  const [loginStatusText, setLoginStatusText] = useState('')
  const [personalIdNumber, setPersonalIdNumber] = useSettingsStorage(
    'cachedPersonalIdentityNumber'
  )
  const [loginMethodId, setLoginMethodId] = useSettingsStorage('loginMethodId')
  const [error, setError] = useState<string | null>(null)

  const loginWithFrejaEnabled = useFeature('LOGIN_FREJA_EID')
  const { currentSchoolPlatform, changeSchoolPlatform } = useContext(
    SchoolPlatformContext
  )

  const { t } = useTranslation()

  const valid =
    loginMethodId === 'otherdevice'
      ? Personnummer.valid(personalIdNumber)
      : true

  const loginMethods = [
    { id: 'thisdevice', title: t('auth.bankid.OpenOnThisDevice') },
    { id: 'otherdevice', title: t('auth.bankid.OpenOnAnotherDevice') },
    { id: 'freja', title: t('auth.freja.OpenOnThisDevice') },
    { id: 'testuser', title: t('auth.loginAsTestUser') },
  ] as const

  // Set default login method to 'thisdevice' if not set
  if (!loginMethodId) {
    setLoginMethodId('thisdevice')
  }

  if (loginMethodId === 'freja' && !loginWithFrejaEnabled) {
    setLoginMethodId('thisdevice')
  }

  useEffect(() => {
    const loginHandler = async () => {
      console.debug('Runnning loginHandler')
      try {
        const user = await api.getUser()
        console.debug('User from api:', user)
        if (user && user.personalNumber) {
          await AppStorage.clearPersonalData(user)
        }
        showModal(false)
      } catch (error) {
        console.error('Error in loginHandler:', error)
        showModal(false)
      }
    }

    api.on('login', loginHandler)
    return () => {
      api.off('login', loginHandler)
    }
  }, [api])

  const LoginProviderImage = () => {
    //if(loginMethodId == 'testuser') return undefined
    if (loginMethodId === 'freja') return FrejaEid()
    return BankId()
  }

  const getSchoolPlatformName = () => {
    return schoolPlatforms.find((item) => item.id === currentSchoolPlatform)
      ?.displayName
  }

  const openBankId = (token: string) => {
    try {
      const bankIdUrl = `https://app.bankid.com/?autostarttoken=${token}&redirect=null`
      Linking.openURL(bankIdUrl)
    } catch (err) {
      setError(t('auth.bankid.OpenManually'))
    }
  }

  const openFreja = (token: string) => {
    try {
      const originAppScheme = encodeURIComponent(schema)
      const frejaUrl =
        Platform.OS === 'ios'
          ? `${token}&originAppScheme=${originAppScheme}`
          : `${token}`
      Linking.openURL(frejaUrl)
    } catch (err) {
      setError(t('auth.freja.OpenManually'))
    }
  }

  const startLogin = async (text: string) => {
    if (loginMethodId === 'freja') {
      setLoginStatusText(t('auth.freja.Waiting'))
      showModal(true)
      const status = await api.loginFreja()
      setCancelLoginRequest(() => () => status.cancel())
      openFreja(status.token)
      status.on('STARTED', () => console.log('Freja eID app not yet opened'))
      status.on('DELIVERED_TO_MOBILE', () =>
        console.log('Freja eID app is open')
      )
      status.on('CANCELLED', () => {
        console.log('User pressed cancel in Freja eID')
        showModal(false)
      })
      status.on('APPROVED', () => {
        console.log('Freja eID ok')
        setLoginStatusText(t('auth.loginSuccessful'))
      })
    } else if (
      loginMethodId === 'thisdevice' ||
      loginMethodId === 'otherdevice'
    ) {
      setLoginStatusText(t('auth.bankid.Waiting'))
      showModal(true)

      let ssn

      if (loginMethodId === 'otherdevice') {
        ssn = Personnummer.parse(text).format(true)
        setPersonalIdNumber(ssn)
      }

      const status = await api.login(ssn)
      setCancelLoginRequest(() => () => status.cancel())
      if (status.token !== 'fake' && loginMethodId === 'thisdevice') {
        openBankId(status.token)
      }
      status.on('PENDING', () => console.log('BankID app not yet opened'))
      status.on('USER_SIGN', () => console.log('BankID app is open'))
      status.on('CANCELLED', () => {
        console.log('User pressed cancel in BankID')
        showModal(false)
      })
      status.on('ERROR', () => {
        setError(t('auth.loginFailed'))
        showModal(false)
      })
      status.on('OK', () => {
        console.log('BankID ok')
        setLoginStatusText(t('auth.loginSuccessful'))
      })
    } else {
      await api.login('201212121212')
    }
  }

  const styles = useStyleSheet(themedStyles)

  const currentLoginMethod =
    loginMethods.find((method) => method.id === loginMethodId) ||
    loginMethods[0]

  // Reset error when switching login method
  useEffect(() => {
    setError(null)
  }, [loginMethodId])

  return (
    <>
      <View style={styles.loginForm}>
        {loginMethodId === 'otherdevice' && (
          <Input
            accessible={true}
            label={t('general.socialSecurityNumber')}
            autoFocus
            value={personalIdNumber}
            style={styles.pnrInput}
            accessoryLeft={PersonIcon}
            accessoryRight={(props) => (
              <TouchableWithoutFeedback
                accessible={true}
                onPress={() => setPersonalIdNumber('')}
                accessibilityHint={t(
                  'login.a11y_clear_social_security_input_field',
                  { defaultValue: 'Rensa fältet för personnummer' }
                )}
              >
                <CloseOutlineIcon {...props} />
              </TouchableWithoutFeedback>
            )}
            keyboardType="numeric"
            onSubmitEditing={(event) => startLogin(event.nativeEvent.text)}
            caption={error || ''}
            onChangeText={setPersonalIdNumber}
            placeholder={t('auth.placeholder_SocialSecurityNumber')}
          />
        )}
        {loginMethodId === 'thisdevice' && (
          <View style={styles.bankIdButtons}>
            <Button
              accessible={true}
              onPress={() => startLogin('')}
              style={styles.loginButton}
              appearance="ghost"
              status="primary"
              accessoryLeft={LoginProviderImage}
              size="medium"
            >
              {t('auth.bankid.OpenOnThisDevice')}
            </Button>
            <Button
              accessible={true}
              onPress={() => {
                setShowLoginMethod(true)
              }}
              style={styles.loginMethodButton}
              appearance="ghost"
              status="primary"
              accessoryLeft={SelectIcon}
              size="medium"
              accessibilityHint={t('login.a11y_select_login_method', {
                defaultValue: 'Välj inloggningsmetod',
              })}
            />
          </View>
        )}
        {loginMethodId === 'otherdevice' && (
          <ButtonGroup style={styles.loginButtonGroup} status="primary">
            <Button
              accessible={true}
              onPress={() => startLogin(personalIdNumber)}
              style={styles.loginButton}
              appearance="ghost"
              disabled={!valid}
              status="primary"
              accessoryLeft={LoginProviderImage}
              size="medium"
            >
              {currentLoginMethod.title}
            </Button>
            <Button
              accessible={true}
              onPress={() => {
                setShowLoginMethod(true)
              }}
              style={styles.loginMethodButton}
              appearance="ghost"
              status="primary"
              accessoryLeft={SelectIcon}
              size="medium"
              accessibilityHint={t('login.a11y_select_login_method', {
                defaultValue: 'Välj inloggningsmetod',
              })}
            />
          </ButtonGroup>
        )}
        {(loginMethodId === 'freja' || loginMethodId === 'testuser') && (
          <ButtonGroup style={styles.loginButtonGroup} status="primary">
            <Button
              accessible={true}
              onPress={() => startLogin(personalIdNumber)}
              style={styles.loginButton}
              appearance="ghost"
              disabled={loginMethodId === 'testuser' ? false : !valid}
              status="primary"
              accessoryLeft={LoginProviderImage}
              size="medium"
            >
              {currentLoginMethod.title}
            </Button>
            <Button
              accessible={true}
              onPress={() => {
                setShowLoginMethod(true)
              }}
              style={styles.loginMethodButton}
              appearance="ghost"
              status="primary"
              accessoryLeft={SelectIcon}
              size="medium"
              accessibilityHint={t('login.a11y_select_login_method', {
                defaultValue: 'Välj inloggningsmetod',
              })}
            />
          </ButtonGroup>
        )}
        <View style={styles.platformPicker}>
          <Button
            appearance="ghost"
            status="basic"
            size="small"
            accessoryRight={SelectIcon}
            onPress={() => {
              setShowSchoolPlatformPicker(true)
            }}
          >
            {getSchoolPlatformName()}
          </Button>
        </View>
      </View>
      <Modal
        visible={showLoginMethod}
        style={styles.modal}
        onBackdropPress={() => setShowLoginMethod(false)}
        backdropStyle={styles.backdrop}
      >
        <Card>
          <Text category="h5" style={styles.bankIdLoading}>
            {t('auth.chooseLoginMethod')}
          </Text>
          <List
            data={
              loginWithFrejaEnabled
                ? loginMethods
                : loginMethods.filter((f) => f.id !== 'freja')
            }
            ItemSeparatorComponent={Divider}
            renderItem={({ item, index }) => (
              <ListItem
                title={item.title}
                accessible={true}
                accessoryRight={
                  loginMethodId === item.id ? CheckIcon : undefined
                }
                onPress={() => {
                  setLoginMethodId(item.id)
                  setShowLoginMethod(false)
                }}
              />
            )}
          />
          <Button
            status="basic"
            style={styles.cancelButtonStyle}
            onPress={() => {
              setShowLoginMethod(false)
            }}
          >
            {t('general.cancel')}
          </Button>
        </Card>
      </Modal>
      <Modal
        visible={visible}
        style={styles.modal}
        onBackdropPress={() => showModal(false)}
        backdropStyle={styles.backdrop}
      >
        <Card disabled>
          <Text style={styles.bankIdLoading}>{loginStatusText}</Text>
          <Button
            status="primary"
            accessible={true}
            onPress={() => {
              cancelLoginRequest()
              showModal(false)
            }}
          >
            {t('general.cancel')}
          </Button>
        </Card>
      </Modal>
      <Modal
        visible={showSchoolPlatformPicker}
        style={styles.modal}
        onBackdropPress={() => setShowSchoolPlatformPicker(false)}
        backdropStyle={styles.backdrop}
      >
        <Card>
          <Text category="h5" style={styles.bankIdLoading}>
            {t('auth.chooseSchoolPlatform')}
          </Text>
          <List
            data={schoolPlatforms}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => (
              <ListItem
                title={item.displayName}
                accessible={true}
                accessoryRight={
                  currentSchoolPlatform === item.id ? CheckIcon : undefined
                }
                onPress={() => {
                  changeSchoolPlatform(item.id)
                  setShowSchoolPlatformPicker(false)
                }}
              />
            )}
          />
          <Button
            status="basic"
            style={styles.cancelButtonStyle}
            onPress={() => setShowSchoolPlatformPicker(false)}
          >
            {t('general.cancel')}
          </Button>
        </Card>
      </Modal>
    </>
  )
}

const themedStyles = StyleService.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loginForm: {
    ...Layout.mainAxis.flexStart,
  },
  pnrInput: { minHeight: 70 },
  loginButtonGroup: {
    minHeight: 45,
  },
  bankIdButtons: {
    flexDirection: 'row',
    minHeight: 45,
  },
  loginButton: { ...Layout.flex.full },
  loginMethodButton: { width: 45 },
  modal: {
    width: '90%',
  },
  bankIdLoading: { margin: 10 },
  cancelButtonStyle: { marginTop: 15 },
  icon: {
    width: 20,
    height: 20,
  },
  platformPicker: {
    width: '100%',
  },
})
