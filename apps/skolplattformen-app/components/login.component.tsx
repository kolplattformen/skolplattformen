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
import Constants from 'expo-constants'
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
import { QrMatrix } from './qrMatrix.component'
import { useTranslation } from '../hooks/useTranslation'
import { Layout } from '../styles'
import {
  CheckIcon,
  CloseOutlineIcon,
  PersonIcon,
  SelectIcon,
} from './icon.component'
import AppStorage from '../services/appStorage'

// module-level: auto-login ska bara köras EN gång per app-session - vid
// utloggning remountar Login-skermen och en ref hade nollställts
let hasAutoLoggedInThisSession = false

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
  const [qrCode, setQrCode] = useState<string | null>(null)
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
    ...(currentSchoolPlatform === 'infomentor'
      ? [{ id: 'qrcode', title: 'BankID med QR-kod' }]
      : []),
    { id: 'freja', title: t('auth.freja.OpenOnThisDevice') },
    { id: 'testuser', title: t('auth.loginAsTestUser') },
  ] as const

  // Set default login method: fysisk enhet => BankID på samma enhet
  // (QR används först vid två enheter), simulator/surfplatta utan BankID
  // => QR (som skannas med telefonen)
  const isPhysicalDevice = Constants.deviceType === 'device'
  if (!loginMethodId) {
    setLoginMethodId(
      isPhysicalDevice || currentSchoolPlatform !== 'infomentor'
        ? 'thisdevice'
        : 'qrcode'
    )
  }

  if (loginMethodId === 'freja' && !loginWithFrejaEnabled) {
    setLoginMethodId('thisdevice')
  }

  // Persisted 'qrcode' på en fysisk enhet (t.ex. från tidigare auto-login)
  // normaliseras till BankID på samma enhet
  if (loginMethodId === 'qrcode' && isPhysicalDevice) {
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

  const startLogin = async (text: string, methodOverride?: string) => {
    const methodId = (methodOverride ?? loginMethodId) as typeof loginMethodId
    if (methodId === 'freja') {
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
    } else if (methodId === 'qrcode') {
      setLoginStatusText('Visa QR-koden för BankID…')
      setQrCode(null)
      showModal(true)
      const status = await (api as any).startQrLogin()
      setCancelLoginRequest(() => () => status.cancel())
      console.log('QR checker received, initial frame?', !!status.qrData)
      if (status.qrData) setQrCode(status.qrData)
      status.on('qr', (frame: string) => {
        console.log('QR frame event received')
        setQrCode(frame)
      })
      status.on('OK', () => {
        console.log('QR login ok')
        setLoginStatusText(t('auth.loginSuccessful'))
        setQrCode(null)
      })
      status.on('CANCELLED', () => {
        console.log('User pressed cancel in QR login')
        showModal(false)
        setQrCode(null)
      })
      status.on('ERROR', () => {
        console.log('QR login ERROR received')
        setLoginStatusText('Inloggningen misslyckades - försök igen')
        setQrCode(null)
      })
    } else if (methodId === 'thisdevice' || methodId === 'otherdevice') {
      setLoginStatusText(t('auth.bankid.Waiting'))
      showModal(true)

      let ssn

      if (methodId === 'otherdevice') {
        ssn = Personnummer.parse(text).format(true)
        setPersonalIdNumber(ssn)
      }

      const status = await api.login(ssn)
      setCancelLoginRequest(() => () => status.cancel())
      if (status.token !== 'fake' && methodId === 'thisdevice') {
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

  // DEV: auto-login när EXPO_PUBLIC_INFOMENTOR_DEV_SESSION är satt
  // (ingen knapptryckning behövs - underlättar test i simulatorn/device)
  useEffect(() => {
    if (hasAutoLoggedInThisSession) return
    if (!process.env.EXPO_PUBLIC_INFOMENTOR_DEV_SESSION) return
    if (currentSchoolPlatform !== 'infomentor') return
    hasAutoLoggedInThisSession = true
    // Metoden väljs per enhet (thisdevice på fysisk telefon - dev-sessionen
    // kortsluter ändå inloggingen, inget BankID öppnas)
    const autoMethod = Constants.deviceType === 'device' ? 'thisdevice' : 'qrcode'
    console.log('[dev] auto-login: dev session present, method:', autoMethod)
    setLoginMethodId(autoMethod)
    startLogin('', autoMethod)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        {loginMethodId === 'qrcode' && (
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
            />
          </View>
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
        onBackdropPress={() => {
          if (loginMethodId !== 'qrcode') showModal(false)
        }}
        backdropStyle={styles.backdrop}
      >
        <Card disabled>
          <Text style={styles.bankIdLoading}>{loginStatusText}</Text>
          {qrCode ? (
            <View style={{ alignItems: 'center', paddingVertical: 12 }}>
              <QrMatrix value={qrCode} size={280} />
              <Text style={{ marginTop: 8, textAlign: 'center' }}>
                Öppna BankID-appen → QR-ikonen uppe till vänster → sikta mot
                skärmen
              </Text>
            </View>
          ) : null}
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
