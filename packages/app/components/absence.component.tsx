import { RouteProp, useRoute } from '@react-navigation/native'
import {
  Button,
  CheckBox,
  Input,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components'
import { Formik } from 'formik'
import moment from 'moment'
import Personnummer from 'personnummer'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { NativeStackNavigationOptions } from 'react-native-screens/native-stack'
import * as Yup from 'yup'
import { Layout as LayoutStyle, Sizing, Typography } from '../styles'
import { studentName } from '../utils/peopleHelpers'
import { useSMS } from '../utils/SMS'
import { translate } from '../utils/translation'
import { AlertIcon } from './icon.component'
import { RootStackParamList } from './navigation.component'
import AppStorage from '../services/appStorage'
import { NavigationTitle } from './navigationTitle.component'
import { useUser } from '@skolplattformen/api-hooks'

type AbsenceRouteProps = RouteProp<RootStackParamList, 'Absence'>

interface AbsenceFormValues {
  displayStartTimePicker: boolean
  displayEndTimePicker: boolean
  socialSecurityNumber: string
  isFullDay: boolean
  startTime: moment.Moment
  endTime: moment.Moment
}

export const absenceRouteOptions = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Absence'>
}): NativeStackNavigationOptions => {
  const child = route.params.child
  return {
    headerCenter: () => (
      <NavigationTitle
        title={translate('abscense.title')}
        subtitle={studentName(child?.name)}
      />
    ),
  }
}

const Absence = () => {
  const AbsenceSchema = Yup.object().shape({
    socialSecurityNumber: Yup.string()
      .required(translate('abscense.personalNumberMissing'))
      .test('is-valid', translate('abscense.invalidPersonalNumber'), (value) =>
        value ? Personnummer.valid(value) : true
      ),
    isFullDay: Yup.bool().required(),
  })

  const { data: user } = useUser()
  const route = useRoute<AbsenceRouteProps>()
  const { sendSMS } = useSMS()
  const { child } = route.params
  const [socialSecurityNumber, setSocialSecurityNumber] = React.useState('')
  const minumumDate = moment().hours(8).minute(0)
  const maximumDate = moment().hours(17).minute(0)
  const styles = useStyleSheet(themedStyles)

  const submit = useCallback(
    async (values: AbsenceFormValues) => {
      const ssn = Personnummer.parse(values.socialSecurityNumber).format()

      if (values.isFullDay) {
        sendSMS(ssn)
      } else {
        sendSMS(
          `${ssn} ${moment(values.startTime).format('HHmm')}-${moment(
            values.endTime
          ).format('HHmm')}`
        )
      }

      await AppStorage.setPersonalData(
        user,
        `@childssn.${child.id}`,
        values.socialSecurityNumber
      )
      setSocialSecurityNumber(values.socialSecurityNumber)
    },
    [child.id, sendSMS, user]
  )

  React.useEffect(() => {
    const getSocialSecurityNumber = async () => {
      const ssn = await AppStorage.getPersonalData<string>(
        user,
        `@childssn.${child.id}`
      )
      setSocialSecurityNumber(ssn || '')
    }
    getSocialSecurityNumber()
  }, [child, user])

  const initialValues: AbsenceFormValues = {
    displayStartTimePicker: false,
    displayEndTimePicker: false,
    socialSecurityNumber: socialSecurityNumber || '',
    isFullDay: true,
    startTime: moment().hours(Math.max(8, new Date().getHours())).minute(0),
    endTime: maximumDate,
  }

  return (
    <Formik
      enableReinitialize
      validationSchema={AbsenceSchema}
      initialValues={initialValues}
      onSubmit={submit}
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
          <View style={styles.wrap}>
            <View style={styles.field}>
              <Text style={styles.label}>
                {translate('general.socialSecurityNumber')}
              </Text>
              <Input
                testID="socialSecurityNumberInput"
                keyboardType="number-pad"
                onChangeText={handleChange('socialSecurityNumber')}
                onBlur={handleBlur('socialSecurityNumber')}
                status={hasError('socialSecurityNumber') ? 'danger' : 'basic'}
                value={values.socialSecurityNumber}
                style={styles.input}
                accessoryRight={
                  hasError('socialSecurityNumber') ? AlertIcon : undefined
                }
              />
              {hasError('socialSecurityNumber') && (
                <Text style={styles.error}>{errors.socialSecurityNumber}</Text>
              )}
            </View>
            <View style={styles.field}>
              <CheckBox
                checked={values.isFullDay}
                onChange={(checked) => setFieldValue('isFullDay', checked)}
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
                    style={styles.pickerButton}
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
                    style={styles.pickerButton}
                    onPress={() => setFieldValue('displayEndTimePicker', true)}
                  >
                    {moment(values.endTime).format('LT')}
                  </Button>
                  <DateTimePickerModal
                    cancelTextIOS={translate('general.cancel')}
                    confirmTextIOS={translate('general.confirm')}
                    date={moment(values.endTime).toDate()}
                    isVisible={values.displayEndTimePicker}
                    headerTextIOS={translate('abscense.selectAbscenseEndTime')}
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
  )
}

export default Absence

const themedStyles = StyleService.create({
  wrap: {
    ...LayoutStyle.flex.full,
    padding: Sizing.t4,
    backgroundColor: 'background-basic-color-2',
  },
  field: { marginBottom: Sizing.t4 },
  partOfDay: { ...LayoutStyle.flex.row, marginBottom: Sizing.t4 },
  spacer: { width: Sizing.t2 },
  inputHalf: { ...LayoutStyle.flex.full },
  input: {
    backgroundColor: 'background-basic-color-1',
  },
  // TODO: Refactor to use mapping.json in eva design
  pickerButton: {
    backgroundColor: 'background-basic-color-1',
  },
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
