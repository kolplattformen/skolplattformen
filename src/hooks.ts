import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Api,
  CalendarItem,
  Child,
  Classmate,
  EtjanstChild,
  MenuItem,
  NewsItem,
  Notification,
  ScheduleItem,
  Skola24Child,
  TimetableEntry,
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
import { merge } from './childlists'

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

  let mounted: boolean
  useEffect(() => {
    mounted = true
    return () => { mounted = false }
  }, [])

  const listener = () => {
    if (!mounted) return

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

export const useEtjanstChildren = () => hook<EtjanstChild[]>(
  'ETJANST_CHILDREN',
  'etjanst_children',
  [],
  (s) => s.etjanstChildren,
  (api) => () => api.getChildren(),
)

export const useSkola24Children = () => hook<Skola24Child[]>(
  'SKOLA24_CHILDREN',
  'skola24_children',
  [],
  (s) => s.skola24Children,
  (api) => () => api.getSkola24Children(),
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

export const useTimetable = (child: Skola24Child, week: number, year: number) => hook<TimetableEntry[]>(
  'TIMETABLE',
  `timetable_${child.personGuid}_${week}_${year}`,
  [],
  (s) => s.timetable,
  (api) => () => api.getTimetable(child, week, year),
)

export const useUser = () => hook<User>(
  'USER',
  'user',
  {},
  (s) => s.user,
  (api) => () => api.getUser(),
)

export const useChildList = (): EntityHookResult<Child[]> => {
  const {
    data: etjanstData, status, error, reload: etjanstReload,
  } = useEtjanstChildren()
  const { data: skola24Data, reload: skola24Reload } = useSkola24Children()

  const [data, setData] = useState<Child[]>([])
  const reload = () => {
    etjanstReload()
    skola24Reload()
  }

  useEffect(() => {
    if (!etjanstData.length) return
    setData(merge(etjanstData, skola24Data))
  }, [etjanstData, skola24Data])

  return {
    data, status, error, reload,
  }
}
