import { useMenu } from '@skolplattformen/api-hooks'
import { MenuItem } from '@skolplattformen/embedded-api'
import { List, Text } from '@ui-kitten/components'
import moment from 'moment'
import 'moment/locale/sv'
import React from 'react'
import { Image, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import { useChild } from './childContext.component'
import { MenuListItem } from './menuListItem.component'

moment.locale('sv')

export const Menu = () => {
  const child = useChild()
  const { data } = useMenu(child)

  return !data?.length ? (
    <View style={styles.emptyState}>
      <Image
        source={require('../assets/girls.png')}
        style={styles.emptyStateImage}
      />
      <Text category="h5">Det ser lite tomt ut i menyn</Text>
    </View>
  ) : (
    <List
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={({ item }: ListRenderItemInfo<MenuItem>) => (
        <MenuListItem key={item.title} item={item} />
      )}
      style={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
  },
  emptyStateImage: {
    height: 200,
    width: '100%',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    padding: 10,
  },
})
