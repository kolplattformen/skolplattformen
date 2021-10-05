import { EtjanstResponse } from '../'
import { teachers } from '../teachers'

let response: EtjanstResponse

beforeEach(() => {
  response = {
    "Success": true,
    "Error": null,
    "Data": [
      {
        "ID": 156735,
        "BATCH": "GR",
        "SIS_ID": "F154239A-EA4A-4C6C-A112-0B9581132E3D",
        "USERNAME": "anna.andersson",
        "SCHOOL_SIS_ID": "DE2E1293-0F40-4B91-9D91-1E99355DC257",
        "EMAILADDRESS": null,
        "STATUS": " GR",
        "ERRORCODE": 0,
        "FIRSTNAME": "Anna",
        "LASTNAME": "Andersson",
        "ACTIVE": true,
        "TELWORK": "08 508 0000000"
      },
      {
        "ID": 156690,
        "BATCH": "GR",
        "SIS_ID": "9EC59FCA-80AD-4774-AABD-427040207E33",
        "USERNAME": "gunnar.grymm",
        "SCHOOL_SIS_ID": "DE2E1293-0F40-4B91-9D91-1E99355DC257",
        "EMAILADDRESS": "gunnar.grymm@edu.stockholm.se",
        "STATUS": " F",
        "ERRORCODE": 0,
        "FIRSTNAME": "Gunnar",
        "LASTNAME": "Grymm",
        "ACTIVE": true,
        "TELWORK": null
      }
    ]
  }   
})

it('parses teachers correctly', () => {
  expect(teachers(response)).toEqual([
    {
        id: 156735,
        sisId: 'F154239A-EA4A-4C6C-A112-0B9581132E3D',
        firstname: 'Anna',
        lastname: 'Andersson',
        email: null,
        phoneWork: '08 508 0000000',
        active: true,
        status: ' GR',
        timeTableAbbreviation: 'AAN'
      },
      {
        id: 156690,
        sisId: '9EC59FCA-80AD-4774-AABD-427040207E33',
        firstname: 'Gunnar',
        lastname: 'Grymm',
        email: 'gunnar.grymm@edu.stockholm.se',
        phoneWork: null,
        active: true,
        status: ' F',
        timeTableAbbreviation: 'GGR'
      },
  ])
})