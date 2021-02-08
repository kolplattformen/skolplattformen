import {
  CalendarItem,
  Child,
  Classmate,
  MenuItem,
  NewsItem,
  Notification,
  ScheduleItem,
  User,
} from '@skolplattformen/embedded-api'
import { EntityName, EntityReducer, EntityState } from './types'

const createReducer = <T>(entity: EntityName): EntityReducer<T> => {
  const reducer: EntityReducer<T> = (state = {}, action) => {
    if (action.entity !== entity || !action.extra) return state
    const key = action.extra?.key

    const node = state[key] || {
      status: 'pending',
      data: action.extra.defaultValue,
    }
    let newNode: EntityState<T>
    switch (action.type) {
      case 'GET_FROM_API': {
        newNode = {
          ...node,
          error: undefined,
          status: 'loading',
        }
        break
      }
      case 'RESULT_FROM_API': {
        newNode = {
          ...node,
          data: action.data || node.data,
          status: 'loaded',
        }
        break
      }
      case 'API_ERROR': {
        newNode = {
          ...node,
          status: action.extra.retries < 3 ? node.status : 'error',
          error: action.error,
        }
        break
      }
      case 'RESULT_FROM_CACHE': {
        newNode = {
          ...node,
          data: action.data || node.data,
        }
        break
      }
      default: {
        newNode = { ...node }
      }
    }
    return {
      ...state,
      [key]: newNode,
    }
  }
  return reducer
}

export const user = createReducer<User>('USER')
export const children = createReducer<Child[]>('CHILDREN')
export const calendar = createReducer<CalendarItem[]>('CALENDAR')
export const classmates = createReducer<Classmate[]>('CLASSMATES')
export const menu = createReducer<MenuItem[]>('MENU')
export const news = createReducer<NewsItem[]>('NEWS')
export const notifications = createReducer<Notification[]>('NOTIFICATIONS')
export const schedule = createReducer<ScheduleItem[]>('SCHEDULE')
