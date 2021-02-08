/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import { Api } from '@skolplattformen/embedded-api'
import React, {
  FC, PropsWithChildren, useEffect, useState,
} from 'react'
import { Provider } from 'react-redux'
import { ApiContext } from './context'
import store from './store'
import { AsyncStorage, IApiContext, Reporter } from './types'

type TApiProvider = FC<PropsWithChildren<{
  api: Api,
  storage: AsyncStorage,
  reporter?: Reporter
}>>
const noopReporter: Reporter = {
  log: () => { },
  error: () => { },
}
export const ApiProvider: TApiProvider = ({
  children, api, storage, reporter = noopReporter,
}) => {
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
      setIsLoggedIn(api.isLoggedIn)
      setIsFake(api.isFake)
    }

    api.on('login', handler)
    api.on('logout', handler)

    return () => {
      api.off('login', handler)
      api.off('logout', handler)
    }
  }, [api.isLoggedIn, api.isFake])

  return (
    <ApiContext.Provider value={value}>
      <Provider store={store}>
        {children}
      </Provider>
    </ApiContext.Provider>
  )
}
