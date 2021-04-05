import { useMenu } from '@skolplattformen/api-hooks'
import { MenuItem } from '@skolplattformen/embedded-api'
import { List, Text } from '@ui-kitten/components'
import moment from 'moment'
import 'moment/locale/sv'
import React from 'react'
import { Image, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import { Colors, Sizing, Layout as LayoutStyle, Typography } from '../styles'
import { useChild } from './childContext.component'
import { MenuListItem } from './menuListItem.component'

moment.locale('sv')

export const Menu = () => {
  const child = useChild()
  const { data } = useMenu(child)

  return (
    <List
      contentContainerStyle={styles.contentContainer}
      data={data}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text category="h6">Det ser lite tomt ut i matsedeln</Text>
          <Text style={styles.emptyStateDescription}>
            Hittade ingenting att visa för den här veckan
          </Text>
          <Image
            source={require('../assets/children.png')}
            style={styles.emptyStateImage}
          />
        </View>
      }
      renderItem={({ item }: ListRenderItemInfo<MenuItem>) => (
        <MenuListItem key={item.title} item={item} />
      )}
      style={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    padding: 10,
  },
  emptyState: {
    ...LayoutStyle.center,
    ...LayoutStyle.flex.full,
    backgroundColor: Colors.neutral.white,
    paddingHorizontal: Sizing.t5,
    paddingTop: 25,
  },
  emptyStateDescription: {
    ...Typography.align.center,
    lineHeight: 21,
    marginTop: Sizing.t2,
  },
  emptyStateImage: {
    ...Sizing.aspectRatio(0.8),
    marginTop: 50,
  },
})
