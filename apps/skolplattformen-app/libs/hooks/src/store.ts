import { createStore, combineReducers, applyMiddleware } from 'redux'
import { apiMiddleware, cacheMiddleware } from './middleware'
import {
  calendar,
  classmates,
  etjanstChildren,
  menu,
  news,
  newsDetails,
  notifications,
  schedule,
  schoolContacts,
  skola24Children,
  teachers,
  timetable,
  user,
} from './reducers'

const appReducer = combineReducers({
  calendar,
  classmates,
  etjanstChildren,
  menu,
  news,
  newsDetails,
  notifications,
  schedule,
  schoolContacts,
  skola24Children,
  teachers,
  timetable,
  user,
})
const rootReducer: typeof appReducer = (state, action) => {
  if (action.type === 'CLEAR') {
    state = undefined
  }
  return appReducer(state, action)
}
const enhancers = applyMiddleware(apiMiddleware, cacheMiddleware)
const store = createStore(rootReducer, enhancers)

export default store
