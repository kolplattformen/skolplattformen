import React from 'react'
import {StyleSheet, Linking} from 'react-native'
import {
  Button,
  Icon,
  MenuItem,
  MenuGroup,
  OverflowMenu,
} from '@ui-kitten/components'

export const ContactMenu = ({contact, selected, setSelected}) => {
  const [visible, setVisible] = React.useState(selected)

  const moreIcon = (props) => <Icon {...props} name="more-horizontal-outline" />
  const renderToggleButton = () => (
    <Button
      onPress={() => setVisible(true)}
      appearance="ghost"
      accessoryLeft={moreIcon}
    />
  )

  const handleBackdropPress = () => {
    setVisible(false)
    setSelected(null)
  }

  const CallIcon = (props) => <Icon {...props} name="phone-outline" />
  const SMSIcon = (props) => <Icon {...props} name="message-square-outline" />
  const EmailIcon = (props) => <Icon {...props} name="email-outline" />
  const MapIcon = (props) => <Icon {...props} name="map-outline" />

  return (
    <OverflowMenu
      visible={visible}
      anchor={renderToggleButton}
      backdropStyle={styles.backdrop}
      onBackdropPress={handleBackdropPress}>
      {contact.guardians.map((parent, i) => (
        <MenuGroup key={i} title={`${parent.firstname} ${parent.lastname}`}>
          <MenuItem
            accessoryLeft={CallIcon}
            style={{display: parent.mobile ? 'flex' : 'none'}}
            title="Ring"
            onPress={(e) => Linking.openURL(`tel:${parent.mobile}`)}
          />
          <MenuItem
            accessoryLeft={SMSIcon}
            style={{display: parent.mobile ? 'flex' : 'none'}}
            title="SMS"
            onPress={(e) => Linking.openURL(`sms:${parent.mobile}`)}
          />
          <MenuItem
            accessoryLeft={EmailIcon}
            style={{display: parent.email ? 'flex' : 'none'}}
            title="Maila"
            onPress={(e) => Linking.openURL(`mailto:${parent.email}`)}
          />
          <MenuItem
            accessoryLeft={MapIcon}
            style={{display: parent.address ? 'flex' : 'none'}}
            title="Hem"
            onPress={(e) =>
              Linking.openURL(`http://maps.apple.com/?daddr=${parent.address}`)
            }
          />
        </MenuGroup>
      ))}
    </OverflowMenu>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})
