import { Text, Card } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MenuItem } from '@skolplattformen/embedded-api'

interface MenuListItemProps {
  item: MenuItem
}

export const MenuListItem = ({ item }: MenuListItemProps) => {
  const cardHeader = () => {
    return (
      <View style={styles.topContainer}>
        <Text category="h6">{`${item.title}`}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Card header={cardHeader} style={styles.contentContainer}>
        <Text>{`${item.description}`}</Text>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  contentContainer: {
    margin: 5,
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
