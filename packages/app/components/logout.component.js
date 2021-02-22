import { useApi, useUser } from '@skolplattformen/api-hooks'
import { Button, Text } from '@ui-kitten/components'
import Personnummer from 'personnummer'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { CheckIcon, CloseOutlineIcon } from './icon.component'

export const Logout = ({ navigation }) => {
  const { api } = useApi()
  const { data } = useUser()
  const imageSources = {
    male: require('../assets/man.png'),
    female: require('../assets/kvinna.png'),
  }
  const [imageSource, setImageSource] = useState(imageSources.female)

  useEffect(() => {
    if (data && data.personalNumber && Personnummer.valid(data.personalNumber)) {
      setImageSource(
        Personnummer.parse(data.personalNumber).isFemale()
          ? imageSources.female : imageSources.male
      )
    }
  }, [data.personalNumber])

  const navigateToChildren = () => {
    navigation.navigate('Children')
  }

  const startLogout = () => {
    api.logout()
  }

  return (
    <>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.content}>
        <Text category="h5">{data.personalNumber}</Text>
        <Text style={styles.text}>
          Hurra, du är inloggad!
        </Text>
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
            style={styles.button}
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
    maxHeight: 300,
    width: '100%',
  },
  content: {
    marginTop: 32,
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
  },
  button: { marginBottom: 10 }
})
