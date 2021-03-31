import { Api } from '@skolplattformen/embedded-api';
import { FC, PropsWithChildren } from 'react';
import { AsyncStorage, Reporter } from './types';
declare type TApiProvider = FC<PropsWithChildren<{
    api: Api;
    storage: AsyncStorage;
    reporter?: Reporter;
}>>;
export declare const ApiProvider: TApiProvider;
export {};
