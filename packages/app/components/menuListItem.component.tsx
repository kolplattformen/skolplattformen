import { Text, Card } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MenuItem } from '@skolplattformen/embedded-api'
import { Colors, Sizing, Typography } from '../styles'

interface MenuListItemProps {
  item: MenuItem
}

export const MenuListItem = ({ item }: MenuListItemProps) => {
  return (
    <View style={styles.container}>
      <Card
        header={(props) => (
          <View {...props}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
        style={styles.contentContainer}
      >
        <Text category="p1">{item.description}</Text>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  contentContainer: {
    marginBottom: Sizing.t2,
    justifyContent: 'flex-start',
  },
  topContainer: {
    margin: Sizing.t1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listHeader: {
    backgroundColor: '#fff',
  },
  title: {
    ...Typography.header,
    color: Colors.neutral.gray700,
  },
})
