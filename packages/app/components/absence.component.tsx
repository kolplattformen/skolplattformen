import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import {
  Button,
  CheckBox,
  Divider,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components'
import { Formik } from 'formik'
import moment from 'moment'
import Personnummer from 'personnummer'
import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import * as Yup from 'yup'
import { studentName } from '../utils/peopleHelpers'
import { useSMS } from '../utils/SMS'
import { BackIcon } from './icon.component'
import { RootStackParamList } from './navigation.component'

interface AbsenceProps {
  navigation: NavigationProp<RootStackParamList, 'Absence'>
  route: RouteProp<RootStackParamList, 'Absence'>
}

interface AbsenceFormValues {
  displayStartTimePicker: boolean
  displayEndTimePicker: boolean
  socialSecurityNumber: string
  isFullDay: boolean
  startTime: moment.Moment
  endTime: moment.Moment
}

const AbsenceSchema = Yup.object().shape({
  socialSecurityNumber: Yup.string()
    .required('Personnummer saknas')
    .test('is-valid', 'Personnumret är ogiltigt', (value) =>
      value ? Personnummer.valid(value) : true
    ),
  isFullDay: Yup.bool().required(),
})

const Absence = ({ route, navigation }: AbsenceProps) => {
  const { sendSMS } = useSMS()
  const { child } = route.params
  const theme = useTheme()
  const [socialSecurityNumber, setSocialSecurityNumber] = React.useState('')
  const minumumDate = moment().hours(8).minute(0)
  const maximumDate = moment().hours(17).minute(0)

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
    <SafeAreaView style={styles.safeArea}>
      <TopNavigation
        accessoryLeft={() => (
          <TopNavigationAction
            icon={BackIcon}
            onPress={() => navigation.goBack()}
          />
        )}
        alignment="center"
        style={styles.topBar}
        title="Anmäl frånvaro"
        subtitle={studentName(child.name)}
      />
      <Divider />
      <Layout style={styles.wrap}>
        <Formik
          enableReinitialize
          validationSchema={AbsenceSchema}
          initialValues={initialValues}
          onSubmit={async (values) => {
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
                  <Input
                    accessibilityLabel="Personnummer"
                    label="Personnummer"
                    keyboardType="number-pad"
                    onChangeText={handleChange('socialSecurityNumber')}
                    onBlur={handleBlur('socialSecurityNumber')}
                    status={
                      hasError('socialSecurityNumber') ? 'danger' : 'basic'
                    }
                    value={values.socialSecurityNumber}
                  />
                  {hasError('socialSecurityNumber') && (
                    <Text style={{ color: theme['color-danger-700'] }}>
                      {errors.socialSecurityNumber}
                    </Text>
                  )}
                </View>
                <View style={styles.field}>
                  <CheckBox
                    checked={values.isFullDay}
                    onChange={(checked) => setFieldValue('isFullDay', checked)}
                  >
                    Heldag
                  </CheckBox>
                </View>
                {!values.isFullDay && (
                  <View style={styles.partOfDay}>
                    <View style={styles.inputHalf}>
                      <Text style={styles.label}>Starttid</Text>
                      <Button
                        status="basic"
                        onPress={() =>
                          setFieldValue('displayStartTimePicker', true)
                        }
                      >
                        {moment(values.startTime).format('HH:mm')}
                      </Button>
                      <DateTimePickerModal
                        cancelTextIOS="Avbryt"
                        confirmTextIOS="Bekräfta"
                        date={moment(values.startTime).toDate()}
                        isVisible={values.displayStartTimePicker}
                        headerTextIOS="Välj en starttid"
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
                      <Text style={styles.label}>Sluttid</Text>
                      <Button
                        status="basic"
                        onPress={() =>
                          setFieldValue('displayEndTimePicker', true)
                        }
                      >
                        {moment(values.endTime).format('HH:mm')}
                      </Button>
                      <DateTimePickerModal
                        cancelTextIOS="Avbryt"
                        confirmTextIOS="Bekräfta"
                        date={moment(values.endTime).toDate()}
                        isVisible={values.displayEndTimePicker}
                        headerTextIOS="Välj en sluttid"
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
                  Skicka
                </Button>
              </View>
            )
          }}
        </Formik>
      </Layout>
    </SafeAreaView>
  )
}

export default Absence

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#fff', flex: 1 },
  topBar: { backgroundColor: '#fff' },
  wrap: { flex: 1, padding: 20 },
  field: { marginBottom: 16 },
  partOfDay: { flexDirection: 'row', marginBottom: 16 },
  spacer: { width: 8 },
  inputHalf: { flex: 1 },
  label: {
    color: 'rgb(150,161,184)',
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 4,
  },
})
