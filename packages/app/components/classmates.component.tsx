import React from 'react'
import { StyleSheet, ListRenderItemInfo } from 'react-native'
import {
  Divider,
  List,
  ListItem,
  Icon,
  IconProps,
  Text,
} from '@ui-kitten/components'
import { fullName, guardians, sortByFirstName } from '../utils/peopleHelpers'
import { useChild } from './childContext.component'
import { useClassmates } from '@skolplattformen/api-hooks'
import { ContactMenu } from './contactMenu.component'
import { Classmate } from '@skolplattformen/embedded-api'
import { translate } from '../utils/translation'

interface ClassmatesProps {
  setSelected: (value?: number | null) => void
}

export const Classmates = () => {
  const child = useChild()

  const { data } = useClassmates(child)
  const renderItemIcon = (props: IconProps) => (
    <Icon {...props} name="people-outline" />
  )
  const [selected, setSelected] = React.useState()
  const renderItem = ({ item, index }: ListRenderItemInfo<Classmate>) => (
    <ListItem
      accessibilityLabel={`${translate('classmates.child')} ${index + 1}`}
      accessibilityHint={`${translate(
        'classmates.contactsForGuardianFor'
      )} ${fullName(item)}`}
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
          {data?.length
            ? `${translate('classmates.class')} ${data[0].className}`
            : translate('classmates.class')}
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
    margin: 10,
    justifyContent: 'flex-start',
  },
  topContainer: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listHeader: {
    paddingTop: 10,
    paddingLeft: 15,
  },
})
