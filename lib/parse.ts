import { CalendarItem, Child } from './types'

const camel = require('camelcase-keys')

export interface EtjanstResponse {
  Success: boolean
  Error: string|null
  Data: any|any[]
}

export const etjanst = (response: EtjanstResponse): any|any[] => {
  if (!response.Success) {
    throw new Error(response.Error || '')
  }
  return camel(response.Data, { deep: true })
}

export const child = ({
  id, sdsId, name, status, schoolId,
}: any): Child => ({
  id, sdsId, name, status, schoolId,
})

export const calendarItem = ({
  id, title, description, location, startDate, endDate, allDay,
}: any): CalendarItem => ({
  id, title, description, location, startDate, endDate, allDay,
})
