import {Child, MenuItem, TimetableEntry} from '../libs/api/lib';
import {useMenu, useTimetable} from '../libs/hooks/src';
import {
  List,
  ListItem,
  StyleService,
  Tab,
  TabBar,
  Text,
  useStyleSheet,
  ViewPager,
} from '@ui-kitten/components';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {LanguageService} from '../services/languageService';
import {Sizing, Typography} from '../styles';
import {TransitionView} from './transitionView.component';
import {getMeaningfulStartingDate} from '../utils/calendarHelpers';
import {translate} from '../utils/translation';

interface WeekProps {
  child: Child;
}

interface LessonListProps {
  lessons: TimetableEntry[];
  lunch?: MenuItem;
  header: string;
}

interface DayProps {
  weekDay: string;
  lunch?: MenuItem;
  lessons: TimetableEntry[];
}

const LessonList = ({lessons, header, lunch}: LessonListProps) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <List
      style={styles.part}
      data={lessons}
      ListHeaderComponent={() => (
        <Text maxFontSizeMultiplier={2} category="c1" style={styles.header}>
          {header}
        </Text>
      )}
      renderItem={({
        item: {id, code, name, timeStart, timeEnd, teacher, location},
      }) => (
        <ListItem
          key={id}
          style={styles.item}
          title={() => (
            <View>
              <Text style={styles.lessonTitle} maxFontSizeMultiplier={1}>
                {name}
              </Text>
            </View>
          )}
          description={() => (
            <View style={styles.lesson}>
              <Text
                style={styles.lessonDescription}
                maxFontSizeMultiplier={1}>{`${timeStart.slice(
                0,
                5,
              )}-${timeEnd.slice(0, 5)} ${
                location === '' ? '' : '(' + location + ')'
              } `}</Text>
              <Text
                style={styles.lessonDescription}
                maxFontSizeMultiplier={1}
                numberOfLines={2}
                ellipsizeMode="tail">
                {code?.toUpperCase() === 'LUNCH' ? lunch?.description : teacher}
              </Text>
            </View>
          )}
        />
      )}
    />
  );
};

export const Day = ({weekDay, lunch, lessons}: DayProps) => {
  const styles = useStyleSheet(themedStyles);

  if (lessons.length <= 0) {
    return null;
  }
  return (
    <View style={styles.tab} key={weekDay}>
      <LessonList
        header="FM"
        lunch={lunch}
        lessons={lessons.filter(({timeStart}) => timeStart < '12:00')}
      />
      <LessonList
        header="EM"
        lunch={lunch}
        lessons={lessons.filter(({timeStart}) => timeStart >= '12:00')}
      />
    </View>
  );
};

export const Week = ({child}: WeekProps) => {
  // const translate = (key: string) => key;

  moment.locale(LanguageService.getLocale());
  const days = moment.weekdaysShort().slice(1, 6);
  const displayDate = getMeaningfulStartingDate(moment());

  const currentDayIndex = Math.min(moment(displayDate).isoWeekday() - 1, 5);
  const [selectedIndex, setSelectedIndex] = useState(currentDayIndex);
  const [showSchema, setShowSchema] = useState(false);
  const [year, week] = [displayDate.isoWeekYear(), displayDate.isoWeek()];
  const {data: lessons} = useTimetable(
    child,
    week,
    year,
    LanguageService.getLanguageCode(),
  );
  let {data: menu} = useMenu(child);

  // Hide menu if we want to show next week but it is not monday yet.
  // The menu for next week is not available until monday
  const currentDate = moment();
  const shouldShowLunchMenu =
    menu[displayDate.isoWeekday() - 1] &&
    !(displayDate.isoWeekday() === 1 && currentDate.isoWeekday() !== 1);
  if (!shouldShowLunchMenu) {
    menu = [];
  }

  const styles = useStyleSheet(themedStyles);

  useEffect(() => {
    const shouldShowSchema = lessons.length > 0;
    setShowSchema(shouldShowSchema);
  }, [lessons]);

  const getWeekText = (date = moment()) => {
    return `${translate('schedule.week')} ${date.isoWeek()}`;
  };

  return showSchema ? (
    <TransitionView style={styles.view} animation={'fadeInDown'}>
      <TransitionView style={styles.innerView} animation={'fadeIn'}>
        <Text style={styles.weekNumber}>{getWeekText(displayDate)}</Text>
        <TabBar
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          {days.map((weekDay, index) => (
            <Tab
              key={weekDay}
              title={_ => (
                <>
                  <Text style={styles.tabTitle}>{weekDay}</Text>
                  <Text style={styles.tabTitleDate}>
                    {displayDate
                      .startOf('isoWeek')
                      .add(index, 'day')
                      .format('D')}
                  </Text>
                </>
              )}
            />
          ))}
        </TabBar>

        <ViewPager
          selectedIndex={selectedIndex}
          style={styles.pager}
          onSelect={index => setSelectedIndex(index)}>
          {days.map((weekDay, index) => (
            <Day
              key={weekDay}
              weekDay={weekDay}
              lunch={menu[index] || {}}
              lessons={lessons
                .filter(lesson => days[lesson.dayOfWeek - 1] === weekDay)
                .sort((a, b) => a.timeStart.localeCompare(b.timeStart))}
            />
          ))}
        </ViewPager>
      </TransitionView>
    </TransitionView>
  ) : null;
};

const themedStyles = StyleService.create({
  view: {
    backgroundColor: 'background-basic-color-1',
    maxHeight: '65%',
    paddingBottom: 0,
    margin: 0,
  },
  innerView: {
    paddingBottom: 170,
    margin: 0,
  },
  part: {
    backgroundColor: 'transparent',
    width: '33%',
  },
  tab: {
    flexDirection: 'row',
    padding: 0,
  },
  item: {
    height: 90,
    backgroundColor: 'background-basic-color-2',
    paddingHorizontal: 0,
    borderRadius: 2,
    margin: 2,
    paddingLeft: Sizing.t2,
    paddingRight: Sizing.t2,
    width: '90%',
  },
  time: {
    color: 'color-basic-500',
    fontSize: 9,
  },
  dayTab: {
    textAlign: 'left',
  },
  summary: {
    paddingRight: 20,
    paddingLeft: 2,
  },
  startTime: {
    paddingBottom: 2,
  },
  lunchLabel: {
    paddingTop: 10,
    paddingBottom: 2,
  },
  lunch: {
    width: 100,
  },
  endTime: {
    paddingTop: 10,
  },
  pager: {
    margin: 10,
    ...Typography.fontWeight.bold,
  },
  header: {
    paddingLeft: 10,
  },
  lessonTitle: {
    ...Typography.fontWeight.semibold,
    fontSize: 13,
  },
  lessonDescription: {
    fontSize: 13,
  },
  lesson: {
    flexDirection: 'column',
  },
  weekNumber: {
    marginLeft: 10,
    marginTop: 10,
    ...Typography.fontWeight.bold,
  },
  tabTitle: {
    textAlign: 'center',
  },
  tabTitleDate: {
    textAlign: 'center',
  },
});
