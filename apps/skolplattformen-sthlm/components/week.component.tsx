import {
  Child,
  MenuItem,
  TimetableEntry,
} from '@skolplattformen/api-skolplattformen'
import { useMenu, useTimetable } from '@skolplattformen/hooks'
import {
  List,
  ListItem,
  StyleService,
  Tab,
  TabBar,
  Text,
  useStyleSheet,
  ViewPager,
} from '@ui-kitten/components'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { LanguageService } from '../services/languageService'
import { Sizing, Typography } from '../styles'
import { TransitionView } from './transitionView.component'

interface WeekProps {
  child: Child
}

interface LessonListProps {
  lessons: TimetableEntry[]
  lunch?: MenuItem
  header: string
}

interface DayProps {
  weekDay: string
  lunch?: MenuItem
  lessons: TimetableEntry[]
}

const LessonList = ({ lessons, header, lunch }: LessonListProps) => {
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
        item: { id, code, name, timeStart, timeEnd, teacher, location },
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
                maxFontSizeMultiplier={1}
              >{`${timeStart.slice(0, 5)}-${timeEnd.slice(0, 5)} ${
                location === '' ? '' : '(' + location + ')'
              } `}</Text>
              <Text style={styles.lessonDescription} maxFontSizeMultiplier={1}>
                {code?.toUpperCase() === 'LUNCH' ? lunch?.description : teacher}
              </Text>
            </View>
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
      <LessonList
        header="FM"
        lunch={lunch}
        lessons={lessons.filter(({ timeStart }) => timeStart < '12:00')}
      />
      <LessonList
        header="EM"
        lunch={lunch}
        lessons={lessons.filter(({ timeStart }) => timeStart >= '12:00')}
      />
    </View>
  )
}

export const Week = ({ child }: WeekProps) => {
  moment.locale(LanguageService.getLocale())
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
    <TransitionView style={styles.view} animation={'fadeInDown'}>
      <TransitionView style={styles.innerView} animation={'fadeIn'}>
        <TabBar
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          {days.map((weekDay) => (
            <Tab key={weekDay} title={weekDay} />
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
    backgroundColor: 'background-basic-color-1',
    maxHeight: '60%',
    paddingBottom: 0,
    margin: 0,
  },
  innerView: {
    paddingBottom: 60,
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
    height: 55,
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
})
