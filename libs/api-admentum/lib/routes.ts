const baseUrl = 'https://skola.admentum.se/'
const api = baseUrl + 'api/v1/'

export const apiUrls = {
  assignments: api + 'assignments',
  attendance_summary_users: api + 'attendance/summary/users',
  course_sections: api + 'course_sections',
  courses: api + 'courses',
  forecast_collections: api + 'forecast_collections',
  forecasts: api + 'forecasts',
  grade_permissions: api + 'grade_permissions',
  grades: api + 'grades',
  gymnasium_courses: api + 'gymnasium_courses',
  leisure_group_enrollments: api + 'leisure_group_enrollments',
  leisure_groups: api + 'leisure_groups',
  lesson_infos: api + 'lesson_infos',
  lessons: api + 'lessons',
  messages: 'https://skola.admentum.se/messages/',
  // start at page 1
  conversations: (userId: string, page: string) =>
    `https://messages.admentum.se/api/users/${userId}/conversations?page=${page}`, // unread_only=1
  organisations: api + 'organisations',
  orientations: api + 'orientations',
  overview: (action: string, year: string, week: string) =>
    baseUrl + `overview?action=${action}&week=${week}&year=${year}`,
  permission_groups: api + 'permission_groups',
  primary_group_enrollments: api + 'primary_group_enrollments',
  primary_group_municipality_statistics:
    api + 'primary_groups/municipality_statistic',
  primary_groups: api + 'primary_groups',
  program_courses: api + 'program_courses',
  programs: api + 'programs',
  reviews: api + 'reviews',
  rooms: api + 'rooms',
  schedule_breaks: api + 'schedule_breaks',
  schedule_event_instances: api + 'schedule_event_instances',
  schedule_events: api + 'schedule_events',
  schedule_group_enrollments: api + 'schedule_group_enrollments',
  schedule_group_teacher_enrollments:
    api + 'schedule_group_teacher_enrollments',
  schedule_groups: api + 'schedule_groups',
  schedules: api + 'schedules',
  schedule: (year: string, week: string) =>
    baseUrl + `schedule/schedule?week=${week}&year=${year}`,
  school_enrollments: `${api}school_enrollments`,
  school_years: api + 'school_years',
  schools: api + 'schools',
  sickness: api + 'sickness',
  subjects: api + 'subjects',
  teachers: api + 'teachers',
  menu: (year: string, week: string) =>
    baseUrl + `api/food/week/${week}/${year}`,
  upper_secondary_subjects: api + 'upper_secondary_subjects',
  users: api + 'users?format=json',
  user: (userId: string) => api + `users/${userId}/?format=json`,
  me: baseUrl + 'api/me?format=json',
}

export const bankIdCheckUrl = (sessionId: string) =>
  `https://login.grandid.com/?sessionid=${sessionId}&collect=1`

export const redirectLocomotive = (sessionId: string) =>
  `https://login.grandid.com/?sessionid=${sessionId}`

export const bankIdSessionUrl = (returnUrl: string) =>
  `https://auth.admentum.se/larande${returnUrl ? `?next=${returnUrl}` : ''}`

export const bankIdInitUrl = (sessionId: string) =>
  `https://login.grandid.com/?sessionid=${sessionId}&eleg=1&bankid=1&bChoice=other`

export const bankIdCallbackUrl = (grandSessionId: string) =>
  `https://auth.admentum.se/larande/callback?grandidsession=${grandSessionId}`
