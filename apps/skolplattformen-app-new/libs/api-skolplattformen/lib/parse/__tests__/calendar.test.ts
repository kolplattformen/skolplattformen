import { EtjanstResponse } from '../'
import { calendar } from '../calendar'

let response: EtjanstResponse

beforeEach(() => {
  response = {
    Success: true,
    Error: null,
    Data: [
      {
        Title: 'Jullov',
        Id: 29,
        Description: 'hello',
        Location: null,
        EventDate: '2020-12-21',
        EventDateTime: '09:00',
        LongEventDateTime: '2020-12-21 09:00',
        EndDate: '2021-01-08',
        EndDateTime: '10:00',
        LongEndDateTime: '2021-01-08 10:00',
        EventDateDayNumber: '21',
        EventDateMonthName: 'dec',
        EventDateMonthFullName: 'december',
        FullDateDescription: '2020-12-21 09:00 - 2021-01-08 10:00',
        IsSameDay: false,
        AllDayEvent: false,
        ListId: null,
        Mentor: null,
      },
      {
        Title: 'Utvecklingsdag, förskolorna är stängda',
        Id: 5,
        Description: null,
        Location: null,
        EventDate: '2021-05-28',
        EventDateTime: '',
        LongEventDateTime: '2021-05-28',
        EndDate: '2021-05-28',
        EndDateTime: '',
        LongEndDateTime: '2021-05-28',
        EventDateDayNumber: '28',
        EventDateMonthName: 'maj',
        EventDateMonthFullName: 'maj',
        FullDateDescription: '2021-05-28 - 2021-05-28',
        IsSameDay: true,
        AllDayEvent: true,
        ListId: null,
        Mentor: null,
      },
    ],
  }
})

it('parses calendar correctly', () => {
  const [firstEvent] = calendar(response)

  expect(firstEvent).toEqual({
    id: 29,
    location: null,
    title: 'Jullov',
    description: 'hello',
    startDate: '2020-12-21T08:00:00.000Z',
    endDate: '2021-01-08T09:00:00.000Z',
    allDay: false,
  })
})

it('parses start and end date without time', () => {
  const [, secondEvent] = calendar(response)

  expect(secondEvent.startDate).toEqual('2021-05-27T22:00:00.000Z')
  expect(secondEvent.endDate).toEqual('2021-05-27T22:00:00.000Z')
})
