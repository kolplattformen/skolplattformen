import React, { createContext, useContext } from 'react'

export const ChildContext = createContext({})

export const ChildProvider = ({ child, children }) => {
  console.log('Provider', child)
  return (
    <ChildContext.Provider value={child}>
      {children}
    </ChildContext.Provider>
  )
}

export const useChild = () => useContext(ChildContext)
