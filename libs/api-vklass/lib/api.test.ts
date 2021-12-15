import { ApiVklass } from './api'

describe('api', () => {
  let api: ApiVklass

  beforeEach(() => {
    api = new ApiVklass()
  })

  test('should request and return calendar items', async () => {
    expect((await api.getCalendar())[0]).toMatchObject({
        allDay: false,
        endDate: '2021-12-14T09:40:00.000Z',
        id: null,
        location: '',
        startDate: '2021-12-14T08:45:00.000Z',
        title: 'Matematik (4K/2021MA__MA)'
    })
  })
})
