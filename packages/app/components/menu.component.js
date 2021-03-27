import { Text, Card } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export const Menu = ({ menuItem }) => {
  const cardHeader = (props) => {
    return (
      <View style={styles.topContainer}>
        <Text category="h6">Måndag</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Card header={cardHeader} style={styles.contentContainer}>
        <Text>
          Här ska menyn för måndag stå, tex Köttbullar med potatis och sås
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
