import { Api } from '@skolplattformen/api'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { ApiContext } from './context'
import store from './store'
import { AsyncStorage, IApiContext, Reporter } from './types'

interface ApiProviderProps {
  api: Api
  storage: AsyncStorage
  reporter?: Reporter
}

const noopReporter: Reporter = {
  log: () => {
    // noop
  },
  error: () => {
    // noop
  },
}

export const ApiProvider = ({
  children,
  api,
  storage,
  reporter = noopReporter,
}: PropsWithChildren<ApiProviderProps>) => {
  const [isLoggedIn, setIsLoggedIn] = useState(api.isLoggedIn)
  const [isFake, setIsFake] = useState(api.isFake)

  const value: IApiContext = {
    api,
    storage,
    isLoggedIn,
    isFake,
    reporter,
  }

  useEffect(() => {
    const handler = () => {
      // Use setTimeout to avoid calling setState during render
      setTimeout(() => {
        setIsLoggedIn(api.isLoggedIn)
        setIsFake(api.isFake)

        if (!api.isLoggedIn) {
          store.dispatch({ type: 'CLEAR', entity: 'ALL' })
        }
      }, 0)
    }

    api.on('login', handler)
    api.on('logout', handler)

    return () => {
      api.off('login', handler)
      api.off('logout', handler)
    }
  }, [api])

  return (
    <ApiContext.Provider value={value}>
      <Provider store={store}>{children}</Provider>
    </ApiContext.Provider>
  )
}
