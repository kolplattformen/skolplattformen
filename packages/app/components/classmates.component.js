import { useClassmates } from '@skolplattformen/api-hooks'
import { Divider, Icon, List, ListItem, Text } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useChild } from './childContext.component'
import { ContactMenu } from './contactMenu.component'

export const Classmates = () => {
  const child = useChild()
  const { data, status, reload } = useClassmates(child)
  const [refreshing, setRefreshing] = useState(status === 'loading')
  useEffect(() => {
    setRefreshing(status === 'loading')
  }, [status])

  const refresh = () => reload()

  const renderItemIcon = (props) => <Icon {...props} name="people-outline" />
  const [selected, setSelected] = useState()

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.firstname} ${item.lastname}`}
      onPress={() => setSelected(item)}
      description={item.guardians
        .map((guardian) => `${guardian.firstname} ${guardian.lastname}`)
        .join(', ')}
      accessoryLeft={renderItemIcon}
      accessoryRight={(props) =>
        ContactMenu({
          ...props,
          contact: item,
          selected: item === selected,
          setSelected,
        })
      }
    />
  )

  return (
    <List
      onRefresh={refresh}
      refreshing={refreshing}
      style={styles.container}
      data={data}
      ItemSeparatorComponent={Divider}
      ListHeaderComponent={
        <Text category="h5" style={styles.listHeader}>
          Klass {data?.length ? data[0].className : ''}
        </Text>
      }
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
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
  listHeader: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingLeft: 15,
  },
})
