import { Card, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'

export const Classmates = () => {
  const cardHeader = () => {
    return (
      <View style={styles.topContainer}>
        <Text category="h6">Klasslistan ej tillgänglig</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Card header={cardHeader} style={styles.contentContainer}>
        <Text>
          Klasslista kan tyvärr inte visas längre. Vi jobbar på att lösa det,
          och återkommer med information när vi vet mer.
        </Text>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    margin: 10,
    justifyContent: 'flex-start',
  },
  topContainer: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listHeader: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingLeft: 15,
  },
})
