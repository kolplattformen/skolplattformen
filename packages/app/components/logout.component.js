import { useApi, useUser } from '@skolplattformen/api-hooks'
import { Button, Text } from '@ui-kitten/components'
import Personnummer from 'personnummer'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { CheckIcon, CloseOutlineIcon } from './icon.component'

const imageSources = {
  male: require('../assets/man.png'),
  female: require('../assets/kvinna.png'),
}

export const Logout = ({ navigation }) => {
  const { api } = useApi()
  const { data } = useUser()
  const [gender] = React.useState(() => {
    if (data?.personalNumber && Personnummer.valid(data.personalNumber)) {
      return Personnummer.parse(data.personalNumber).isFemale()
        ? 'female'
        : 'male'
    }

    return 'female'
  })

  const navigateToChildren = () => {
    navigation.navigate('Children')
  }

  const startLogout = () => {
    api.logout()
  }

  const aspectRatio = {
    female: 2048 / 1919,
    male: 638 / 512,
  }

  return (
    <>
      <Image
        source={imageSources[gender]}
        style={[styles.image, { aspectRatio: aspectRatio[gender] }]}
      />
      <View style={styles.content}>
        <Text style={styles.socialSecurityNumber}>{data.personalNumber}</Text>
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            status="success"
            size="medium"
            accessoryRight={CheckIcon}
            onPress={navigateToChildren}
          >
            Fortsätt
          </Button>
          <Button
            size="medium"
            accessoryRight={CloseOutlineIcon}
            onPress={startLogout}
          >
            Logga ut
          </Button>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 2048 / 1919,
    height: undefined,
    marginTop: 20,
    width: '90%',
  },
  content: {
    marginTop: 20,
  },
  buttons: {
    flexDirection: 'column',
  },
  button: {
    marginBottom: 10,
  },
  socialSecurityNumber: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
})
