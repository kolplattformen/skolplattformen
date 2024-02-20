import moment from 'moment'
import { getMeaningfulStartingDate } from '../calendarHelpers'

const tuesdayMorning = moment('2021-11-30T08:20:00+0100')
const tuesdayEvening = moment('2021-11-30T19:20:26+0100')
const wednesdayEvening = moment('2021-12-01T19:20:26+0100')
const fridayEvening = moment('2021-12-03T19:20:26+0100')
const saturdayEvening = moment('2021-12-04T19:20:26+0100')
const sundayEvening = moment('2021-12-05T19:20:26+0100')
const mondayEvening = moment('2021-12-06T19:20:26+0100')

describe('getMeaningfulStartingDate should not touch inputdate', () => {
  const origDate = moment()
  const origDateClone = origDate.clone()
  getMeaningfulStartingDate(origDate)

  expect(origDate).toEqual(origDateClone)
})

describe('getMeaningfulStartingDate on weekends', () => {
  it('should give next monday if on friday evening', () => {
    const startDate = getMeaningfulStartingDate(fridayEvening)
    expect(startDate.toISOString()).toEqual(mondayEvening.toISOString())
  })

  it('should give next monday if on saturday', () => {
    const startDate = getMeaningfulStartingDate(saturdayEvening)
    expect(startDate.toISOString()).toEqual(mondayEvening.toISOString())
  })

  it('should give next monday if on sunday', () => {
    const startDate = getMeaningfulStartingDate(sundayEvening)
    expect(startDate.toISOString()).toEqual(mondayEvening.toISOString())
  })
})

describe('getMeaningfulStartingDate on weekdays', () => {
  it('should give next day if on tuesday evening', () => {
    const startDate = getMeaningfulStartingDate(tuesdayEvening)
    expect(startDate.toISOString()).toEqual(wednesdayEvening.toISOString())
  })

  it('should give same day if on tuesday morning', () => {
    const startDate = getMeaningfulStartingDate(tuesdayMorning)
    expect(startDate.toISOString()).toEqual(tuesdayMorning.toISOString())
  })
})
