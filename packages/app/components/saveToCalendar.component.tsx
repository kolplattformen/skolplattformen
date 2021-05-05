import { CalendarItem } from '@skolplattformen/embedded-api'
import { Button, MenuItem, OverflowMenu } from '@ui-kitten/components'
import React from 'react'
import RNCalendarEvents from 'react-native-calendar-events'
import Toast from 'react-native-simple-toast'
import { translate } from '../utils/translation'
import { CalendarOutlineIcon, MoreIcon } from './icon.component'

interface SaveToCalendarProps {
  event: CalendarItem
}

export const SaveToCalendar = ({ event }: SaveToCalendarProps) => {
  const [visible, setVisible] = React.useState(false)

  const renderToggleButton = () => (
    <Button
      accessibilityLabel={translate('calender.showCalenderActions')}
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
        }

        const detailsWithoutEmpty = removeEmptyValues(details)

        await RNCalendarEvents.saveEvent(title, detailsWithoutEmpty)

        toast(translate('calender.saveToCalenderSuccess'))
      } catch (err) {
        toast(translate('calender.saveToCalenderError'))
      }
      closeOverflowMenu()
    } else {
      toast(translate('calender.approveAccessToCalender'))
    }
  }

  return (
    <OverflowMenu
      visible={visible}
      anchor={renderToggleButton}
      onBackdropPress={closeOverflowMenu}
    >
      <MenuItem
        accessibilityLabel={translate('calender.saveToCalender')}
        accessoryLeft={CalendarOutlineIcon}
        title={translate('calender.saveToCalender')}
        onPress={() => requestPermissionsAndSave(event)}
      />
    </OverflowMenu>
  )
}
