import { createStore, combineReducers, applyMiddleware } from 'redux'
import { apiMiddleware, cacheMiddleware } from './middleware'
import {
  calendar,
  children,
  classmates,
  menu,
  news,
  newsDetails,
  notifications,
  schedule,
  user,
} from './reducers'

const appReducer = combineReducers({
  calendar,
  children,
  classmates,
  menu,
  news,
  newsDetails,
  notifications,
  schedule,
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
