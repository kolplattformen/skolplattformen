/* eslint-disable react-native-a11y/has-accessibility-hint */
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Child} from '../libs/api/lib';
import {
  useCalendar,
  useClassmates,
  useMenu,
  useNews,
  useNotifications,
  useSchedule,
} from '../libs/hooks/src';
import {Button, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import moment, {Moment} from 'moment';
import React, {useEffect} from 'react';
import {TouchableOpacity, useColorScheme, View} from 'react-native';
import {useTranslation} from '../hooks/useTranslation';
import {Colors, Layout, Sizing} from '../styles';
import {getMeaningfulStartingDate} from '../utils/calendarHelpers';
import {studentName} from '../utils/peopleHelpers';
import {DaySummary} from './daySummary.component';
import {AlertIcon, RightArrowIcon} from './icon.component';
import {RootStackParamList} from './navigation.component';
import {StudentAvatar} from './studentAvatar.component';

interface ChildListItemProps {
  child: Child;
  color: string;
  updated: string;
  currentDate?: Moment;
}
type ChildListItemNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Children'
>;

export const ChildListItem = ({
  child,
  color,
  updated,
  currentDate = moment(),
}: ChildListItemProps) => {
  // Forces rerender when child.id changes
  React.useEffect(() => {
    // noop
  }, [child.id]);

  const navigation = useNavigation<ChildListItemNavigationProp>();
  const {t} = useTranslation();
  // const t = (key: string) => key;
  const {data: notifications, reload: notificationsReload} =
    useNotifications(child);
  const {data: news, status: newsStatus, reload: newsReload} = useNews(child);
  const {data: classmates, reload: classmatesReload} = useClassmates(child);
  const {data: calendar, reload: calendarReload} = useCalendar(child);
  const {data: menu, reload: menuReload} = useMenu(child);
  const {data: schedule, reload: scheduleReload} = useSchedule(
    child,
    moment(currentDate).toISOString(),
    moment(currentDate).add(7, 'days').toISOString(),
  );

  useEffect(() => {
    // Do not refresh if updated is empty (first render of component)
    if (updated === '') return;

    newsReload();
    classmatesReload();
    notificationsReload();
    calendarReload();
    menuReload();
    scheduleReload();

    // Without eslint-disable below we get into a forever loop
    // because the function pointers to reload functions change on every reload.
    // I do not know a workaround for this.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  const notificationsThisWeek = notifications.filter(
    ({dateCreated, dateModified}) => {
      const date = dateModified || dateCreated;
      return date ? moment(date).isSame(moment(), 'week') : false;
    },
  );

  const newsThisWeek = news.filter(({modified, published}) => {
    const newsDate = modified || published;
    return newsDate ? moment(newsDate).isSame(currentDate, 'week') : false;
  });

  const scheduleAndCalendarThisWeek = [
    ...(calendar ?? []),
    ...(schedule ?? []),
  ].filter(({startDate}) =>
    startDate
      ? moment(startDate).isBetween(
          moment(currentDate).startOf('day'),
          moment(currentDate).add(7, 'days'),
        )
      : false,
  );

  const displayDate = (inputDate: moment.MomentInput) => {
    return moment(inputDate).fromNow();
  };

  const getClassName = () => {
    // hack: we can find the class name (ex. 8C) from the classmates.
    // let's pick the first one and select theirs class
    // hack 2: we can find school namn in skola24 if child data is there
    if (classmates.length > 0) {
      return (
        classmates[0].className +
        (child.schoolID == null ? '' : ' • ' + child.schoolID)
      );
    }

    // Taken from Skolverket
    // https://www.skolverket.se/skolutveckling/anordna-och-administrera-utbildning/administrera-utbildning/skoltermer-pa-engelska
    const abbrevations = {
      G: t('abbrevations.upperSecondarySchool'),
      GR: t('abbrevations.compulsorySchool'),
      F: t('abbrevations.leisureTimeCentre'),
      FS: t('abbrevations.preSchool'),
    };

    return child.status
      ? child.status
          .split(';')
          .map(status => {
            const statusAsAbbreviation = status as keyof typeof abbrevations;

            return abbrevations[statusAsAbbreviation] || status;
          })
          .join(', ')
      : null;
  };

  const className = getClassName();
  const styles = useStyleSheet(themeStyles);
  const isDarkMode = useColorScheme() === 'dark';
  const meaningfulStartingDate = getMeaningfulStartingDate(currentDate);

  // Hide menu if we want to show monday but it is not monday yet.
  // The menu for next week is not available until monday
  const shouldShowLunchMenu =
    menu[meaningfulStartingDate.isoWeekday() - 1] &&
    !(
      meaningfulStartingDate.isoWeekday() === 1 &&
      currentDate.isoWeekday() !== 1
    );

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Child', {child, color})}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <StudentAvatar name={studentName(child.name)} color={color} />
            <View style={styles.cardHeaderText}>
              <Text category="h6">{studentName(child.name)}</Text>
              {className ? <Text category="s1">{className}</Text> : null}
            </View>
          </View>
          <View style={styles.cardHeaderRight}>
            <RightArrowIcon
              style={styles.icon}
              fill={
                isDarkMode ? Colors.neutral.gray200 : Colors.neutral.gray800
              }
              name="star"
            />
          </View>
        </View>

        <DaySummary child={child} date={meaningfulStartingDate} />

        {scheduleAndCalendarThisWeek.slice(0, 3).map((calendarItem, i) => (
          <Text category="p1" key={i}>
            {`${calendarItem.title} (${displayDate(calendarItem.startDate)})`}
          </Text>
        ))}

        <Text category="c2" style={styles.label}>
          {t('navigation.news')}
        </Text>
        {notificationsThisWeek.slice(0, 3).map((notification, i) => (
          <Text category="p1" key={i}>
            {notification.message}
          </Text>
        ))}

        {newsThisWeek.slice(0, 3).map((newsItem, i) => (
          <Text category="p1" key={i}>
            {newsItem.header ?? ''}
          </Text>
        ))}

        {scheduleAndCalendarThisWeek.length ||
        notificationsThisWeek.length ||
        newsThisWeek.length ? null : (
          <Text category="p1" style={styles.noNewNewsItemsText}>
            {t('news.noNewNewsItemsThisWeek')}
          </Text>
        )}
        {shouldShowLunchMenu ? (
          <>
            <Text category="c2" style={styles.label}>
              {meaningfulStartingDate.format(
                '[' + t('schedule.lunch') + '] dddd',
              )}
            </Text>
            <Text>
              {menu[meaningfulStartingDate.isoWeekday() - 1]?.description}
            </Text>
          </>
        ) : null}

        <View style={styles.itemFooter}>
          <Button
            accessible
            accessibilityRole="button"
            accessibilityLabel={`${child.name}, ${t('abscense.title')}`}
            appearance="ghost"
            accessoryLeft={AlertIcon}
            status="primary"
            style={styles.absenceButton}
            onPress={() => navigation.navigate('Absence', {child})}>
            {t('abscense.title')}
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const themeStyles = StyleService.create({
  card: {
    borderRadius: 25,
    padding: Sizing.t5,
    marginBottom: Sizing.t4,
    backgroundColor: 'background-basic-color-1',
  },
  cardHeader: {
    ...Layout.flex.row,
    ...Layout.mainAxis.center,
    ...Layout.crossAxis.spaceBetween,
    marginBottom: Sizing.t4,
  },
  cardHeaderLeft: {
    ...Layout.flex.row,
    ...Layout.mainAxis.center,
    flex: 10,
  },
  cardHeaderRight: {
    ...Layout.flex.row,
    ...Layout.crossAxis.flexEnd,
    flex: 1,
  },
  cardHeaderText: {
    marginHorizontal: Sizing.t4,
    flex: 10,
  },
  icon: {
    width: 32,
    height: 32,
  },
  label: {
    marginTop: 10,
  },
  itemFooter: {
    ...Layout.flex.row,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: Sizing.t4,
  },
  absenceButton: {
    marginLeft: -20,
  },
  itemFooterSpinner: {
    alignSelf: 'flex-end',
  },
  item: {
    marginRight: 12,
    paddingHorizontal: 2,
    paddingVertical: 0,
    marginBottom: 0,
  },
  noNewNewsItemsText: {},
});
