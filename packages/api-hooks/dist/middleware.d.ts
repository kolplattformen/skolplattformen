import { Middleware } from 'redux';
import { EntityStoreRootState } from './types';
declare type IMiddleware = Middleware<{}, EntityStoreRootState>;
export declare const apiMiddleware: IMiddleware;
export declare const cacheMiddleware: IMiddleware;
export {};
