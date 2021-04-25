import {
  List,
  ListItem,
  ViewPager,
  Text,
  TabBar,
  Tab,
} from '@ui-kitten/components'
import React from 'react'
import moment, { weekdays } from 'moment'
import { StyleSheet, View } from 'react-native'
import { useTimetable } from '@skolplattformen/api-hooks'
import parse from '@skolplattformen/curriculum'
import { TimetableEntry, Child } from '@skolplattformen/embedded-api'

const days = ['måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag']

interface WeekProps {
  child: Child
}

interface LessonListProps {
  lessons: TimetableEntry[]
  header: string
}

interface DayProps {
  weekDay: string
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
    renderItem={({ item: { id, code, timeStart, timeEnd, teacher, room } }) => (
      <ListItem
        key={id}
        style={styles.item}
        title={`${parse(code).name || code}`}
        description={`${timeStart.slice(0, 5)}-${timeEnd.slice(0, 5)} ${
          room ? `(${room})` : ''
        } ${teacher}`}
      />
    )}
  />
)

export const Day = ({ weekDay, lessons }: DayProps) =>
  lessons.length ? (
    <View style={styles.tab} key={weekDay}>
      <View style={styles.summary}>
        <Text category="c1" style={styles.summaryHeader}>
          Börjar
        </Text>
        <Text category="h4">{lessons[0].timeStart.slice(0, 5)}</Text>
        <Text category="c1">Slutar</Text>
        <Text category="h4">
          {lessons[lessons.length - 1].timeEnd.slice(0, 5)}
        </Text>
        <Text category="c2">
          {lessons.some((lesson) => lesson.code === 'IDH')
            ? '🤼‍♀️ Gympapåse'
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
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [year, week] = [moment().isoWeekYear(), moment().isoWeek()]
  const { data: lessons } = useTimetable(child, year, week)

  return (
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
        {days.map((weekDay) => (
          <Day
            weekDay={weekDay}
            lessons={lessons.filter(
              (lesson) => days[lesson.dayOfWeek - 1] === weekDay
            )}
          />
        ))}
      </ViewPager>
    </View>
  )
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
  summaryHeader: {
    paddingBottom: 2,
  },
  pager: {
    margin: 10,
  },
  header: {
    paddingLeft: 8,
  },
})
