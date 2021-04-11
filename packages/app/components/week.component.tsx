import {
  List,
  ListItem,
  ViewPager,
  Text,
  TabBar,
  Tab,
  Card,
} from '@ui-kitten/components'
import React from 'react'
import moment from 'moment'
import { StyleSheet, View } from 'react-native'

const week = 15
const lessonInfo = [
  {
    guidId: 'NDRhMTM1MGMtZmJmZi05MTYzLWVmNzUtMGEyZDM4Mzk0N2Q4',
    texts: ['IDH', 'ANB', 'IdA'],
    timeStart: '13:15:00',
    timeEnd: '14:35:00',
    dayOfWeekNumber: 1,
    blockName: '',
  },
  {
    guidId: 'OGZmNzQyYWEtOGJmNS05YThmLWVhZWEtMmQ1MDRhNzYxMzEw',
    texts: ['SO', 'FEW', 'A251'],
    timeStart: '11:10:00',
    timeEnd: '12:20:00',
    dayOfWeekNumber: 1,
    blockName: '',
  },
  {
    guidId: 'ODhiNjlhOGQtNGU3YS05ZjkzLWZjYWMtOWIzMTE0NGMyNDkw',
    texts: ['NO', 'PÄA', 'A206'],
    timeStart: '10:00:00',
    timeEnd: '11:05:00',
    dayOfWeekNumber: 1,
    blockName: '',
  },
  {
    guidId: 'MGExY2U3NWUtMGY3OC05NzM4LWZhY2YtNjIxOGRhMDU5NDdl',
    texts: ['Prandium', '', ''],
    timeStart: '12:20:00',
    timeEnd: '12:50:00',
    dayOfWeekNumber: 1,
    blockName: '',
  },
  {
    guidId: 'MjZjYjZjZWQtMWJhOC05M2Q1LWY2NGItZDdhZDRlMWFkNjFj',
    texts: ['EV', 'MIZ', 'HKK'],
    timeStart: '14:55:00',
    timeEnd: '16:15:00',
    dayOfWeekNumber: 1,
    blockName: '',
  },
  {
    guidId: 'NGRjOGQ1YTEtZWI1MC05ZjQ2LWMzMzQtZDVlZmU4NDMwOTBh',
    texts: ['SL', 'HAL', 'TM'],
    timeStart: '09:20:00',
    timeEnd: '10:40:00',
    dayOfWeekNumber: 2,
    blockName: '',
  },
  {
    guidId: 'Mzg5MGE3Y2MtOTA5My05NmFkLWY2MGQtYWMyNzQwZmY0MmQ0',
    texts: ['MA', 'DAG', 'A251'],
    timeStart: '10:45:00',
    timeEnd: '11:40:00',
    dayOfWeekNumber: 2,
    blockName: '',
  },
  {
    guidId: 'MDIzNjQ0MGMtYTZhZS05N2JkLWQwODQtOGQ4N2Y5OTc1NTFk',
    texts: ['M2FR', 'STT', 'G205'],
    timeStart: '15:05:00',
    timeEnd: '15:55:00',
    dayOfWeekNumber: 2,
    blockName: '',
  },
  {
    guidId: 'YTc1MTg3ODctMWVmOC05MjJmLWNjM2UtODdkMGI4NjAwMTI2',
    texts: ['EN', 'ANL', 'A251'],
    timeStart: '12:30:00',
    timeEnd: '13:25:00',
    dayOfWeekNumber: 2,
    blockName: '',
  },
  {
    guidId: 'OGM4N2ZlYjEtZjRmYi05ZGU1LWNkOWMtZDViYTc1ZTc5MWYz',
    texts: ['NO', 'PÄA', 'A210'],
    timeStart: '13:50:00',
    timeEnd: '14:55:00',
    dayOfWeekNumber: 2,
    blockName: '',
  },
  {
    guidId: 'OWFlNTNhOWQtNGIzYS05MTU1LWMzOTUtMTU3ZTBkM2VkOTE1',
    texts: ['Prandium', '', ''],
    timeStart: '11:40:00',
    timeEnd: '12:10:00',
    dayOfWeekNumber: 2,
    blockName: '',
  },
  {
    guidId: 'MmVkNGNhYzAtOTQyNC05MDhmLWNmNzgtNzllOGY2YWQ4ZGI0',
    texts: ['NO', 'PÄA', 'A211'],
    timeStart: '14:20:00',
    timeEnd: '15:20:00',
    dayOfWeekNumber: 3,
    blockName: '',
  },
  {
    guidId: 'NDVkOTljZDEtNTc1NS05ZjY1LWM3Y2UtNzk5NjFmMDUyM2Rm',
    texts: ['M2FR', 'STT', 'G205'],
    timeStart: '11:20:00',
    timeEnd: '12:10:00',
    dayOfWeekNumber: 3,
    blockName: '',
  },
  {
    guidId: 'YmY0ZGRhZDEtM2U2NS05NjY2LWMwYjgtMDY2N2Y1MGJhZWVj',
    texts: ['MU', 'ANL', 'MU'],
    timeStart: '13:10:00',
    timeEnd: '14:10:00',
    dayOfWeekNumber: 3,
    blockName: '',
  },
  {
    guidId: 'YjEyY2MwZjAtNDM5MC05NDE4LWRjYzItZTMyMzU5MGZkZDIz',
    texts: ['SV', 'MPH', 'A245'],
    timeStart: '10:25:00',
    timeEnd: '11:15:00',
    dayOfWeekNumber: 3,
    blockName: '',
  },
  {
    guidId: 'YjhmYWUyYTItNmM0OC05NWI1LWRlYWItODkwYTBkYzgzZWM0',
    texts: ['MA', 'DAG', 'A210'],
    timeStart: '08:15:00',
    timeEnd: '09:10:00',
    dayOfWeekNumber: 3,
    blockName: '',
  },
  {
    guidId: 'ZDMxYTc4ZDYtOThiZC05NTFmLWQ0ODItNjMzNjNiODRhZDUx',
    texts: ['SO', 'FEW', 'A251'],
    timeStart: '09:15:00',
    timeEnd: '10:10:00',
    dayOfWeekNumber: 3,
    blockName: '',
  },
  {
    guidId: 'NGEyZDRhMzUtMjlmYS05ODk1LWU0ZTAtMjNjNTM5MTVjMzFh',
    texts: ['Prandium', '', ''],
    timeStart: '12:20:00',
    timeEnd: '12:50:00',
    dayOfWeekNumber: 3,
    blockName: '',
  },
  {
    guidId: 'OWVkM2RkYzktNjUwZi05YjI1LWRhMjktMDlhMTlkOTAwOTdj',
    texts: ['M2FR', 'STT', 'G205'],
    timeStart: '10:10:00',
    timeEnd: '11:00:00',
    dayOfWeekNumber: 4,
    blockName: '',
  },
  {
    guidId: 'MzhlZmEwMTQtNzA5Zi05ZjNlLWRhNmUtYzI1ZmMyMTJkODEz',
    texts: ['MENTOR', 'MIZ,MAH,HAL', 'A251'],
    timeStart: '14:10:00',
    timeEnd: '14:40:00',
    dayOfWeekNumber: 4,
    blockName: '',
  },
  {
    guidId: 'OTQ1MWFiN2EtYWM4ZC05OTFkLWM5MDktMmFiNjllNTk1MzRj',
    texts: ['SV', 'MPH', 'G305'],
    timeStart: '08:15:00',
    timeEnd: '09:05:00',
    dayOfWeekNumber: 4,
    blockName: '',
  },
  {
    guidId: 'MjFlYjFhODYtZTJlNC05MTA3LWY1YjItYjMzMjJlYjhhMGI5',
    texts: ['Prandium', '', ''],
    timeStart: '12:20:00',
    timeEnd: '12:50:00',
    dayOfWeekNumber: 4,
    blockName: '',
  },
  {
    guidId: 'ZGIzMmVmNGQtMzgzNy05M2UxLWQ5MjItNmNlM2RiODA1YjQy',
    texts: ['SV', 'MPH', 'G305'],
    timeStart: '09:10:00',
    timeEnd: '10:05:00',
    dayOfWeekNumber: 4,
    blockName: '',
  },
  {
    guidId: 'YjZkYzYzZDItNzFmMy05ZTc5LWRlZDQtM2E4NDA1ZWU5ZjZh',
    texts: ['MA', 'DAG', 'A210'],
    timeStart: '11:25:00',
    timeEnd: '12:20:00',
    dayOfWeekNumber: 4,
    blockName: '',
  },
  {
    guidId: 'ZjUxMGIyYjgtNTE0YS05MmUwLWRjOWMtNDA5NjUyZDMxODU4',
    texts: ['SO', 'FEW', 'A208'],
    timeStart: '12:55:00',
    timeEnd: '14:00:00',
    dayOfWeekNumber: 4,
    blockName: '',
  },
  {
    guidId: 'M2VkOTQ2NjAtNGYwNC05MjdlLWQyM2EtNmQwNmNlMzYyNTJi',
    texts: ['Prandium', '', ''],
    timeStart: '12:35:00',
    timeEnd: '13:05:00',
    dayOfWeekNumber: 5,
    blockName: '',
  },
  {
    guidId: 'M2ZlY2M2NjctNzljMS05ZTlkLWQ2MTQtODc5NzY0ZWQ3MGJk',
    texts: ['IDH', 'ANB', 'IdA'],
    timeStart: '11:00:00',
    timeEnd: '12:20:00',
    dayOfWeekNumber: 5,
    blockName: '',
  },
  {
    guidId: 'ZGQ2OTAyZGUtZWRlNS05Mzc5LWUxMWItY2MwYmY1NGJmN2Q4',
    texts: ['EN', 'ANL', 'A245'],
    timeStart: '09:35:00',
    timeEnd: '10:30:00',
    dayOfWeekNumber: 5,
    blockName: '',
  },
  {
    guidId: 'MWNkMTUyNjQtODY0OS05OGJhLWQ0YmItZTE2YjIzNTNhZTI4',
    texts: ['MA', 'DAG', 'A210'],
    timeStart: '08:35:00',
    timeEnd: '09:30:00',
    dayOfWeekNumber: 5,
    blockName: '',
  },
  {
    guidId: 'NTlkZGMzNmEtYTEzZS05Nzg3LWQ1YTEtMjZmNWFmNDIwNmNj',
    texts: ['HKK', 'MIZ', 'HKK'],
    timeStart: '13:35:00',
    timeEnd: '15:45:00',
    dayOfWeekNumber: 5,
    blockName: '',
  },
]

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

