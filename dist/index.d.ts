import { Api } from './api';
import { FetcherOptions } from './fetcher';
import { Fetch } from './types';
import { RNCookieManager, ToughCookieJar } from './cookies';
export { Api, FetcherOptions };
export * from './types';
export { LoginStatusChecker } from './loginStatus';
declare const init: (fetch: Fetch, cookieManagerImpl: RNCookieManager | ToughCookieJar, options?: FetcherOptions | undefined) => Api;
export default init;
