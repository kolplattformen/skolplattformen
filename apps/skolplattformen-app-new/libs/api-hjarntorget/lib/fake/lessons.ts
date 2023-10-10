import {toNamespacedPath} from 'path';

// TODO: fix the startDate/endDate of all lessons
export const lessons_133700_goteborgsstad = () => {
  const baseTime = 1636357800000;
  const baseDate = new Date(baseTime);
  const today = new Date();
  const currentHour = today.getHours();
  today.setHours(baseDate.getHours());
  today.setMinutes(baseDate.getMinutes());
  today.setSeconds(0);

  let offset = Math.abs(baseTime - today.getTime());
  const weekDay = today.getDay();

  if (weekDay == 6 || (weekDay == 5 && currentHour >= 18))
    offset = offset + 2 * 86400000;
  if (weekDay == 0) offset = offset + 86400000;
  if (weekDay > 0 && weekDay < 6 && currentHour >= 18)
    offset = offset + 86400000;

  return {
    url: 'https://hjarntorget.goteborg.se/api/schema/lessons?forUser=133700_goteborgsstad&startDateIso=2021-11-01&endDateIso=2021-11-08',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
      cookie: 'REMOVED',
    },
    status: 200,
    statusText: '200',
    json: () =>
      Promise.resolve([
        {
          id: '36080472:1',
          title: 'HKK',
          location: 'A402',
          calendars: ['138JÄTS 21/22 8B/HKK'],
          startDate: {
            ts: offset + 1636357800000,
            timezoneOffsetMinutes: 60,
          },
          endDate: {
            ts: offset + 1636360500000,
            timezoneOffsetMinutes: 60,
          },
          ownPlannings: null,
          teacherPlannings: null,
          teacherAndStudentPlannings: null,
          ownGeneralPlannings: null,
          teacherGeneralPlannings: null,
          teacherAndStudentGeneralPlannings: null,
          bookedResourceNames: [],
          bookedTeacherNames: ['Noel Nyström (NNM)'],
          hasTest: false,
          hasHomework: false,
          hasAssignment: false,
          url: null,
          note: '',
        },
        {
          id: '36080497:1',
          title: 'BL',
          location: 'B260',
          calendars: ['138JÄTS 21/22 8B/BL'],
          startDate: {
            ts: offset + 1636361700000,
            timezoneOffsetMinutes: 60,
          },
          endDate: {
            ts: offset + 1636365000000,
            timezoneOffsetMinutes: 60,
          },
          ownPlannings: null,
          teacherPlannings: null,
          teacherAndStudentPlannings: null,
          ownGeneralPlannings: null,
          teacherGeneralPlannings: null,
          teacherAndStudentGeneralPlannings: null,
          bookedResourceNames: [],
          bookedTeacherNames: ['Joseph Ekström (JHE)'],
          hasTest: false,
          hasHomework: false,
          hasAssignment: false,
          url: null,
          note: '',
        },
        {
          id: '37164864:1',
          title: 'IDH',
          location: 'IDH Ute',
          calendars: ['138JÄTS 21/22 8B/IDH'],
          startDate: {
            ts: offset + 1636365600000,
            timezoneOffsetMinutes: 60,
          },
          endDate: {
            ts: offset + 1636369800000,
            timezoneOffsetMinutes: 60,
          },
          ownPlannings: null,
          teacherPlannings: null,
          teacherAndStudentPlannings: null,
          ownGeneralPlannings: null,
          teacherGeneralPlannings: null,
          teacherAndStudentGeneralPlannings: null,
          bookedResourceNames: [],
          bookedTeacherNames: ['Katja Fransson (KAF)'],
          hasTest: false,
          hasHomework: false,
          hasAssignment: false,
          url: null,
          note: '',
        },
        {
          id: '36080557:1',
          title: 'LUNCH',
          location: '-',
          calendars: ['138JÄTS 21/22 8B'],
          startDate: {
            ts: offset + 1636370700000,
            timezoneOffsetMinutes: 60,
          },
          endDate: {
            ts: offset + 1636372800000,
            timezoneOffsetMinutes: 60,
          },
          ownPlannings: null,
          teacherPlannings: null,
          teacherAndStudentPlannings: null,
          ownGeneralPlannings: null,
          teacherGeneralPlannings: null,
          teacherAndStudentGeneralPlannings: null,
          bookedResourceNames: [],
          bookedTeacherNames: [],
          hasTest: false,
          hasHomework: false,
          hasAssignment: false,
          url: null,
          note: '',
        },
        {
          id: '36080576:1',
          title: 'EN',
          location: 'A402',
          calendars: ['138JÄTS 21/22 8B/EN'],
          startDate: {
            ts: offset + 1636372800000,
            timezoneOffsetMinutes: 60,
          },
          endDate: {
            ts: offset + 1636376400000,
            timezoneOffsetMinutes: 60,
          },
          ownPlannings: null,
          teacherPlannings: null,
          teacherAndStudentPlannings: null,
          ownGeneralPlannings: null,
          teacherGeneralPlannings: null,
          teacherAndStudentGeneralPlannings: null,
          bookedResourceNames: [],
          bookedTeacherNames: ['Henrietta Fransson (HAF)'],
          hasTest: false,
          hasHomework: false,
          hasAssignment: false,
          url: null,
          note: '',
        },
        {
          id: '36080591:1',
          title: 'MA',
          location: 'A402',
          calendars: ['138JÄTS 21/22 8B/MA'],
          startDate: {
            ts: offset + 1636377000000,
            timezoneOffsetMinutes: 60,
          },
          endDate: {
            ts: offset + 1636380600000,
            timezoneOffsetMinutes: 60,
          },
          ownPlannings: null,
          teacherPlannings: null,
          teacherAndStudentPlannings: null,
          ownGeneralPlannings: null,
          teacherGeneralPlannings: null,
          teacherAndStudentGeneralPlannings: null,
          bookedResourceNames: [],
          bookedTeacherNames: ['Amin Månsson (ANM)'],
          hasTest: false,
          hasHomework: false,
          hasAssignment: false,
          url: null,
          note: '',
        },
      ]),
  } as any as Response;
};