const convert = (lessonInfo) =>
  lessonInfo
    .map(
      ({
        guidId: id,
        texts: [subject, teacher, room],
        timeStart,
        timeEnd,
        dayOfWeekNumber: day,
      }) => ({
        id,
        subjectCode: subject,
        subject: subjects[subject] || subject,
        teacher,
        room,
        date: moment()
          .week(week)
          .weekday(day)
          .hours(timeStart.slice(0, 2))
          .minute(timeStart.slice(3, 5)),
        start: timeStart.slice(0, 5),
        end: timeEnd.slice(0, 5),
        day: days[day],
      })
    )
    .sort((a, b) => a.date - b.date)
    .reduce(
      (week, item) => ({
        ...week,
        [item.day]: [...(week[item.day] || []), item],
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
    renderItem={({ item: { id, subject, start, end, teacher, room } }) => (
      <ListItem
        key={id}
        style={styles.item}
        title={`${subject}`}
        description={`${start} - ${end} ${room ? `(${room})` : ''} ${teacher}`}
      />
    )}
  />
)

export const Week = () => {
  const data = convert(lessonInfo)
  const [selectedIndex, setSelectedIndex] = React.useState()
  return (
    <View style={styles.view}>
      <TabBar
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        {Object.entries(data).map(([dayName, day]) => (
          <Tab title={dayName} />
        ))}
      </TabBar>

      {selectedIndex >= 0 ? (
        <ViewPager
          selectedIndex={selectedIndex}
          style={styles.pager}
          onSelect={(index) => setSelectedIndex(index)}
        >
          {Object.entries(data).map(([dayName, day]) => (
            <View style={styles.tab} key={dayName}>
              <View style={styles.summary}>
                <Text category="c1" style={{ paddingBottom: 2}}>Börjar</Text>
                <Text category="h4">{day[0].start}</Text>
                <Text category="c1">Slutar</Text>
                <Text category="h4">{day[day.length - 1].end}</Text>
                <Text category="c2">
                  {day.some((lesson) => lesson.subjectCode === 'IDH')
                    ? '🤼‍♀️ Gymnastik'
                    : ''}
                </Text>
              </View>
              <LessonList
                style={styles.part}
                header="FM"
                lessons={day
                  .filter(({ start }) => start <= '12:00')
                  .sort((a, b) => a.date - b.date)}
              />
              <LessonList
                style={styles.part}
                header="EM"
                lessons={day
                  .filter(({ start }) => start >= '12:00')
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
    padding:0,
  },
  item: {
    height: 45,
    backgroundColor: 'white',
    paddingHorizontal: 0,
    borderRadius: 2,
    margin: 2,
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
  }
})
