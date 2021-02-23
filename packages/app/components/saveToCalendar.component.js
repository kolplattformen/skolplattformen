import { Button, MenuItem, OverflowMenu } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import RNCalendarEvents from 'react-native-calendar-events'
import { CalendarOutlineIcon, MoreIcon } from './icon.component'
import Toast from 'react-native-simple-toast'

export const SaveToCalendar = ({ event }) => {
  const [visible, setVisible] = React.useState(false)

  const renderToggleButton = () => (
    <Button
      accessibilityLabel="Visa kalender actions"
      onPress={() => setVisible(true)}
      appearance="ghost"
      accessoryLeft={MoreIcon}
    />
  )

  const closeOverflowMenu = () => {
    setVisible(false)
  }

  const toast = (text) => Toast.showWithGravity(text, Toast.SHORT, Toast.BOTTOM)

  const requestPermissionsAndSave = async ({
    title,
    startDate,
    endDate,
    location,
    description: notes,
  }) => {
    const auth = await RNCalendarEvents.requestPermissions()

    if (auth === 'authorized') {
      try {
        const details = {
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          location,
          notes,
        }

        const detailsWithoutEmpty = Object.fromEntries(
          Object.entries(details).filter(([_, v]) => v != null)
        )

        await RNCalendarEvents.saveEvent(title, detailsWithoutEmpty)

        toast('✔️ Sparad till kalender')
      } catch (err) {
        toast('Något gick fel')
      }
      closeOverflowMenu()
    } else {
      toast('Du måste godkänna access till kalender')
    }
  }

  return (
    <OverflowMenu
      visible={visible}
      anchor={renderToggleButton}
      backdropStyle={styles.backdrop}
      onBackdropPress={closeOverflowMenu}
    >
      <MenuItem
        accessibilityLabel="Spara till kalender"
        accessoryLeft={CalendarOutlineIcon}
        title="Spara till kalender"
        onPress={() => requestPermissionsAndSave(event)}
      />
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
