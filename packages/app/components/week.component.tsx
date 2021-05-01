import {
  List,
  ListItem,
  ViewPager,
  Text,
  TabBar,
  Tab,
} from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { StyleSheet, View } from 'react-native'
import { useMenu, useTimetable } from '@skolplattformen/api-hooks'
import { TimetableEntry, Child, MenuItem } from '@skolplattformen/embedded-api'
import { LanguageService } from '../services/languageService'
import { translate } from '../utils/translation'

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

const LessonList = ({ lessons, header }: LessonListProps) => (
  <List
    style={styles.part}
    data={lessons}
    ListHeaderComponent={() => (
      <Text category="c1" style={styles.header}>
        {header}
      </Text>
    )}
    renderItem={({
      item: { id, name, timeStart, timeEnd, teacher, location },
    }) => (
      <ListItem
        key={id}
        style={styles.item}
        title={name}
        description={`${timeStart.slice(0, 5)}-${timeEnd.slice(0, 5)} ${
          location ? `(${location})` : ''
        } ${teacher}`}
      />
    )}
  />
)

export const Day = ({ weekDay, lunch, lessons }: DayProps) =>
  lessons.length ? (
    <View style={styles.tab} key={weekDay}>
      <View style={styles.summary}>
        <Text category="c1" style={styles.startTime}>
          {translate('schedule.start', { defaultValue: 'Börjar' })}
        </Text>
        <Text category="h4">{lessons[0].timeStart.slice(0, 5)}</Text>
        <Text category="c1" style={styles.lunchLabel}>
          {translate('schedule.lunch', { defaultValue: 'Lunch' })}
        </Text>
        <Text category="c2" style={styles.lunch}>
          {lunch?.description}
        </Text>
        <Text category="c1" style={styles.endTime}>
          {translate('schedule.end', { defaultValue: 'Slutar' })}
        </Text>
        <Text category="h4">
          {lessons[lessons.length - 1].timeEnd.slice(0, 5)}
        </Text>
        <Text category="c2">
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
  ) : null

export const Week = ({ child }: WeekProps) => {
  moment.locale(LanguageService.getLanguageCode())
  const days = moment.weekdaysShort().slice(1, 6)
  const currentDayIndex = Math.min(moment().isoWeekday() - 1, 5)
  const [selectedIndex, setSelectedIndex] = useState(currentDayIndex)
  const [showSchema, setShowSchema] = useState(false)
  const [year, week] = [moment().isoWeekYear(), moment().isoWeek()]
  const { data: lessons, status: lessonsLoadingStatus } = useTimetable(
    child,
    week,
    year,
    LanguageService.getLanguageCode()
  )
  const { data: menu } = useMenu(child)

  useEffect(() => {
    const shouldShowSchema =
      lessonsLoadingStatus === 'loaded' && lessons.length > 0
    setShowSchema(shouldShowSchema)
  }, [lessonsLoadingStatus, lessons])

  return showSchema ? (
    <View style={styles.view}>
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
    </View>
  ) : null
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fafafa',
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
    backgroundColor: 'white',
    paddingHorizontal: 0,
    borderRadius: 2,
    margin: 2,
    width: '90%',
  },
  time: {
    color: '#333',
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
  },
  header: {
    paddingLeft: 8,
  },
})
