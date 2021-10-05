import { EtjanstResponse } from '../'
import { schoolContacts } from '../schoolContacts'

let response: EtjanstResponse

beforeEach(() => {
  response = {
    "Success": true,
    "Error": null,
    "Data": [
        {
          "Title": "Expedition",
          "Name": null,
          "Phone": "508 000 00",
          "Email": "",
          "SchoolName": "Påhittade skolan",
          "ClassName": null
        },
        {
          "Title": "Rektor",
          "Name": "Andersson, Anna Bella Cecilia",
          "Phone": "08-508 000 00",
          "Email": "anna.anderssonn@edu.stockholm.se",
          "SchoolName": null,
          "ClassName": null
        }
      ]
  }   
})

it('parses teachers correctly', () => {
  expect(schoolContacts(response)).toEqual([
    {
        title: 'Expedition',
        name: null,
        phone: '508 000 00',
        email: '',
        schoolName: 'Påhittade skolan',
        className: null
      },
      {
        title: 'Rektor',
        name: 'Andersson, Anna Bella Cecilia',
        phone: '08-508 000 00',
        email: 'anna.anderssonn@edu.stockholm.se',
        schoolName: null,
        className: null
      }
  ])
})