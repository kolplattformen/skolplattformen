import {Classmate} from '../libs/api/lib';
import {useClassmates} from '../libs/hooks/src';
import {
  Divider,
  Icon,
  IconProps,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components';
import React from 'react';
import {ListRenderItemInfo, RefreshControl, StyleSheet} from 'react-native';
import {fullName, guardians, sortByFirstName} from '../utils/peopleHelpers';
import {translate} from '../utils/translation';
import {useChild} from './childContext.component';
import {ContactMenu} from './contactMenu.component';

// const translate = (key: string) => key;

// interface ClassmatesProps {
//   setSelected: (value?: number | null) => void;
// }

export const Classmates = () => {
  const child = useChild();

  const {data, status, reload} = useClassmates(child);
  const renderItemIcon = (props: IconProps) => (
    <Icon {...props} name="people-outline" />
  );
  const [selected, setSelected] = React.useState<Classmate>();
  const renderItem = ({item, index}: ListRenderItemInfo<Classmate>) => (
    <ListItem
      accessibilityLabel={`${translate('classmates.child')} ${index + 1}`}
      accessibilityHint={`${translate(
        'classmates.contactsForGuardianFor',
      )} ${fullName(item)}`}
      title={fullName(item)}
      onPress={() => setSelected(item)}
      description={guardians(item.guardians)}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => (
        <ContactMenu
          contact={item}
          selected={item === selected}
          setSelected={() => setSelected(undefined)}
        />
      )}
    />
  );
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
      refreshControl={
        <RefreshControl refreshing={status === 'loading'} onRefresh={reload} />
      }
    />
  );
};

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
});
