import {CalendarItem} from '../libs/api/lib';
import {Button, MenuItem, OverflowMenu, Text} from '@ui-kitten/components';
import React from 'react';
import RNCalendarEvents from 'react-native-calendar-events';
import Toast from 'react-native-simple-toast';
import {translate} from '../utils/translation';
import {CalendarOutlineIcon, MoreIcon} from './icon.component';

interface SaveToCalendarProps {
  event: CalendarItem;
}

// const translate = (key: string) => key;

export const SaveToCalendar = ({event}: SaveToCalendarProps) => {
  const [visible, setVisible] = React.useState(false);

  const renderToggleButton = () => (
    <Button
      testID="actionsButton"
      accessibilityHint={translate('calender.showCalenderActions')}
      onPress={() => setVisible(true)}
      appearance="ghost"
      accessoryLeft={MoreIcon}
    />
  );

  const closeOverflowMenu = () => {
    setVisible(false);
  };

  const toast = (text: string) =>
    Toast.showWithGravity(text, Toast.SHORT, Toast.BOTTOM);

  function removeEmptyValues<T extends Record<string, unknown>>(obj: T) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null),
    ) as {[K in keyof T]: any};
  }

  const requestPermissionsAndSave = async ({
    title,
    startDate,
    endDate,
    location,
  }: CalendarItem) => {
    const auth = await RNCalendarEvents.requestPermissions();

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
        };

        const detailsWithoutEmpty = removeEmptyValues(details);

        await RNCalendarEvents.saveEvent(title, detailsWithoutEmpty);

        toast(translate('calender.saveToCalenderSuccess'));
      } catch (err) {
        toast(translate('calender.saveToCalenderError'));
      }
      closeOverflowMenu();
    } else {
      toast(translate('calender.approveAccessToCalender'));
    }
  };

  return (
    <OverflowMenu
      visible={visible}
      anchor={renderToggleButton}
      onBackdropPress={closeOverflowMenu}>
      <MenuItem
        accessoryLeft={CalendarOutlineIcon}
        title={evaProps => (
          <Text {...evaProps} maxFontSizeMultiplier={2}>
            {translate('calender.saveToCalender')}
          </Text>
        )}
        onPress={() => requestPermissionsAndSave(event)}
      />
    </OverflowMenu>
  );
};
