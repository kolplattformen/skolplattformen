import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Api,
  CalendarItem,
  Child,
  Classmate,
  MenuItem,
  NewsItem,
  Notification,
  ScheduleItem,
  User,
} from '@skolplattformen/embedded-api'
import {
  ApiCall,
  EntityHookResult,
  EntityMap,
  EntityName,
  EntityStoreRootState,
  ExtraActionProps,
} from './types'
import { useApi } from './context'
import { loadAction } from './actions'
import store from './store'

interface StoreSelector<T> {
  (state: EntityStoreRootState): EntityMap<T>
}

const hook = <T>(
  entityName: EntityName,
  key: string,
  defaultValue: T,
  selector: StoreSelector<T>,
  apiCaller: (api: Api) => ApiCall<T>,
): EntityHookResult<T> => {
  const {
    api, isLoggedIn, reporter, storage,
  } = useApi()

  const getState = (): EntityStoreRootState => store.getState() as unknown as EntityStoreRootState
  const select = (storeState: EntityStoreRootState) => {
    const stateMap = selector(storeState) || {}
    const state = stateMap[key] || { status: 'pending', data: defaultValue }
    return state
  }
  const initialState = select(getState())
  const [state, setState] = useState(initialState)
  const dispatch = useDispatch()

  const load = (force = false) => {
    if (isLoggedIn && state.status !== 'loading' && ((force && !api.isFake) || state.status === 'pending')) {
      const extra: ExtraActionProps<T> = {
        key,
        defaultValue,
        apiCall: apiCaller(api),
        retries: 0,
      }

      // Only use cache when not in fake mode
      if (!api.isFake) {
        const pnr = api.getPersonalNumber()

        // Only get from cache first time
        if (state.status === 'pending') {
          extra.getFromCache = () => storage.getItem(`${pnr}_${key}`)
        }
        extra.saveToCache = (value: string) => storage.setItem(`${pnr}_${key}`, value)
      }
      const action = loadAction<T>(entityName, extra)
      dispatch(action)
    }
  }
  useEffect(() => { load() }, [isLoggedIn])

  const listener = () => {
    const newState = select(getState())
    if (newState.status !== state.status
      || newState.data !== state.data
      || newState.error !== state.error) {
      setState(newState)

      if (newState.error) {
        const description = `Error getting ${entityName} from API`
        reporter.error(newState.error, description)
      }
    }
  }
  useEffect(() => store.subscribe(listener), [])

  return {
    ...state,
    reload: () => load(true),
  }
}

export const useChildList = () => hook<Child[]>(
  'CHILDREN',
  'children',
  [],
  (s) => s.children,
  (api) => () => api.getChildren(),
)

export const useCalendar = (child: Child) => hook<CalendarItem[]>(
  'CALENDAR',
  `calendar_${child.id}`,
  [],
  (s) => s.calendar,
  (api) => () => api.getCalendar(child),
)

export const useClassmates = (child: Child) => hook<Classmate[]>(
  'CLASSMATES',
  `classmates_${child.id}`,
  [],
  (s) => s.classmates,
  (api) => () => api.getClassmates(child),
)

export const useMenu = (child: Child) => hook<MenuItem[]>(
  'MENU',
  `menu_${child.id}`,
  [],
  (s) => s.menu,
  (api) => () => api.getMenu(child),
)

export const useNews = (child: Child) => hook<NewsItem[]>(
  'NEWS',
  `news_${child.id}`,
  [],
  (s) => s.news,
  (api) => () => api.getNews(child),
)

export const useNewsDetails = (child: Child, news: NewsItem) => hook<NewsItem>(
  'NEWS_DETAILS',
  `news_details_${news.id}`,
  news,
  (s) => s.newsDetails,
  (api) => () => api.getNewsDetails(child, news),
)

export const useNotifications = (child: Child) => hook<Notification[]>(
  'NOTIFICATIONS',
  `notifications_${child.id}`,
  [],
  (s) => s.notifications,
  (api) => () => api.getNotifications(child),
)

export const useSchedule = (child: Child, from: string, to: string) => hook<ScheduleItem[]>(
  'SCHEDULE',
  `schedule_${child.id}_${from}_${to}`,
  [],
  (s) => s.schedule,
  (api) => () => api.getSchedule(child, from, to),
)

export const useUser = () => hook<User>(
  'USER',
  'user',
  {},
  (s) => s.user,
  (api) => () => api.getUser(),
)
