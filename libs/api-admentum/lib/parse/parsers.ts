import * as html from 'node-html-parser'
import { decode } from 'he'
import { CalendarItem, NewsItem, TimetableEntry } from 'libs/api/lib/types'
import { DateTime, FixedOffsetZone } from 'luxon'
import { news, teacher } from 'libs/api-skolplattformen/lib/parse'
import { toMarkdown } from '@skolplattformen/api'

// TODO: Move this into the parse folder and convert it to follow the pattern of other parsers (include tests).

export const extractInputField = (sought: string, attrs: string[]) => {
  // there must be a better way to do this...
  const s = attrs.find((e) => e.indexOf(sought) >= 0) || ''
  const v = s.substring(s.indexOf('value="') + 'value="'.length)
  return v.substring(0, v.length - 2)
}

export function extractMvghostRequestBody(initBankIdResponseText: string) {
  const doc = html.parse(decode(initBankIdResponseText))
  const inputAttrs = doc
    .querySelectorAll('input')
    .map((i) => (i as any).rawAttrs)
  const relayState = extractInputField('RelayState', inputAttrs)
  const samlRequest = extractInputField('SAMLRequest', inputAttrs)
  const mvghostRequestBody = `RelayState=${encodeURIComponent(
    relayState
  )}&SAMLRequest=${encodeURIComponent(samlRequest)}`

  return mvghostRequestBody
}

export function extractHjarntorgetSAMLLogin(authGbgLoginResponseText: string) {
  const authGbgLoginDoc = html.parse(decode(authGbgLoginResponseText))
  const inputAttrs = authGbgLoginDoc
    .querySelectorAll('input')
    .map((i) => (i as any).rawAttrs)
  const RelayStateText = extractInputField('RelayState', inputAttrs)
  const SAMLResponseText = extractInputField('SAMLResponse', inputAttrs)

  return `SAMLResponse=${encodeURIComponent(
    SAMLResponseText || ''
  )}&RelayState=${encodeURIComponent(RelayStateText || '')}`
}

export function extractAuthGbgLoginRequestBody(signatureResponseText: string) {
  const signatureResponseDoc = html.parse(decode(signatureResponseText))
  const signatureResponseTextAreas =
    signatureResponseDoc.querySelectorAll('textarea')
  const SAMLResponseElem = signatureResponseTextAreas.find((ta) => {
    const nameAttr = ta.getAttribute('name')
    return nameAttr === 'SAMLResponse'
  })
  const SAMLResponseText = SAMLResponseElem?.rawText
  const RelayStateElem = signatureResponseTextAreas.find((ta) => {
    const nameAttr = ta.getAttribute('name')
    return nameAttr === 'RelayState'
  })
  const RelayStateText = RelayStateElem?.rawText
  const authGbgLoginBody = `SAMLResponse=${encodeURIComponent(
    SAMLResponseText || ''
  )}&RelayState=${encodeURIComponent(RelayStateText || '')}`
  return authGbgLoginBody
}

/*
return myChildrenResponseJson.students.map((student: { id: any; first_name: any; last_name: any }) => ({
      id: student.id,
      sdsId: student.id,
      personGuid: student.id,
      firstName: student.first_name,
      lastName: student.last_name,
      name: `${student.first_name} ${student.last_name}`,
    }) as Skola24Child & EtjanstChild);
*/
/*
export const parseScheduleEvent = (({
  url, id, eid, school_id, schedule_id, name, start_time, end_time, rooms: [room], teachers, schedule_groups, primary_groups, weekly_interval
})): CalendarItem => ({
    id
  title: name
  location?: room?.name
  startDate?: start_time
  endDate?: end_time
  allDay?: start_time === '00:00:00' && end_time === '23:59:00'
})
  */
/* OVERVIEW:
"status": 200,
    "data": {
        "year": 2023,
        "week": 38,
        "assignments": [],
        "breaks": [
            {
                "id": 11031,
                "break_type": 1,
                "break_period": 1,
                "name": "Studiedag",
                "date": "2023-09-21",
                "week": null,
                "start_date": null,
                "end_date": null
            }
        ],
        "schedule_events": [
            {
                "id": 3110610,
                "name": "Utvecklingssamtal",
                "formatted_time": "Heldag",
                "formatted_date": "2023-09-22"
            }
        ]
    }
}
*/
export const parseBreaksData = (jsonData: any): CalendarItem[] => {
  const breakItems: CalendarItem[] = []
  if (jsonData) {
    jsonData.forEach(
      (event: {
        id: any
        name: any
        date: any
        start_date: any
        end_date: any
      }) => {
        breakItems.push({
          id: event.id,
          title: event.name,
          startDate: event.start_date || event.date,
          endDate: event.end_date || event.date,
        } as CalendarItem)
      }
    )
  } else {
    console.error('Failed to parse breaks, no breaks found in json data.')
  }
  return breakItems
}

export const parseScheduleEventData = (jsonData: any): CalendarItem[] => {
  const calendarItems: CalendarItem[] = []
  if (jsonData) {
    jsonData.forEach(
      (event: {
        id: any
        name: any
        formatted_date: any
        formatted_time: any
      }) => {
        calendarItems.push({
          id: event.id,
          title: event.name,
          startDate: event.formatted_date,
          endDate: event.formatted_date,
          allDay: event.formatted_time === 'Heldag',
        } as CalendarItem)
      }
    )
  } else {
    console.error(
      'Failed to parse schedule events, no schedule events found in json data.'
    )
  }
  return calendarItems
}

