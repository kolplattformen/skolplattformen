import {
  Button,
  MenuGroup,
  MenuItem,
  OverflowMenu,
} from '@ui-kitten/components'
import React from 'react'
import { Linking, StyleSheet } from 'react-native'
import { fullName } from '../utils/peopleHelpers'
import {
  CallIcon,
  EmailIcon,
  MapIcon,
  MoreIcon,
  SMSIcon,
} from './icon.component'

export const ContactMenu = ({ contact, selected, setSelected }) => {
  const [visible, setVisible] = React.useState(selected)

  const renderToggleButton = () => (
    <Button
      accessibilityLabel="Visa kontaktinformation"
      onPress={() => setVisible(true)}
      appearance="ghost"
      accessoryLeft={MoreIcon}
    />
  )

  const handleBackdropPress = () => {
    setVisible(false)
    setSelected(null)
  }

  const shouldDisplay = (option) => (option ? 'flex' : 'none')

  return (
    <OverflowMenu
      visible={visible}
      anchor={renderToggleButton}
      backdropStyle={styles.backdrop}
      onBackdropPress={handleBackdropPress}
    >
      {contact.guardians.map((guardian) => {
        const { address, email, mobile } = guardian

        return (
          <MenuGroup
            key={fullName(guardian)}
            title={fullName(guardian)}
            style={styles.group}
          >
            <MenuItem
              accessibilityLabel="Ring"
              accessoryLeft={CallIcon}
              style={{ display: shouldDisplay(mobile) }}
              title="Ring"
              onPress={() => Linking.openURL(`tel:${mobile}`)}
            />
            <MenuItem
              accessibilityLabel="SMS"
              accessoryLeft={SMSIcon}
              style={{ display: shouldDisplay(mobile) }}
              title="SMS"
              onPress={() => Linking.openURL(`sms:${mobile}`)}
            />
            <MenuItem
              accessibilityLabel="Maila"
              accessoryLeft={EmailIcon}
              style={{ display: shouldDisplay(email) }}
              title="Maila"
              onPress={() => Linking.openURL(`mailto:${email}`)}
            />
            <MenuItem
              accessibilityLabel="Hem"
              accessoryLeft={MapIcon}
              style={{ display: shouldDisplay(address) }}
              title="Hem"
              onPress={() =>
                Linking.openURL(`http://maps.apple.com/?daddr=${address}`)
              }
            />
          </MenuGroup>
        )
      })}
    </OverflowMenu>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  group: {
    position: 'relative',
    zIndex: 10,
  },
})
