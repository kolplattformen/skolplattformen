/**
 * Schoolsoft-payloadtyper.
 *
 * Källan är live-inspelade svar från en Schoolsoft-parentsession
 * (skol-slug "procivitas", sms.schoolsoft.se) - se __mocks__/ för rådata.
 */

/**
 * En lektion/kalenderhändelse från
 * GET /rest-api/parent/calendar/lessons/agenda?start_date=..&end_date=..
 * (samma form returneras av .../event/agenda). Svaret är en BAR array.
 */
export interface SsLessonEvent {
  eventId: number
  name: string
  description: string
  /** Lokal tid utan zon, t.ex. "2026-08-31T11:00" */
  startDate: string
  endDate: string
  allDay: boolean
  eventColor: string
  editable: boolean
  room: string
  teachingGroup: string
  teacher: string
  /** 0 = måndag i veckan */
  dayId: number
  status: number
  category: string
  roomBooking: boolean
}

/** GET /rest-api/parent/calendar/settings */
export interface SsCalendarSettings {
  userType: string
  userId: number
  app: boolean
  mode: string
  categories: string[]
  showWeekends: boolean
  agendaRange: string
}

export interface SsNewsListItem {
  id: string
  title: string
  excerpt: string
  dateText?: string
  category?: string
}

export interface SsNewsDetail {
  bodyText: string
  author?: string
  publishedText?: string
}

export interface SsMessage {
  id: string
  subject: string
  preview: string
  from: string
  dateText: string
  bodyHtml: string
  teacherId?: string
}

export interface SsStaffOption {
  id: number
  /** Schoolsoft-format: "Efternamn Förnamn" */
  fullName: string
}

export interface SsAbsenceDayState {
  /** 0 = måndag (kolumnordning på frånvaroblanketten) */
  dayIndex: number
  /** Kolumnrubrik, t.ex. "Ons 2 sep" */
  label: string
  reported: boolean
  disabled: boolean
}

export interface SsAbsenceWeek {
  days: SsAbsenceDayState[]
  /** "Rebecka Lundvall (P)" - vem som anmält, om anmälan finns */
  reportedBy?: string
}

export interface SsChildIdentity {
  name: string
  school: string
  className: string
}

/**
 * En rad ur /rest-api/parent/holistic_assessment (eller motsvarande) -
 * ännu inte mappad mot något Api-gränssnitt, men dokumenterad via fixture.
 */
export interface SsHolisticRow {
  title: string
  subTitle: string
  color: string
  subjectWarning: boolean
  updatedAt: string
  friendlyUpdatedAt: string
  publishedAt: string
  friendlyPublishedAt: string
  holisticAssessmentId: number
  published: boolean
  read: boolean
}

export interface SsHolisticResponse {
  overview: {
    isActionPlan: boolean
    actionPlanTitle: string
    actionPlanText: string
  }
  rows: SsHolisticRow[]
}
