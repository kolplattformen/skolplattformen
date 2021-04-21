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

const subjects = {
  BL: 'Bild',
  BI: 'Biologi',
  EN: 'Engelska',
  EV: 'Elevens val', // jag gissar
  FY: 'Fysik',
  GE: 'Geografi',
  HKK: 'Hemkunskap',
  HI: 'Historia',
  IDH: 'Idrott och hälsa',
  KE: 'Kemi',
  MA: 'Matematik',
  M1: 'Moderna språk', // will have extra language code
  M2: 'Moderna språk', // will have extra language code
  ML: 'Modersmål', // will have extra language code
  M2FR: 'Franska',
  MU: 'Musik',
  RE: 'Religionskunskap',
  SH: 'Samhällskunskap',
  SL: 'Slöjd',
  SV: 'Svenska',
  SVA: 'Svenska som andraspråk',
  TN: 'Teckenspråk för hörande',
  TK: 'Teknik',
  Prandium: 'Lunch',
}

const groupOnDays = (lessons: TimetableEntry[]) =>
  lessons
    .slice()
    .sort((a, b) => a.dateStart - b.dateStart)
    .reduce(
      (week, item) => ({
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
        title={`${subjects[code] || code}`}
        description={`${timeStart.slice(0,5)}-${timeEnd.slice(0,5)} ${room ? `(${room})` : ''} ${teacher}`}
      />
    )}
  />
)

export const Week = ({ child }) => {
  const defaultDay = moment().add(7, 'hours').weekday() // show tomorrow's schedule after 17
  const [selectedIndex, setSelectedIndex] = React.useState(defaultDay)
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
                <Text category="h4">{day[0].timeStart.slice(0,5)}</Text>
                <Text category="c1">Slutar</Text>
                <Text category="h4">{day[day.length - 1].timeEnd.slice(0,5)}</Text>
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
