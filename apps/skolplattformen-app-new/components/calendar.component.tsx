import {useCalendar} from '../libs/hooks/src';
import {CalendarItem} from '../libs/api/lib';
import {
  Divider,
  List,
  ListItem,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import moment from 'moment';
import React from 'react';
import {Layout as LayoutStyle, Sizing, Typography} from '../styles';
import {ListRenderItemInfo, RefreshControl, View} from 'react-native';

import {translate} from '../utils/translation';
import {useChild} from './childContext.component';
import {CalendarOutlineIcon} from './icon.component';
import {SaveToCalendar} from './saveToCalendar.component';
import {Week} from './week.component';

// const translate = (key: string) => key;

export const Calendar = () => {
  const child = useChild();
  const {data, status, reload} = useCalendar(child);
  const styles = useStyleSheet(themedStyles);

  const formatStartDate = (startDate: moment.MomentInput) => {
    const date = moment(startDate);
    const output = `${date.format('dddd')} ${date.format(
      'll',
    )} • ${date.fromNow()}`;

    // Hack to remove year if it is this year
    const currentYear = moment().year().toString(10);
    return output.replace(currentYear, '');
  };

  const sortedData = () => {
    if (!data) return [];

    return data.sort((a, b) =>
      a.startDate && b.startDate ? a.startDate.localeCompare(b.startDate) : 0,
    );
  };

  return (
    <View style={styles.container}>
      <Week child={child} />
      <List
        data={sortedData()}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateHeadline} category="h6">
              {translate('calender.emptyHeadline')}
            </Text>
            <Text style={styles.emptyStateDescription}>
              {translate('calender.emptyText')}
            </Text>
          </View>
        }
        renderItem={({item}: ListRenderItemInfo<CalendarItem>) => (
          <ListItem
            disabled={true}
            title={`${item.title}`}
            description={props => (
              <Text style={[props?.style, styles.description]}>
                {formatStartDate(item.startDate)}
              </Text>
            )}
            accessoryLeft={CalendarOutlineIcon}
            accessoryRight={() => <SaveToCalendar event={item} />}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={status === 'loading'}
            onRefresh={reload}
          />
        }
      />
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
    height: '100%',
    width: '100%',
  },
  description: {
    ...Typography.fontSize.xs,
    color: 'text-hint-color',
  },
  emptyState: {
    ...LayoutStyle.center,
    ...LayoutStyle.flex.full,
  },
  emptyStateHeadline: {
    ...Typography.align.center,
    margin: Sizing.t4,
  },
  emptyStateDescription: {
    ...Typography.align.center,
    lineHeight: 21,
    paddingHorizontal: Sizing.t3,
    margin: Sizing.t4,
  },
});
