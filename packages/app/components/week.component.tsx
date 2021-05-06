import {
  List,
  ListItem,
  ViewPager,
  Text,
  TabBar,
  Tab,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { View } from 'react-native'
import { useMenu, useTimetable } from '@skolplattformen/api-hooks'
import { TimetableEntry, Child, MenuItem } from '@skolplattformen/embedded-api'
import { LanguageService } from '../services/languageService'
import { translate } from '../utils/translation'
import { TransitionView } from './transitionView.component'
import { Typography } from '../styles'

interface WeekProps {
  child: Child
}

interface LessonListProps {
  lessons: TimetableEntry[]
  header: string
}

interface DayProps {
  weekDay: string
  lunch?: MenuItem
  lessons: TimetableEntry[]
}

const LessonList = ({ lessons, header }: LessonListProps) => {
  const styles = useStyleSheet(themedStyles)

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
        item: { id, name, timeStart, timeEnd, teacher, location },
      }) => (
        <ListItem
          key={id}
          style={styles.item}
          title={() => (
            <Text style={styles.lessonTitle} maxFontSizeMultiplier={1}>
              {name}
            </Text>
          )}
          description={() => (
            <Text maxFontSizeMultiplier={1}>{`${timeStart.slice(
              0,
              5
            )}-${timeEnd.slice(0, 5)} ${
              location ? `(${location})` : ''
            } ${teacher}`}</Text>
          )}
        />
      )}
    />
  )
}

export const Day = ({ weekDay, lunch, lessons }: DayProps) => {
  const styles = useStyleSheet(themedStyles)

  if (lessons.length <= 0) {
    return null
  }
  return (
    <View style={styles.tab} key={weekDay}>
      <View style={styles.summary}>
        <Text maxFontSizeMultiplier={2} category="c1" style={styles.startTime}>
          {translate('schedule.start', { defaultValue: 'Börjar' })}
        </Text>
        <Text maxFontSizeMultiplier={3} category="h4">
          {lessons[0].timeStart.slice(0, 5)}
        </Text>
        <Text category="c1" style={styles.lunchLabel}>
          {translate('schedule.lunch', { defaultValue: 'Lunch' })}
        </Text>
        <Text maxFontSizeMultiplier={2} category="c2" style={styles.lunch}>
          {lunch?.description}
        </Text>
        <Text maxFontSizeMultiplier={3} category="c1" style={styles.endTime}>
          {translate('schedule.end', { defaultValue: 'Slutar' })}
        </Text>
        <Text maxFontSizeMultiplier={2} category="h4">
          {lessons[lessons.length - 1].timeEnd.slice(0, 5)}
        </Text>
        <Text maxFontSizeMultiplier={2} category="c2">
          {lessons.some((lesson) => lesson.code === 'IDH')
            ? `🤼‍♀️ ${translate('schedule.gymBag', {
                defaultValue: 'Gympapåse',
              })}`
            : ''}
        </Text>
      </View>
      <LessonList
        header="FM"
        lessons={lessons.filter(({ timeStart }) => timeStart < '12:00')}
      />
      <LessonList
        header="EM"
        lessons={lessons.filter(({ timeStart }) => timeStart >= '12:00')}
      />
    </View>
  )
}

export const Week = ({ child }: WeekProps) => {
  moment.locale(LanguageService.getLanguageCode())
  const days = moment.weekdaysShort().slice(1, 6)
  const currentDayIndex = Math.min(moment().isoWeekday() - 1, 5)
  const [selectedIndex, setSelectedIndex] = useState(currentDayIndex)
  const [showSchema, setShowSchema] = useState(false)
  const [year, week] = [moment().isoWeekYear(), moment().isoWeek()]
  const { data: lessons } = useTimetable(
    child,
    week,
    year,
    LanguageService.getLanguageCode()
  )
  const { data: menu } = useMenu(child)

  const styles = useStyleSheet(themedStyles)

  useEffect(() => {
    const shouldShowSchema = lessons.length > 0
    setShowSchema(shouldShowSchema)
  }, [lessons])

  return showSchema ? (
    <TransitionView animation={'fadeInDown'}>
      <TransitionView style={styles.view} animation={'fadeIn'}>
        <TabBar
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          {days.map((weekDay) => (
            <Tab
              key={weekDay}
              title={() => <Text maxFontSizeMultiplier={1.5}>{weekDay}</Text>}
            />
          ))}
        </TabBar>

        <ViewPager
          selectedIndex={selectedIndex}
          style={styles.pager}
          onSelect={(index) => setSelectedIndex(index)}
        >
          {days.map((weekDay, index) => (
            <Day
              key={weekDay}
              weekDay={weekDay}
              lunch={menu[index] || {}}
              lessons={lessons
                .filter((lesson) => days[lesson.dayOfWeek - 1] === weekDay)
                .sort((a, b) => a.dateStart.localeCompare(b.dateStart))}
            />
          ))}
        </ViewPager>
      </TransitionView>
    </TransitionView>
  ) : null
}

const themedStyles = StyleService.create({
  view: {
    backgroundColor: 'background-basic-color-2',
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
    height: 45,
    backgroundColor: 'background-basic-color-1',
    paddingHorizontal: 0,
    borderRadius: 2,
    margin: 2,
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
    paddingLeft: 8,
  },
  lessonTitle: {
    ...Typography.fontWeight.bold,
  },
})
