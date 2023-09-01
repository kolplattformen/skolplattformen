import { ApiAdmentum } from './api'

describe('api', () => {
  let api: ApiAdmentum

  beforeEach(() => {
    api = new ApiAdmentum()
  })

  test('should request and return calendar items', async () => {
    expect((await api.getCalendar())[0]).toMatchObject({
      allDay: false,
      endDate: '2023-08-07T07:30:00.000Z',
      id: 2990834,
      location: '',
      startDate: '2023-08-07T06:00:00.000Z',
      title: 'Matematik',
    })
  })
})
