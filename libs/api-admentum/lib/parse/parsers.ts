import * as html from 'node-html-parser'
import { decode } from 'he'
import { CalendarItem, TimetableEntry } from 'libs/api/lib/types'
import { DateTime, FixedOffsetZone } from 'luxon'

// TODO: Move this into the parse folder and convert it to follow the pattern of other parsers (include tests).

export const extractInputField = (sought: string, attrs: string[]) => {
  // there must be a better way to do this...
  const s = attrs.find(e => e.indexOf(sought) >= 0) || ""
  const v = s.substring(s.indexOf('value="') + 'value="'.length)
  return v.substring(0, v.length - 2)
}

export function extractMvghostRequestBody(initBankIdResponseText: string) {
  const doc = html.parse(decode(initBankIdResponseText))
  const inputAttrs = doc.querySelectorAll('input').map(i => (i as any).rawAttrs)
  const relayState = extractInputField('RelayState', inputAttrs)
  const samlRequest = extractInputField("SAMLRequest", inputAttrs)
  const mvghostRequestBody = `RelayState=${encodeURIComponent(relayState)}&SAMLRequest=${encodeURIComponent(samlRequest)}`
  
  return mvghostRequestBody
}

export function extractHjarntorgetSAMLLogin(authGbgLoginResponseText: string) {
  const authGbgLoginDoc = html.parse(decode(authGbgLoginResponseText))
  const inputAttrs = authGbgLoginDoc.querySelectorAll('input').map(i => (i as any).rawAttrs)
  const RelayStateText = extractInputField('RelayState', inputAttrs)
  const SAMLResponseText = extractInputField("SAMLResponse", inputAttrs)

  return `SAMLResponse=${encodeURIComponent(SAMLResponseText || '')}&RelayState=${encodeURIComponent(RelayStateText || '')}`
}

export function extractAuthGbgLoginRequestBody(signatureResponseText: string) {
  const signatureResponseDoc = html.parse(decode(signatureResponseText))
  const signatureResponseTextAreas = signatureResponseDoc.querySelectorAll('textarea')
  const SAMLResponseElem = signatureResponseTextAreas.find(ta => {
    const nameAttr = ta.getAttribute("name")
    return nameAttr === 'SAMLResponse'
  })
  const SAMLResponseText = SAMLResponseElem?.rawText
  const RelayStateElem = signatureResponseTextAreas.find(ta => {
    const nameAttr = ta.getAttribute("name")
    return nameAttr === 'RelayState'
  })
  const RelayStateText = RelayStateElem?.rawText
  const authGbgLoginBody = `SAMLResponse=${encodeURIComponent(SAMLResponseText || '')}&RelayState=${encodeURIComponent(RelayStateText || '')}`
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

enum DayOfWeek {
  'Måndag'= 1,
  'Tisdag'= 2,
  'Onsdag'= 3,
  'Torsdag'= 4,
  'Fredag'= 5,
  'Lördag'= 6,
  'Söndag'= 7,
}

export const parseCalendarItem = (jsonData: any): any => {
  const timetableEntries: TimetableEntry[] = []
  if (jsonData && jsonData.days && Array.isArray(jsonData.days) && jsonData.days.length > 0) {
    jsonData.days.forEach((day: { name: string, lessons: any[] }) => {
      day.lessons.forEach(lesson => {
        const dayOfWeek = DayOfWeek[day.name as keyof typeof DayOfWeek]
        timetableEntries.push({
          id: lesson.id,
          teacher: lesson.bookedTeacherNames && lesson.bookedTeacherNames[0],
          location: lesson.location,
          timeStart: lesson.time.substring(0, 5),
          timeEnd: lesson.time.substring(9),
          dayOfWeek,
          blockName: lesson.title || lesson.subject_name
        } as TimetableEntry)
    });
    })
  } else {
    console.error("Failed to parse calendar item, no days found in json data.")
  }
  return timetableEntries;
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