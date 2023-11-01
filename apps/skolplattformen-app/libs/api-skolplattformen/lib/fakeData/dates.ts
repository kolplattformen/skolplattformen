import { DateTime } from 'luxon'

export const getDate = () => DateTime.now()
export const oneDayAgo = getDate().minus({ days: 1 })
export const twoDaysAgo = getDate().minus({ days: 2 })
export const fourDaysAgo = getDate().minus({ days: 4 })
export const oneWeekAgo = getDate().minus({ weeks: 1 })

export const oneDayForward = getDate().plus({ days: 1 })
export const twoDaysForward = getDate().plus({ days: 2 })
export const fourDaysForward = getDate().plus({ days: 4 })
export const oneWeekForward = getDate().plus({ weeks: 1 })

export const week = getDate().weekNumber.toString()
