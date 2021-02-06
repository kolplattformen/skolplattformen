import { createStore, combineReducers, applyMiddleware } from 'redux'
import { apiMiddleware, cacheMiddleware } from './middleware'
import {
  calendar,
  children,
  classmates,
  menu,
  news,
  notifications,
  schedule,
  user,
} from './reducers'
import { EntityAction } from './types'

const appReducer = combineReducers({
  calendar,
  children,
  classmates,
  menu,
  news,
  notifications,
  schedule,
  user,
})
const rootReducer = (state: unknown, action: EntityAction<any>) => {
  if (action.type === 'CLEAR') {
    state = undefined
  }
  return appReducer(state, action)
}
const enhancers = applyMiddleware(apiMiddleware, cacheMiddleware)
const store = createStore(rootReducer, enhancers)

export default store
