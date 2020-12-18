import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, List, ListItem, Icon, Text, Button} from '@ui-kitten/components';
import { ContactMenu } from './contactMenu.component';

export const Classmates = ({classmates}) => {

  const renderItemIcon = (props) => <Icon {...props}  name={'people-outline'}/>

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.firstname} ${item.lastname}`}
      description={item.guardians.map(guardian => `${guardian.firstname} ${guardian.lastname}`).join(', ')}
      accessoryLeft={renderItemIcon}
      accessoryRight={(props) => ContactMenu({...props, contact: item})}
    />
  );

  return (
    <List
      style={styles.container}
      data={classmates}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});