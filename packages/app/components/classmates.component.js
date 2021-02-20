import { useClassmates } from '@skolplattformen/api-hooks'
import { Divider, Icon, List, ListItem, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { fullName, guardians, sortByFirstName } from '../utils/peopleHelpers'
import { useChild } from './childContext.component'
import { ContactMenu } from './contactMenu.component'

export const Classmates = () => {
  const child = useChild()
  const { data } = useClassmates(child)

  const renderItemIcon = (props) => <Icon {...props} name="people-outline" />
  const [selected, setSelected] = React.useState()

  const renderItem = ({ item, index }) => (
    <ListItem
      accessibilityLabel={`Barn ${index + 1}`}
      title={fullName(item)}
      onPress={() => setSelected(item)}
      description={guardians(item.guardians)}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => (
        <ContactMenu
          contact={item}
          selected={item === selected}
          setSelected={setSelected}
        />
      )}
    />
  )

  return (
    <List
      style={styles.container}
      data={sortByFirstName(data)}
      ItemSeparatorComponent={Divider}
      ListHeaderComponent={
        <Text category="h5" style={styles.listHeader}>
          {data?.length ? `Klass ${data[0].className}` : 'Klass'}
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
