import { Button, MenuItem, OverflowMenu } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import RNCalendarEvents, {
  CalendarEventWritable,
} from 'react-native-calendar-events'
import { CalendarOutlineIcon, MoreIcon } from './icon.component'
import Toast from 'react-native-simple-toast'
import { CalendarItem } from '@skolplattformen/embedded-api'

interface SaveToCalendarProps {
  event: CalendarItem
}

export const SaveToCalendar = ({ event }: SaveToCalendarProps) => {
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

  const toast = (text: string) =>
    Toast.showWithGravity(text, Toast.SHORT, Toast.BOTTOM)

  function removeEmptyValues<T extends object>(obj: T) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null)
    ) as { [K in keyof T]: any }
  }

  const requestPermissionsAndSave = async ({
    title,
    startDate,
    endDate,
    location,
    description: notes,
  }: CalendarItem) => {
    const auth = await RNCalendarEvents.requestPermissions()

    if (auth === 'authorized') {
      try {
        const details = {
          startDate: startDate
            ? new Date(startDate).toISOString()
            : new Date().toISOString(),
          endDate: endDate
            ? new Date(endDate).toISOString()
            : new Date().toISOString(),
          location,
          notes,
        }

        const detailsWithoutEmpty = removeEmptyValues(details)

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
