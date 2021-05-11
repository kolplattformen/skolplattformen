import AsyncStorage from '@react-native-async-storage/async-storage'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  Button,
  CheckBox,
  Divider,
  Input,
  Layout,
  StyleService,
  Text,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components'
import { Formik } from 'formik'
import moment from 'moment'
import Personnummer from 'personnummer'
import React from 'react'
import { View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import * as Yup from 'yup'
import { Layout as LayoutStyle, Sizing, Typography } from '../styles'
import { SafeAreaView } from '../ui/safeAreaView.component'
import { studentName } from '../utils/peopleHelpers'
import { useSMS } from '../utils/SMS'
import { translate } from '../utils/translation'
import { BackIcon, AlertIcon } from './icon.component'
import { RootStackParamList } from './navigation.component'
import { SafeAreaViewContainer } from '../ui/safeAreaViewContainer.component'

type AbsenceNavigationProp = StackNavigationProp<RootStackParamList, 'Absence'>
type AbsenceRouteProps = RouteProp<RootStackParamList, 'Absence'>

interface AbsenceFormValues {
  displayStartTimePicker: boolean
  displayEndTimePicker: boolean
  socialSecurityNumber: string
  isFullDay: boolean
  startTime: moment.Moment
  endTime: moment.Moment
}

const Alert = (props: any) => <AlertIcon {...props} />

const Absence = () => {
  const AbsenceSchema = Yup.object().shape({
    socialSecurityNumber: Yup.string()
      .required(translate('abscense.personalNumberMissing'))
      .test('is-valid', translate('abscense.invalidPersonalNumber'), (value) =>
        value ? Personnummer.valid(value) : true
      ),
    isFullDay: Yup.bool().required(),
  })
  const navigation = useNavigation<AbsenceNavigationProp>()
  const route = useRoute<AbsenceRouteProps>()
  const { sendSMS } = useSMS()
  const { child } = route.params
  const [socialSecurityNumber, setSocialSecurityNumber] = React.useState('')
  const minumumDate = moment().hours(8).minute(0)
  const maximumDate = moment().hours(17).minute(0)
  const styles = useStyleSheet(themedStyles)

  React.useEffect(() => {
    const getSocialSecurityNumber = async () => {
      const ssn = await AsyncStorage.getItem(`@childssn.${child.id}`)
      setSocialSecurityNumber(ssn || '')
    }

    getSocialSecurityNumber()
  }, [child])

  const initialValues: AbsenceFormValues = {
    displayStartTimePicker: false,
    displayEndTimePicker: false,
    socialSecurityNumber: socialSecurityNumber || '',
    isFullDay: true,
    startTime: moment().hours(Math.max(8, new Date().getHours())).minute(0),
    endTime: maximumDate,
  }

  return (
    <SafeAreaView>
      <SafeAreaViewContainer>
        <TopNavigation
          accessoryLeft={() => (
            <TopNavigationAction
              icon={BackIcon}
              onPress={() => navigation.goBack()}
            />
          )}
          alignment="center"
          style={styles.topBar}
          title={() => (
            <Text maxFontSizeMultiplier={1.5}>
              {translate('abscense.title')}
            </Text>
          )}
          subtitle={() => (
            <Text maxFontSizeMultiplier={1.5}>{studentName(child.name)}</Text>
          )}
        />
        <Divider />
        <Layout style={styles.wrap}>
          <Formik
            enableReinitialize
            validationSchema={AbsenceSchema}
            initialValues={initialValues}
            onSubmit={async (values) => {
              const ssn = Personnummer.parse(
                values.socialSecurityNumber
              ).format()

              if (values.isFullDay) {
                sendSMS(ssn)
              } else {
                sendSMS(
                  `${ssn} ${moment(values.startTime).format('HHmm')}-${moment(
                    values.endTime
                  ).format('HHmm')}`
                )
              }

              await AsyncStorage.setItem(
                `@childssn.${child.id}`,
                values.socialSecurityNumber
              )
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              touched,
              errors,
            }) => {
              const hasError = (field: keyof typeof values) =>
                errors[field] && touched[field]

              return (
                <View>
                  <View style={styles.field}>
                    <Text style={styles.label}>
                      {translate('general.socialSecurityNumber')}
                    </Text>
                    <Input
                      testID="socialSecurityNumberInput"
                      accessibilityLabel={translate(
                        'general.socialSecurityNumber'
                      )}
                      keyboardType="number-pad"
                      onChangeText={handleChange('socialSecurityNumber')}
                      onBlur={handleBlur('socialSecurityNumber')}
                      status={
                        hasError('socialSecurityNumber') ? 'danger' : 'basic'
                      }
                      value={values.socialSecurityNumber}
                      accessoryRight={
                        errors.socialSecurityNumber ? Alert : undefined
                      }
                    />
                    {hasError('socialSecurityNumber') && (
                      <Text style={styles.error}>
                        {errors.socialSecurityNumber}
                      </Text>
                    )}
                  </View>
                  <View style={styles.field}>
                    <CheckBox
                      checked={values.isFullDay}
                      onChange={(checked) =>
                        setFieldValue('isFullDay', checked)
                      }
                    >
                      {translate('abscense.entireDay')}
                    </CheckBox>
                  </View>
                  {!values.isFullDay && (
                    <View style={styles.partOfDay}>
                      <View style={styles.inputHalf}>
                        <Text style={styles.label}>
                          {translate('abscense.startTime')}
                        </Text>
                        <Button
                          status="basic"
                          onPress={() =>
                            setFieldValue('displayStartTimePicker', true)
                          }
                        >
                          {moment(values.startTime).format('LT')}
                        </Button>
                        <DateTimePickerModal
                          cancelTextIOS={translate('general.cancel')}
                          confirmTextIOS={translate('general.confirm')}
                          date={moment(values.startTime).toDate()}
                          isVisible={values.displayStartTimePicker}
                          headerTextIOS={translate(
                            'abscense.selectAbscenseStartTime'
                          )}
                          locale="sv-SE"
                          maximumDate={maximumDate.toDate()}
                          minimumDate={minumumDate.toDate()}
                          minuteInterval={10}
                          mode="time"
                          onConfirm={(date) => {
                            setFieldValue('startTime', date)
                            setFieldValue('displayStartTimePicker', false)
                          }}
                          onCancel={() =>
                            setFieldValue('displayStartTimePicker', false)
                          }
                        />
                      </View>
                      <View style={styles.spacer} />
                      <View style={styles.inputHalf}>
                        <Text style={styles.label}>
                          {translate('abscense.endTime')}
                        </Text>
                        <Button
                          status="basic"
                          onPress={() =>
                            setFieldValue('displayEndTimePicker', true)
                          }
                        >
                          {moment(values.endTime).format('LT')}
                        </Button>
                        <DateTimePickerModal
                          cancelTextIOS={translate('general.cancel')}
                          confirmTextIOS={translate('general.confirm')}
                          date={moment(values.endTime).toDate()}
                          isVisible={values.displayEndTimePicker}
                          headerTextIOS={translate(
                            'abscense.selectAbscenseEndTime'
                          )}
                          // Todo fix this
                          locale="sv-SE"
                          maximumDate={maximumDate.toDate()}
                          minimumDate={minumumDate.toDate()}
                          minuteInterval={10}
                          mode="time"
                          onConfirm={(date) => {
                            setFieldValue('endTime', date)
                            setFieldValue('displayEndTimePicker', false)
                          }}
                          onCancel={() =>
                            setFieldValue('displayEndTimePicker', false)
                          }
                        />
                      </View>
                    </View>
                  )}
                  <Button onPress={handleSubmit} status="primary">
                    {translate('general.send')}
                  </Button>
                </View>
              )
            }}
          </Formik>
        </Layout>
      </SafeAreaViewContainer>
    </SafeAreaView>
  )
}

export default Absence

const themedStyles = StyleService.create({
  safeArea: {
    ...LayoutStyle.flex.full,
    backgroundColor: 'background-basic-color-1',
  },
  topBar: {
    backgroundColor: 'background-basic-color-1',
  },
  wrap: {
    ...LayoutStyle.flex.full,
    padding: Sizing.t5,
  },
  field: { marginBottom: Sizing.t4 },
  partOfDay: { ...LayoutStyle.flex.row, marginBottom: Sizing.t4 },
  spacer: { width: Sizing.t2 },
  inputHalf: { ...LayoutStyle.flex.full },
  label: {
    ...Typography.fontSize.xs,
    ...Typography.fontWeight.bold,
    color: 'color-basic-600',
    marginBottom: Sizing.t1,
  },
  error: {
    color: 'color-primary-600',
  },
})
