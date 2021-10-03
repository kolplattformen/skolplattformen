import { EtjanstResponse } from '../'
import { notifications } from '../notifications'

let response: EtjanstResponse

beforeEach(() => {
  response = {
    Success: true,
    Error: null,
    Data: [
      {
        Notification: {
          Messageid: 'E2E3A567-307F-4859-91BA-31B1F4522A7B',
          Messagecorrelationid: 'BB54DC8E-BB02-49A5-9806-4A2433031AA7',
          Message:
            '{"messages":{"message":{"messageid":"E2E3A567-307F-4859-91BA-31B1F4522A7B","messagecorrelationid":"BB54DC8E-BB02-49A5-9806-4A2433031AA7","messagetext":"Betygen är publicerade.","messagesubject":"Betyg klara","messagetime":"2020-12-18T15:59:43.195","linkbackurl":"https://elevdokumentation.stockholm.se/loa3/gradesStudent.do","sender":{"name":"Elevdokumentation"},"recipient":{"recipient":"195709227283","role":"Guardian"},"messagetype":{"type":"webnotify"},"system":"Elevdokumentation","participant":"BB7DE89D-D714-4EB2-85CD-36F9991E7C34"}}}',
          Readreceipt: false,
          Recipient: '195709227283',
          Id: 5880387,
          DateCreated: '2020-12-18T15:59:46.34',
          DateModified: '/Date(1608307186340)/',
          Role: 'Guardian',
          Participant: 'BB7DE89D-D714-4EB2-85CD-36F9991E7C34',
        },
        NotificationMessage: {
          Messages: {
            Message: {
              Messageid: 'E2E3A567-307F-4859-91BA-31B1F4522A7B',
              Messagecorrelationid: 'BB54DC8E-BB02-49A5-9806-4A2433031AA7',
              Messagetext: 'Betygen är publicerade.',
              Messagetime: '/Date(1608303583195)/',
              Linkbackurl:
                'https://elevdokumentation.stockholm.se/loa3/gradesStudent.do',
              Category: null,
              Sender: { Name: 'Elevdokumentation' },
              Recipient: {
                RecipientRecipient: '195709227283',
                Role: 'Guardian',
                Schooltype: null,
              },
              Messagetype: { Type: 'webnotify' },
              System: 'Elevdokumentation',
            },
          },
        },
      },
    ],
  }
})

it(' notifications correctly', () => {
  expect(notifications(response)).toEqual([
    {
      id: 'E2E3A567-307F-4859-91BA-31B1F4522A7B',
      message: 'Betygen är publicerade.',
      sender: 'Elevdokumentation',
      url: 'https://elevdokumentation.stockholm.se/loa3/gradesStudent.do',
      dateCreated: '2020-12-18T14:59:46.340Z',
      dateModified: "2020-12-18T15:59:46.340Z",
      category: null,
      type: 'webnotify',
    },
  ])
})
