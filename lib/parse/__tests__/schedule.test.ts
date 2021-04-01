import { EtjanstResponse } from '../'
import { schedule } from '../schedule'

let response: EtjanstResponse

beforeEach(() => {
  response = {
    Success: true,
    Error: null,
    Data: [
      {
        Title: 'Canceled: Julavslutning 8C',
        Id: 0,
        Description: 'Nåt kul',
        Location: 'Lakritskolan',
        EventDate: '2020-12-14',
        EventDateTime: '14:10',
        LongEventDateTime: '2020-12-14 14:10',
        EndDate: '2020-12-14',
        EndDateTime: '14:40',
        LongEndDateTime: '2020-12-14 14:40',
        EventDateDayNumber: '14',
        EventDateMonthName: 'dec',
        EventDateMonthFullName: 'december',
        FullDateDescription: '2020-12-14 14:10 - 2020-12-14 14:40',
        IsSameDay: true,
        AllDayEvent: false,
        ListId: null,
        Mentor: null,
      },
    ],
  }
})

it('parses schedule correctly', () => {
  expect(schedule(response)).toEqual([
    {
      title: 'Canceled: Julavslutning 8C',
      description: 'Nåt kul',
      location: 'Lakritskolan',
      startDate: '2020-12-14T13:10:00.000Z',
      endDate: '2020-12-14T13:40:00.000Z',
      oneDayEvent: true,
      allDayEvent: false,
    },
  ])
})
