import React, { createContext, useContext } from 'react'

export const ChildContext = createContext({})

export const ChildProvider = ({ child, children }) => {
  return <ChildContext.Provider value={child}>{children}</ChildContext.Provider>
}

export const useChild = () => useContext(ChildContext)