export const lessons_123456_goteborgsstad = () => {
  const baseTime = 1636357800000;
  const baseDate = new Date(baseTime);
  const today = new Date();
  const currentHour = today.getHours();
  today.setHours(baseDate.getHours());
  today.setMinutes(baseDate.getMinutes());
  today.setSeconds(0);

  let offset = Math.abs(baseTime - today.getTime());
  const weekDay = today.getDay();

  if (weekDay == 6 || (weekDay == 5 && currentHour >= 18))
    offset = offset + 2 * 86400000;
  if (weekDay == 0) offset = offset + 86400000;
  if (weekDay > 0 && weekDay < 6 && currentHour >= 18)
    offset = offset + 86400000;

  return {
    url: 'https://hjarntorget.goteborg.se/api/schema/lessons?forUser=123456_goteborgsstad&startDateIso=2021-11-01&endDateIso=2021-11-08',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
      cookie: 'REMOVED',
    },
    status: 200,
    statusText: '200',
    json: () => [
      {
        id: '36080454:1',
        title: 'EV',
        location: 'P18',
        calendars: ['138JÄTS 21/22 5A'],
        startDate: {
          ts: offset + 1636355400000,
          timezoneOffsetMinutes: 60,
        },
        endDate: {
          ts: offset + 1636357500000,
          timezoneOffsetMinutes: 60,
        },
        ownPlannings: null,
        teacherPlannings: null,
        teacherAndStudentPlannings: null,
        ownGeneralPlannings: null,
        teacherGeneralPlannings: null,
        teacherAndStudentGeneralPlannings: null,
        bookedResourceNames: [],
        bookedTeacherNames: ['Petra Modin (PMO)', 'Joakim Ness (JNE)'],
        hasTest: false,
        hasHomework: false,
        hasAssignment: false,
        url: null,
        note: '',
      },
      {
        id: '36080467:1',
        title: 'MENT',
        location: 'P18',
        calendars: ['138JÄTS 21/22 5A'],
        startDate: {
          ts: offset + 1636357500000,
          timezoneOffsetMinutes: 60,
        },
        endDate: {
          ts: offset + 1636358100000,
          timezoneOffsetMinutes: 60,
        },
        ownPlannings: null,
        teacherPlannings: null,
        teacherAndStudentPlannings: null,
        ownGeneralPlannings: null,
        teacherGeneralPlannings: null,
        teacherAndStudentGeneralPlannings: null,
        bookedResourceNames: [],
        bookedTeacherNames: ['Petra Modin (PMO)', 'Joakim Ness (JNE)'],
        hasTest: false,
        hasHomework: false,
        hasAssignment: false,
        url: null,
        note: '',
      },
      {
        id: '36080474:1',
        title: 'EN',
        location: 'P18',
        calendars: ['138JÄTS 21/22 5A'],
        startDate: {
          ts: offset + 1636358400000,
          timezoneOffsetMinutes: 60,
        },
        endDate: {
          ts: offset + 1636362000000,
          timezoneOffsetMinutes: 60,
        },
        ownPlannings: null,
        teacherPlannings: null,
        teacherAndStudentPlannings: null,
        ownGeneralPlannings: null,
        teacherGeneralPlannings: null,
        teacherAndStudentGeneralPlannings: null,
        bookedResourceNames: [],
        bookedTeacherNames: ['Petra Modin (PMO)'],
        hasTest: false,
        hasHomework: false,
        hasAssignment: false,
        url: null,
        note: '',
      },
      {
        id: '36080502:1',
        title: 'SV',
        location: 'P18',
        calendars: ['138JÄTS 21/22 5A'],
        startDate: {
          ts: offset + 1636362900000,
          timezoneOffsetMinutes: 60,
        },
        endDate: {
          ts: offset + 1636366500000,
          timezoneOffsetMinutes: 60,
        },
        ownPlannings: null,
        teacherPlannings: null,
        teacherAndStudentPlannings: null,
        ownGeneralPlannings: null,
        teacherGeneralPlannings: null,
        teacherAndStudentGeneralPlannings: null,
        bookedResourceNames: [],
        bookedTeacherNames: ['Joakim Ness (JNE)'],
        hasTest: false,
        hasHomework: false,
        hasAssignment: false,
        url: null,
        note: '',
      },
      {
        id: '36080529:1',
        title: 'LUNCH',
        location: '-',
        calendars: ['138JÄTS 21/22 5A'],
        startDate: {
          ts: offset + 1636366500000,
          timezoneOffsetMinutes: 60,
        },
        endDate: {
          ts: offset + 1636368300000,
          timezoneOffsetMinutes: 60,
        },
        ownPlannings: null,
        teacherPlannings: null,
        teacherAndStudentPlannings: null,
        ownGeneralPlannings: null,
        teacherGeneralPlannings: null,
        teacherAndStudentGeneralPlannings: null,
        bookedResourceNames: [],
        bookedTeacherNames: [],
        hasTest: false,
        hasHomework: false,
        hasAssignment: false,
        url: null,
        note: '',
      },
      {
        id: '36080545:1',
        title: 'MA',
        location: 'P18',
        calendars: ['138JÄTS 21/22 5A'],
        startDate: {
          ts: offset + 1636369200000,
          timezoneOffsetMinutes: 60,
        },
        endDate: {
          ts: offset + 1636372800000,
          timezoneOffsetMinutes: 60,
        },
        ownPlannings: null,
        teacherPlannings: null,
        teacherAndStudentPlannings: null,
        ownGeneralPlannings: null,
        teacherGeneralPlannings: null,
        teacherAndStudentGeneralPlannings: null,
        bookedResourceNames: [],
        bookedTeacherNames: ['Ali Gupta (AGU)'],
        hasTest: false,
        hasHomework: false,
        hasAssignment: false,
        url: null,
        note: '',
      },
      {
        id: '36080578:1',
        title: 'NO',
        location: 'P18',
        calendars: ['138JÄTS 21/22 5A'],
        startDate: {
          ts: offset + 1636373400000,
          timezoneOffsetMinutes: 60,
        },
        endDate: {
          ts: offset + 1636376400000,
          timezoneOffsetMinutes: 60,
        },
        ownPlannings: null,
        teacherPlannings: null,
        teacherAndStudentPlannings: null,
        ownGeneralPlannings: null,
        teacherGeneralPlannings: null,
        teacherAndStudentGeneralPlannings: null,
        bookedResourceNames: [],
        bookedTeacherNames: ['Ali Gupta (AGU)'],
        hasTest: false,
        hasHomework: false,
        hasAssignment: false,
        url: null,
        note: '',
      },
    ],
  } as any as Response;
};

export const lessons_133737_goteborgsstad = () =>
  ({
    url: 'https://hjarntorget.goteborg.se/api/schema/lessons?forUser=133737_goteborgsstad&startDateIso=2021-11-01&endDateIso=2021-11-08',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
      cookie: 'REMOVED',
    },
    status: 200,
    statusText: '200',
    json: () => Promise.resolve([] as any[]),
  } as any as Response);
