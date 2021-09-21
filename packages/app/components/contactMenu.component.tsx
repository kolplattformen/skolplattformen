/* eslint-disable react-native-a11y/has-accessibility-hint */
import { Classmate } from '@skolplattformen/embedded-api'
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
import { translate } from '../utils/translation'

interface ContactMenuProps {
  contact: Classmate
  selected: boolean
  setSelected: (value?: number | null) => void
}

export const ContactMenu = ({
  contact,
  selected,
  setSelected,
}: ContactMenuProps) => {
  const [visible, setVisible] = React.useState(selected)

  const renderToggleButton = () => (
    <Button
      testID="ShowContactInfoButton"
      accessibilityHint={translate(
        'contact.a11y_show_contact_info_button_hint',
        {
          defaultValue: 'Visar kontaktinformation',
        }
      )}
      accessibilityLabel={translate(
        'contact.a11y_show_contact_info_button_label',
        {
          defaultValue: 'Visa kontaktinformation',
        }
      )}
      onPress={() => setVisible(true)}
      appearance="ghost"
      accessoryLeft={MoreIcon}
    />
  )

  const handleBackdropPress = () => {
    setVisible(false)
    setSelected(null)
  }

  const shouldDisplay = (option?: string) => (option ? 'flex' : 'none')

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
              testID="CallMenuItem"
              accessibilityLabel={translate('contact.call')}
              accessoryLeft={CallIcon}
              style={{ display: shouldDisplay(mobile) }}
              title={translate('contact.call')}
              onPress={() => Linking.openURL(`tel:${mobile}`)}
            />
            <MenuItem
              testID="SMSMenuItem"
              accessibilityLabel={translate('contact.sms')}
              accessoryLeft={SMSIcon}
              style={{ display: shouldDisplay(mobile) }}
              title={translate('contact.sms')}
              onPress={() => Linking.openURL(`sms:${mobile}`)}
            />
            <MenuItem
              testID="SendEmailMenuItem"
              accessibilityLabel={translate('contact.email')}
              accessoryLeft={EmailIcon}
              style={{ display: shouldDisplay(email) }}
              title={translate('contact.email')}
              onPress={() => Linking.openURL(`mailto:${email}`)}
            />
            <MenuItem
              testID="ShowHomeMenuItem"
              accessibilityLabel={translate('contact.home')}
              accessoryLeft={MapIcon}
              style={{ display: shouldDisplay(address) }}
              title={translate('contact.home')}
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
