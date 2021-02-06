/* eslint-disable default-case */
import { Middleware } from 'redux'
import { EntityAction, EntityStoreRootState } from './types'

type IMiddleware = Middleware<{}, EntityStoreRootState>
export const apiMiddleware: IMiddleware = (storeApi) => (next) => (action: EntityAction<any>) => {
  try {
    switch (action.type) {
      case 'GET_FROM_API': {
        // Call api
        const apiCall = action.extra?.apiCall
        if (apiCall) {
          apiCall()
            .then((res: any) => {
              const resultAction: EntityAction<any> = {
                ...action,
                type: 'RESULT_FROM_API',
                data: res,
              }
              storeApi.dispatch(resultAction)

              if (action.extra?.saveToCache && res) {
                const cacheAction: EntityAction<any> = {
                  ...resultAction,
                  type: 'STORE_IN_CACHE',
                }
                storeApi.dispatch(cacheAction)
              }
            })
        }

        // Retrieve from cache
        if (action.extra?.getFromCache) {
          const cacheAction: EntityAction<any> = {
            ...action,
            type: 'GET_FROM_CACHE',
          }
          storeApi.dispatch(cacheAction)
        }
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
  return next(action)
}

export const cacheMiddleware: IMiddleware = (storeApi) => (next) => (action: EntityAction<any>) => {
  try {
    switch (action.type) {
      case 'GET_FROM_CACHE': {
        const getFromCache = action.extra?.getFromCache
        if (getFromCache) {
          getFromCache().then((res: string | null) => {
            if (res) {
              const cacheResultAction: EntityAction<any> = {
                ...action,
                type: 'RESULT_FROM_CACHE',
                data: JSON.parse(res),
              }
              storeApi.dispatch(cacheResultAction)
            }
          })
        }
        break
      }
      case 'STORE_IN_CACHE': {
        const saveToCache = action.extra?.saveToCache
        if (saveToCache && action.data) {
          saveToCache(JSON.stringify(action.data))
        }
        break
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
  return next(action)
}
