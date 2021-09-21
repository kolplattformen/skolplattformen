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
  skola24Children,
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
  skola24Children,
  timetable,
  user,
})
const rootReducer: typeof appReducer = (state, action) => {
  if (action.type === 'CLEAR') {
    // eslint-disable-next-line no-param-reassign
    state = undefined
  }
  return appReducer(state, action)
}
const enhancers = applyMiddleware(apiMiddleware, cacheMiddleware)
const store = createStore(rootReducer, enhancers)

export default store