/*
"conversations": [
        {
            "id": "14b643b9-fd09-4b4a-9313-b1e75a94a0a8",
            "latest_message": {
                "id": "72bb3c4b-efb9-4056-822b-9fbd93c7905c",
                "content": "text",
                "message_type": 1,
                "meta_id": "",
                "created_at": "2023-10-06 10:57:54.795854+00:00",
                "formatted_created_at": "Idag, 10:57"
            },
            "recipients": [],
            "title": "Veckobrev v 40",
            "json_recipients": {
                "names": {
                    "primary_groups": {
                        "36886": "6 A",
                        "36887": "6 B"
                    }
                },
                "parents": {
                    "primary_groups": [
                        36886,
                        36887
                    ]
                },
                "is_information": true
            },
            "is_unread": false,
            "creator": {
                "id": 437302,
                "first_name": "Christian",
                "last_name": "Landgren"
            },
            "flag": 0
        },
*/
export const parseNewsData = (jsonData: any): NewsItem[] => {
  const newsItems: NewsItem[] = []
  if (
    jsonData &&
    jsonData.conversations &&
    Array.isArray(jsonData.conversations) &&
    jsonData.conversations.length > 0
  ) {
    jsonData.conversations.forEach((item: any) => {
      const bodyText = toMarkdown(item.latest_message?.content)
      newsItems.push({
        id: item.id,
        author: item.creator?.first_name + ' ' + item.creator?.last_name,
        header: item.title,
        body: bodyText,
        published: item.latest_message?.created_at.split(' ')[0],
      } as NewsItem)
    })
  } else {
    console.error('Failed to parse news, no news found in json data.')
  }
  return newsItems
}

enum DayOfWeek {
  'Måndag' = 1,
  'Tisdag' = 2,
  'Onsdag' = 3,
  'Torsdag' = 4,
  'Fredag' = 5,
  'Lördag' = 6,
  'Söndag' = 7,
}

export const parseTimetableData = (jsonData: any): any => {
  const timetableEntries: TimetableEntry[] = []
  if (
    jsonData &&
    jsonData.days &&
    Array.isArray(jsonData.days) &&
    jsonData.days.length > 0
  ) {
    jsonData.days.forEach((day: { name: string; lessons: any[] }) => {
      day.lessons.forEach((lesson) => {
        const dayOfWeek = DayOfWeek[day.name as keyof typeof DayOfWeek]
        timetableEntries.push({
          id: lesson.id,
          teacher: lesson.teachers,
          location: lesson.room || lesson.title || lesson.subject_name,
          timeStart: lesson.time.substring(0, 5),
          timeEnd: lesson.time.substring(9),
          dayOfWeek,
          blockName: lesson.title || lesson.subject_name,
        } as TimetableEntry)
      })
    })
  } else {
    console.error('Failed to parse timetable, no days found in json data.')
  }
  return timetableEntries
}

/*
{
    "week_number": 40,
    "days": [
        {
            "date": "2023-10-02",
            "formated_date": "2 okt",
            "name": "Måndag",
            "lessons": [
                {
                    "title": "BI",
                    "tooltip_title": "Biologi",
                    "subject_name": "Biologi",
                    "subject_code": "BI",
                    "teachers": "FCa",
                    "intervals": 3.0,
                    "overlaps": 1,
                    "start_pos": 4.0,
                    "color": "#e97f23",
                    "time": "10:00 - 11:30",
                    "room": "",
                    "groups": "6 A BI",
                    "tooltip": "10:00 - 11:30<br>6 A BI",
                    "lesson_id": 14998270,
                    "lesson_info": "",
                    "lesson_groups": "6 A BI",
                    "body": "BI",
                    "information": null
                }
            ],
            "breaks": [],
            "events": []
        },
        {
            "date": "2023-10-03",
            "formated_date": "3 okt",
            "name": "Tisdag",
            "lessons": [],
            "breaks": [],
            "events": []
        },
        {
            "date": "2023-10-04",
            "formated_date": "4 okt",
            "name": "Onsdag",
            "lessons": [],
            "breaks": [],
            "events": []
        },
        {
            "date": "2023-10-05",
            "formated_date": "5 okt",
            "name": "Torsdag",
            "lessons": [],
            "breaks": [],
            "events": []
        },
        {
            "date": "2023-10-06",
            "formated_date": "6 okt",
            "name": "Fredag",
            "lessons": [],
            "breaks": [],
            "events": []
        }
    ],
    "query": "week=40&user_id=437235",
    "time_range": [
        "8:00",
        "8:30",
        "9:00",
        "9:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00"
    ],
    "section_count": 18,
    "breaks": [],
    "schedule_event_instances": [],
    "schedule": {
        "id": 4385,
        "start_week": 31,
        "start_year": 2023,
        "end_week": 22,
        "end_year": 2024
    },
    "next_week": 41,
    "prev_week": 39,
    "weeks_amount": 52,
    "break_week": 27
}
*/
