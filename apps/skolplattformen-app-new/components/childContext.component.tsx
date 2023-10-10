import {Child} from '../libs/api/lib';
import React, {createContext, useContext} from 'react';

interface ChildProviderProps {
  child: Child;
  children: React.ReactNode;
}

export const ChildContext = createContext<Child>({
  id: '',
  sdsId: '',
  name: '',
});

export const ChildProvider = ({child, children}: ChildProviderProps) => {
  return (
    <ChildContext.Provider value={child}>{children}</ChildContext.Provider>
  );
};

export const useChild = () => useContext(ChildContext);
