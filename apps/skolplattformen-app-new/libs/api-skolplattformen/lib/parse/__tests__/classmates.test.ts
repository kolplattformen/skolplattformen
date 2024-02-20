import { EtjanstResponse } from '../'
import { classmates } from '../classmates'

let response: EtjanstResponse

beforeEach(() => {
  response = {
    Success: true,
    Error: null,
    Data: [
      {
        ID: 0,
        BATCH: null,
        SIS_ID: '22F0CFC7-09C7-45DC-9388-AE9A9EA1356B',
        USERNAME: null,
        SCHOOL_SIS_ID: null,
        EMAILADDRESS: null,
        STATUS: null,
        ERRORCODE: 0,
        PRIMARY_SCHOOL_SIS_ID: null,
        MENTOR_SIS_ID: null,
        FIRSTNAME: 'Bo',
        LASTNAME: 'Burström',
        ACTIVE: false,
        Guardians: [
          {
            SOCIALNUMBER: null,
            DISPLAYNAME: null,
            FIRSTNAME: 'Allan',
            LASTNAME: 'Fridell',
            ADDRESS: 'Hult södregård',
            CITY: null,
            POCODE: null,
            TELHOME: null,
            TELMOBILE: '0690-6346216',
            EMAILHOME: 'allan.fridell@mailinater.com',
            SECTION_NAME: null,
            SECTION_ID: null,
            TERM_STARTDATE: null,
            TERM_ENDDATE: null,
            GROUPTYPE: null,
            STUDENT_FIRSTNAME: null,
            STUDENT_LASTNAME: null,
            STUDENT_ID: null,
          },
        ],
        ClassName: '7C',
        ClassId: 'B2BF465B-581B-43AC-9CA7-F11BB0ED4646',
      },
    ],
  }
})

it('parses class mates correctly', () => {
  expect(classmates(response)).toEqual([
    {
      sisId: '22F0CFC7-09C7-45DC-9388-AE9A9EA1356B',
      firstname: 'Bo',
      lastname: 'Burström',
      className: '7C',
      guardians: [
        {
          firstname: 'Allan',
          lastname: 'Fridell',
          address: 'Hult södregård',
          mobile: '0690-6346216',
          email: 'allan.fridell@mailinater.com',
        },
      ],
    },
  ])
})
