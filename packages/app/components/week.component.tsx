import {
  List,
  ListItem,
  ViewPager,
  Text,
  TabBar,
  Tab,
} from '@ui-kitten/components'
import React from 'react'
import moment from 'moment'
import { StyleSheet, View } from 'react-native'
import { useTimetable } from '@skolplattformen/api-hooks'
import parse from '@skolplattformen/curriculum'
import { TimetableEntry } from '@skolplattformen/embedded-api'

const days = [
  'söndag', // yeah, they have us-type weeks in Skola24..
  'måndag',
  'tisdag',
  'onsdag',
  'torsdag',
  'fredag',
  'lördag',
]

const groupOnDays = (lessons: TimetableEntry[]) =>
  lessons
    .slice()
    .sort((a: TimetableEntry, b: TimetableEntry) =>
      a.dateStart.localeCompare(b.dateStart)
    )
    .reduce(
      (week: Object, item: TimetableEntry) => ({
        ...week,
        [item.dayOfWeek]: [...(week[item.dayOfWeek] || []), item],
      }),
      {}
    )

const LessonList = ({ lessons, header, ...props }) => (
  <List
    {...props}
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

export const Week = ({ child }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const { data: lessons } = useTimetable(
    child,
    moment().isoWeek(),
    moment().year()
  )
  const schedule = groupOnDays(lessons)

  return (
    <View style={styles.view}>
      <TabBar
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        {Object.keys(schedule).map((weekDay) => (
          <Tab key={days[weekDay]} title={days[weekDay]} />
        ))}
      </TabBar>

      {selectedIndex >= 0 ? (
        <ViewPager
          selectedIndex={selectedIndex}
          style={styles.pager}
          onSelect={(index) => setSelectedIndex(index)}
        >
          {Object.entries(schedule).map(([weekDay, day]) => (
            <View style={styles.tab} key={weekDay}>
              <View style={styles.summary}>
                <Text category="c1" style={{ paddingBottom: 2 }}>
                  Börjar
                </Text>
                <Text category="h4">{day[0].timeStart.slice(0, 5)}</Text>
                <Text category="c1">Slutar</Text>
                <Text category="h4">
                  {day[day.length - 1].timeEnd.slice(0, 5)}
                </Text>
                <Text category="c2">
                  {day.some((lesson) => lesson.code === 'IDH')
                    ? '🤼‍♀️ Gympapåse'
                    : ''}
                </Text>
              </View>
              <LessonList
                style={styles.part}
                header="FM"
                lessons={day
                  .filter(({ timeStart }) => timeStart < '12:00')
                  .sort((a, b) => a.date - b.date)}
              />
              <LessonList
                style={styles.part}
                header="EM"
                lessons={day
                  .filter(({ timeStart }) => timeStart >= '12:00')
                  .sort((a, b) => a.date - b.date)}
              />
            </View>
          ))}
        </ViewPager>
      ) : null}
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
  pager: {
    margin: 10,
  },
  header: {
    paddingLeft: 8,
  },
})
