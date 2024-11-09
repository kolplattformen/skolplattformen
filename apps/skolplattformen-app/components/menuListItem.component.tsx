import { MenuItem } from '@skolplattformen/api'
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import { Sizing, Typography } from '../styles'
import { translate } from '../utils/translation'

interface MenuListItemProps {
  item: MenuItem
}

export const MenuListItem = ({ item }: MenuListItemProps) => {
  const styles = useStyleSheet(themedStyles)
  const day = item.title.split(' ')[0]
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translate(`menu.${day}`)}</Text>
      <Text category="p1">{item.description}</Text>
    </View>
  )
}

const themedStyles = StyleService.create({
  container: {
    width: '100%',
    paddingVertical: Sizing.t3,
  },
  topContainer: {
    margin: Sizing.t1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    ...Typography.header,
    marginBottom: Sizing.t1,
  },
})
