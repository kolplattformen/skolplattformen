import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Layout, MenuItem, OverflowMenu, Text, Divider } from '@ui-kitten/components';
import {Linking} from 'react-native'


export const ContactMenu = ({contact}) => {

  const [visible, setVisible] = React.useState(false);
  const [selectedTitle, setSelectedTitle] = React.useState('No items selected');

  const contactIcon = (props) => <Icon {...props}  name={'phone-outline'}/>
  const renderToggleButton = () => (
    <Button onPress={() => setVisible(true)} appearance='ghost' accessoryLeft={contactIcon}>
    </Button>
  );

  const CallIcon = (props) => <Icon {...props}  name='phone-outline'/>
  const SMSIcon = (props) => <Icon {...props}  name='message-square-outline'/>
  const EmailIcon = (props) => <Icon {...props}  name='email-outline'/>

  return (
    <OverflowMenu
      visible={visible}
      anchor={renderToggleButton}
      onBackdropPress={() => setVisible(false)}>
      {contact.guardians.map(parent =>
        <>
          <MenuItem title={`${parent.firstname} ${parent.lastname}`} disabled="true"/>
          <MenuItem accessoryLeft={CallIcon} title={`Ring`} onPress={e => Linking.openURL(`tel:${parent.mobile}`)}/>
          <MenuItem accessoryLeft={SMSIcon} title={`SMS`} onPress={e => Linking.openURL(`sms:${parent.mobile}`)}/>
          {parent.email ? <MenuItem accessoryLeft={EmailIcon} title={`Maila`} onPress={e => Linking.openURL(`mailto:${parent.email}`)}/> : null}
        </>
      )}
    </OverflowMenu>
  );
};