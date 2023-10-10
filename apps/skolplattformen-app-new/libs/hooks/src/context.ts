import {createContext, useContext} from 'react';
import {IApiContext} from './types';

export const ApiContext = createContext<IApiContext>({} as IApiContext);

export const useApi = () => useContext(ApiContext);
