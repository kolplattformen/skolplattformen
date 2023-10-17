import { Middleware } from 'redux'
import { EntityAction, EntityStoreRootState, ExtraActionProps } from './types'

type IMiddleware = Middleware<Record<string, unknown>, EntityStoreRootState>
export const apiMiddleware: IMiddleware =
  (storeApi) => (next) => (action: EntityAction<any>) => {
    try {
      switch (action.type) {
        case 'GET_FROM_API': {
          // Retrieve from cache
          if (action.extra?.getFromCache) {
            const cacheAction: EntityAction<any> = {
              ...action,
              type: 'GET_FROM_CACHE',
            }
            storeApi.dispatch(cacheAction)
          }

          // Call api
          const apiCall = action.extra?.apiCall
          if (apiCall) {
            const extra = action.extra as ExtraActionProps<any>
            apiCall()
              .then((res: any) => {
                const resultAction: EntityAction<any> = {
                  ...action,
                  type: 'RESULT_FROM_API',
                  data: res,
                }
                storeApi.dispatch(resultAction)

                if (extra.saveToCache && res) {
                  const cacheAction: EntityAction<any> = {
                    ...resultAction,
                    type: 'STORE_IN_CACHE',
                  }
                  storeApi.dispatch(cacheAction)
                }
              })
              .catch((error) => {
                const retries = extra.retries + 1

                const errorAction: EntityAction<any> = {
                  ...action,
                  extra: {
                    ...extra,
                    retries,
                  },
                  type: 'API_ERROR',
                  error,
                }
                storeApi.dispatch(errorAction)

                // Retry 7 times
                if (retries < 7) {
                  const retryAction: EntityAction<any> = {
                    ...action,
                    type: 'GET_FROM_API',
                    extra: {
                      ...extra,
                      retries,
                    },
                  }
                  setTimeout(() => {
                    storeApi.dispatch(retryAction)
                  }, 2 ** retries * 100)
                }
              })
          }
        }
      }
    } catch (err) {
      console.error(err)
    }
    return next(action)
  }

export const cacheMiddleware: IMiddleware =
  (storeApi) => (next) => (action: EntityAction<any>) => {
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
      console.error(err)
    }
    return next(action)
  }
