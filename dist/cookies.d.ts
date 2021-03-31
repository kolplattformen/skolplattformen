import { Cookie, CookieManager } from './types';
interface Serializer {
    (cookie: Cookie): string;
}
interface Deserializer {
    (cookieString: string): Cookie;
}
export declare const serialize: Serializer;
export declare const deserialize: Deserializer;
interface ToughCookie {
    toString: () => string;
}
export interface ToughCookieJar {
    getCookieString: (url: string) => Promise<string>;
    getCookies: (url: string) => Promise<ToughCookie[]>;
    setCookie: (cookie: string, url: string) => Promise<any>;
    removeAllCookies: () => Promise<void>;
}
export declare const wrapToughCookie: (jar: ToughCookieJar) => CookieManager;
interface RNCookies {
    [key: string]: Cookie;
}
export interface RNCookieManager {
    set(url: string, cookie: Cookie, useWebKit?: boolean): Promise<boolean>;
    setFromResponse(url: string, cookie: string): Promise<boolean>;
    get(url: string, useWebKit?: boolean): Promise<RNCookies>;
    clearAll(useWebKit?: boolean): Promise<boolean>;
}
export declare const wrapReactNativeCookieManager: (rnc: RNCookieManager) => CookieManager;
export {};
