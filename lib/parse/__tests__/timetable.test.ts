import { timetable, timetableEntry, TimetableResponse } from '../'

let response: TimetableResponse

describe('Timetable', () => {
  beforeEach(() => {
    response = {
      error: null,
      data: {
        textList: [
          {
            x: 11,
            y: 64,
            fColor: '#000000',
            fontsize: 14,
            text: '8:30',
            bold: false,
            italic: false,
            id: 9,
            parentId: 6,
            type: 'ClockAxisBox'
          },
          {
            x: 11,
            y: 125,
            fColor: '#000000',
            fontsize: 14,
            text: '9:00',
            bold: false,
            italic: false,
            id: 12,
            parentId: 6,
            type: 'ClockAxisBox'
          },
        ],
        boxList: [
          {
            x: 0,
            y: 950,
            width: 1226,
            height: 112,
            bColor: '#FFFFFF',
            fColor: '#FFFFFF',
            id: 0,
            parentId: null,
            type: 'Footer',
            lessonGuids: null
          },
          {
            x: 56,
            y: 0,
            width: 223,
            height: 34,
            bColor: '#FFFFFF',
            fColor: '#000000',
            id: 1,
            parentId: null,
            type: 'HeadingDay',
            lessonGuids: null
          },
        ],
        lineList: [
          {
            p1x: 51,
            p1y: 34,
            p2x: 56,
            p2y: 34,
            color: '#000000',
            id: 7,
            parentId: 6,
            type: 'ClockAxisGradiation'
          },
          {
            p1x: 0,
            p1y: 64,
            p2x: 56,
            p2y: 64,
            color: '#000000',
            id: 8,
            parentId: 6,
            type: 'ClockAxisGradiation'
          },
        ],
        lessonInfo: [
          {
            guidId: 'N2FjMDc1NjYtZmM2Yy0wZDQyLTY3M2YtZWI5NGNiZDA3ZGU4',
            texts: [
              'Lunch',
              '',
              'Ö5'
            ],
            timeStart: '11:40:00',
            timeEnd: '12:05:00',
            dayOfWeekNumber: 1,
            blockName: ''
          },
          {
            guidId: 'ZTQ1NWE0N2EtNzAwOS0wZTAzLTQ1ZDYtNTA1NWI4Y2JhNDYw',
            texts: [
              'BL',
              'KUr',
              '221'
            ],
            timeStart: '09:40:00',
            timeEnd: '11:35:00',
            dayOfWeekNumber: 1,
            blockName: 'block'
          },
        ]
      },
      exception: null,
      validation: [],
    }
  })
  describe('timetableEntry', () => {
    it('parses basic timeTableEntry data correctly', () => {
      const entry = timetableEntry(response.data.lessonInfo[1], 2021, 15)

      expect(entry.id).toEqual('ZTQ1NWE0N2EtNzAwOS0wZTAzLTQ1ZDYtNTA1NWI4Y2JhNDYw')
      expect(entry.code).toEqual('BL')
      expect(entry.teacher).toEqual('KUr')
      expect(entry.location).toEqual('221')
      expect(entry.timeStart).toEqual('09:40:00')
      expect(entry.timeEnd).toEqual('11:35:00')
      expect(entry.dayOfWeek).toEqual(1)
      expect(entry.blockName).toEqual('block')
    })
    it('parses dates correctly', () => {
      const entry = timetableEntry(response.data.lessonInfo[1], 2021, 15)

      expect(entry.dateStart).toEqual('2021-04-12T09:40:00.000+02:00')
      expect(entry.dateEnd).toEqual('2021-04-12T11:35:00.000+02:00')
    })
  })
  describe('timetable', () => {
    it('throws error', () => {
      response.error = 'b0rk'
      expect(() => timetable(response, 2021, 15)).toThrow('b0rk')
    })
    it('parses lessonInfo', () => {
      const table = timetable(response, 2021, 15)

      expect(table).toHaveLength(2)
      expect(table[0].id).toEqual('N2FjMDc1NjYtZmM2Yy0wZDQyLTY3M2YtZWI5NGNiZDA3ZGU4')
      expect(table[1].id).toEqual('ZTQ1NWE0N2EtNzAwOS0wZTAzLTQ1ZDYtNTA1NWI4Y2JhNDYw')
    })
  })
})
