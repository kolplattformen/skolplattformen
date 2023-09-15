const baseUrl = 'https://skola.admentum.se/api/v1/'

export const apiUrls = {
  assignments: baseUrl + 'assignments',
  attendance_summary_users: baseUrl + 'attendance/summary/users',
  course_sections: baseUrl + 'course_sections',
  courses: baseUrl + 'courses',
  forecast_collections: baseUrl + 'forecast_collections',
  forecasts: baseUrl + 'forecasts',
  grade_permissions: baseUrl + 'grade_permissions',
  grades: baseUrl + 'grades',
  gymnasium_courses: baseUrl + 'gymnasium_courses',
  leisure_group_enrollments: baseUrl + 'leisure_group_enrollments',
  leisure_groups: baseUrl + 'leisure_groups',
  lesson_infos: baseUrl + 'lesson_infos',
  lessons: baseUrl + 'lessons',
  organisations: baseUrl + 'organisations',
  orientations: baseUrl + 'orientations',
  permission_groups: baseUrl + 'permission_groups',
  primary_group_enrollments: baseUrl + 'primary_group_enrollments',
  primary_group_municipality_statistics:
    baseUrl + 'primary_groups/municipality_statistic',
  primary_groups: baseUrl + 'primary_groups',
  program_courses: baseUrl + 'program_courses',
  programs: baseUrl + 'programs',
  reviews: baseUrl + 'reviews',
  rooms: baseUrl + 'rooms',
  schedule_breaks: baseUrl + 'schedule_breaks',
  schedule_event_instances: baseUrl + 'schedule_event_instances',
  schedule_events: baseUrl + 'schedule_events',
  schedule_group_enrollments: baseUrl + 'schedule_group_enrollments',
  schedule_group_teacher_enrollments:
    baseUrl + 'schedule_group_teacher_enrollments',
  schedule_groups: baseUrl + 'schedule_groups',
  schedules: baseUrl + 'schedules',
  school_enrollments: baseUrl + 'school_enrollments',
  school_years: baseUrl + 'school_years',
  schools: baseUrl + 'schools',
  sickness: baseUrl + 'sickness',
  subjects: baseUrl + 'subjects',
  teachers: baseUrl + 'teachers',
  upper_secondary_subjects: baseUrl + 'upper_secondary_subjects',
  users: baseUrl + 'users',
}

export const bankIdCheckUrl = (sessionId: string) =>
  `https://login.grandid.com/?sessionid=${sessionId}&collect=1`

export const bankIdSessionUrl = (returnUrl: string) =>
  `https://auth.admentum.se/larande${returnUrl ? `?next=${returnUrl}` : ''}`

export const bankIdInitUrl = (sessionId: string) =>
  `https://login.grandid.com/?sessionid=${sessionId}&eleg=1&bankid=1&bChoice=other`

export const getUserUrl = (userId: string) =>
  `https://skola.admentum.se/api/v1/users/${userId}`