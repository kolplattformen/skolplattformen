"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapReactNativeCookieManager = exports.wrapToughCookie = exports.deserialize = exports.serialize = void 0;
const change_case_1 = require("change-case");
const serialize = (cookie) => {
    const ic = cookie;
    const tokens = [`${ic.name}=${ic.value}`];
    const keyVals = ['expires', 'domain', 'path'];
    keyVals
        .filter((key) => ic[key])
        .forEach((key) => {
        tokens.push(`${change_case_1.pascalCase(key)}=${ic[key]}`);
    });
    const bools = ['secure', 'httpOnly'];
    bools
        .filter((key) => ic[key])
        .forEach((key) => {
        tokens.push(change_case_1.pascalCase(key));
    });
    return tokens.join('; ');
};
exports.serialize = serialize;
const deserialize = (cookieString) => {
    const [nameVal, ...others] = cookieString
        .split(';')
        .map((token) => token.trim());
    const [name, value] = nameVal.split('=');
    const cookie = {
        name,
        value,
    };
    others
        .map((keyVal) => keyVal.split('='))
        .forEach(([key, val]) => {
        const prop = change_case_1.camelCase(key);
        // eslint-disable-next-line default-case
        switch (prop) {
            case 'expires':
            case 'domain':
            case 'path':
                cookie[prop] = val;
                break;
            case 'secure':
            case 'httpOnly':
                cookie[prop] = true;
                break;
        }
    });
    return cookie;
};
exports.deserialize = deserialize;
const wrapToughCookie = (jar) => ({
    getCookieString: (url) => jar.getCookieString(url),
    getCookies: (url) => __awaiter(void 0, void 0, void 0, function* () {
        const cookies = yield jar.getCookies(url);
        return cookies.map((cookie) => exports.deserialize(cookie.toString()));
    }),
    setCookie: (cookie, url) => __awaiter(void 0, void 0, void 0, function* () {
        yield jar.setCookie(exports.serialize(cookie), url);
    }),
    setCookieString: (cookieString, url) => __awaiter(void 0, void 0, void 0, function* () {
        yield jar.setCookie(cookieString, url);
    }),
    clearAll: () => jar.removeAllCookies(),
});
exports.wrapToughCookie = wrapToughCookie;
const wrapReactNativeCookieManager = (rnc) => ({
    clearAll: () => rnc.clearAll().then(),
    getCookieString: (url) => __awaiter(void 0, void 0, void 0, function* () {
        const cookies = yield rnc.get(url);
        return Object.values(cookies)
            .map((c) => `${c.name}=${c.value}`)
            .join('; ');
    }),
    getCookies: (url) => __awaiter(void 0, void 0, void 0, function* () {
        const cookies = yield rnc.get(url);
        return Object.values(cookies);
    }),
    setCookie: (cookie, url) => __awaiter(void 0, void 0, void 0, function* () {
        yield rnc.setFromResponse(url, exports.serialize(cookie));
    }),
    setCookieString: (cookieString, url) => __awaiter(void 0, void 0, void 0, function* () {
        yield rnc.setFromResponse(url, cookieString);
    }),
});
exports.wrapReactNativeCookieManager = wrapReactNativeCookieManager;
//# sourceMappingURL=cookies.js.map