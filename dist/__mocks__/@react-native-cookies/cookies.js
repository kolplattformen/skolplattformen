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
const tough_cookie_1 = require("tough-cookie");
const convertTtoC = (cookie) => {
    if (typeof cookie === 'string') {
        return convertTtoC(tough_cookie_1.Cookie.parse(cookie));
    }
    return {
        name: cookie.key,
        value: cookie.value,
        domain: cookie.domain || undefined,
        expires: cookie.expires === 'Infinity' ? undefined : cookie.expires.toUTCString(),
        httpOnly: cookie.httpOnly || undefined,
        path: cookie.path || undefined,
        secure: cookie.secure,
    };
};
const convertCtoT = (cookie) => new tough_cookie_1.Cookie({
    key: cookie.name,
    value: cookie.value,
    domain: cookie.domain,
    expires: cookie.expires ? new Date(cookie.expires) : undefined,
    httpOnly: cookie.httpOnly || false,
    path: cookie.path,
    secure: cookie.secure || false,
});
const convertCookies = (cookies) => cookies.reduce((map, cookie) => (Object.assign(Object.assign({}, map), { [cookie.key]: convertTtoC(cookie) })), {});
const jar = new tough_cookie_1.CookieJar();
const CookieManager = {
    clearAll: () => __awaiter(void 0, void 0, void 0, function* () {
        yield jar.removeAllCookies();
        return true;
    }),
    get: (url) => __awaiter(void 0, void 0, void 0, function* () {
        const cookies = yield jar.getCookies(url);
        return convertCookies(cookies);
    }),
    set: (url, cookie) => __awaiter(void 0, void 0, void 0, function* () {
        yield jar.setCookie(convertCtoT(cookie), url);
        return true;
    }),
    setFromResponse: (url, cookie) => __awaiter(void 0, void 0, void 0, function* () {
        yield jar.setCookie(cookie, url);
        return true;
    }),
};
exports.default = CookieManager;
//# sourceMappingURL=cookies.js.map