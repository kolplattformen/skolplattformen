import { Divider, Icon, List, ListItem, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { ContactMenu } from './contactMenu.component'

export const Classmates = ({ classmates }) => {
  const renderItemIcon = (props) => <Icon {...props} name="people-outline" />
  const [selected, setSelected] = React.useState()

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
      style={styles.container}
      data={classmates}
      ItemSeparatorComponent={Divider}
      ListHeaderComponent={
        <Text category="h5" style={styles.listHeader}>
          Klass {classmates?.length ? classmates[0].className : ''}
        </Text>
      }
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  listHeader: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingLeft: 15,
  },
})
