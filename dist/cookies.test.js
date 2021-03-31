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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookies_1 = require("./cookies");
const tough_cookie_1 = require("tough-cookie");
const cookies_2 = __importDefault(require("@react-native-cookies/cookies"));
describe('CookieManager', () => {
    describe('deserialize', () => {
        it('deserializes cookies with only name and value', () => {
            const cookieStr = 'foo=bar';
            const cookie = {
                name: 'foo',
                value: 'bar',
            };
            expect(cookies_1.deserialize(cookieStr)).toEqual(cookie);
        });
        it('deserializes cookies with Expires', () => {
            const cookieStr = 'foo=bar; Expires=Tue, 09 Mar 2021 08:27:48 GMT';
            const cookie = {
                name: 'foo',
                value: 'bar',
                expires: 'Tue, 09 Mar 2021 08:27:48 GMT',
            };
            expect(cookies_1.deserialize(cookieStr)).toEqual(cookie);
        });
        it('deserializes cookies with Domain', () => {
            const cookieStr = 'foo=bar; Domain=.stockholm.se';
            const cookie = {
                name: 'foo',
                value: 'bar',
                domain: '.stockholm.se',
            };
            expect(cookies_1.deserialize(cookieStr)).toEqual(cookie);
        });
        it('deserializes cookies with Path', () => {
            const cookieStr = 'foo=bar; Path=/';
            const cookie = {
                name: 'foo',
                value: 'bar',
                path: '/',
            };
            expect(cookies_1.deserialize(cookieStr)).toEqual(cookie);
        });
        it('deserializes cookies with Secure', () => {
            const cookieStr = 'foo=bar; Secure';
            const cookie = {
                name: 'foo',
                value: 'bar',
                secure: true,
            };
            expect(cookies_1.deserialize(cookieStr)).toEqual(cookie);
        });
        it('deserializes cookies with HttpOnly', () => {
            const cookieStr = 'foo=bar; HttpOnly';
            const cookie = {
                name: 'foo',
                value: 'bar',
                httpOnly: true,
            };
            expect(cookies_1.deserialize(cookieStr)).toEqual(cookie);
        });
        it('deserializes cookies with HTTPOnly', () => {
            const cookieStr = 'foo=bar; HTTPOnly';
            const cookie = {
                name: 'foo',
                value: 'bar',
                httpOnly: true,
            };
            expect(cookies_1.deserialize(cookieStr)).toEqual(cookie);
        });
        it('deserializes cookies with all properties', () => {
            const cookieStr = 'foo=bar; Expires=Tue, 09 Mar 2021 08:27:48 GMT; Domain=.stockholm.se; Path=/; Secure; HTTPOnly';
            const cookie = {
                name: 'foo',
                value: 'bar',
                expires: 'Tue, 09 Mar 2021 08:27:48 GMT',
                domain: '.stockholm.se',
                path: '/',
                secure: true,
                httpOnly: true,
            };
            expect(cookies_1.deserialize(cookieStr)).toEqual(cookie);
        });
    });
    describe('serialize', () => {
        it('serializes cookies with only name and value', () => {
            const cookieStr = 'foo=bar';
            const cookie = {
                name: 'foo',
                value: 'bar',
            };
            expect(cookies_1.serialize(cookie)).toEqual(cookieStr);
        });
        it('serializes cookies with Expires', () => {
            const cookieStr = 'foo=bar; Expires=Tue, 09 Mar 2021 08:27:48 GMT';
            const cookie = {
                name: 'foo',
                value: 'bar',
                expires: 'Tue, 09 Mar 2021 08:27:48 GMT',
            };
            expect(cookies_1.serialize(cookie)).toEqual(cookieStr);
        });
        it('serializes cookies with Domain', () => {
            const cookieStr = 'foo=bar; Domain=.stockholm.se';
            const cookie = {
                name: 'foo',
                value: 'bar',
                domain: '.stockholm.se',
            };
            expect(cookies_1.serialize(cookie)).toEqual(cookieStr);
        });
        it('serializes cookies with Path', () => {
            const cookieStr = 'foo=bar; Path=/';
            const cookie = {
                name: 'foo',
                value: 'bar',
                path: '/',
            };
            expect(cookies_1.serialize(cookie)).toEqual(cookieStr);
        });
        it('serializes cookies with Secure', () => {
            const cookieStr = 'foo=bar; Secure';
            const cookie = {
                name: 'foo',
                value: 'bar',
                secure: true,
            };
            expect(cookies_1.serialize(cookie)).toEqual(cookieStr);
        });
        it('serializes cookies with HttpOnly', () => {
            const cookieStr = 'foo=bar; HttpOnly';
            const cookie = {
                name: 'foo',
                value: 'bar',
                httpOnly: true,
            };
            expect(cookies_1.serialize(cookie)).toEqual(cookieStr);
        });
        it('serializes cookies with all properties', () => {
            const cookieStr = 'foo=bar; Expires=Tue, 09 Mar 2021 08:27:48 GMT; Domain=.stockholm.se; Path=/; Secure; HttpOnly';
            const cookie = {
                name: 'foo',
                value: 'bar',
                expires: 'Tue, 09 Mar 2021 08:27:48 GMT',
                domain: '.stockholm.se',
                path: '/',
                secure: true,
                httpOnly: true,
            };
            expect(cookies_1.serialize(cookie)).toEqual(cookieStr);
        });
    });
    describe('wrap', () => {
        describe('tough cookie', () => {
            let jar;
            let manager;
            beforeEach(() => {
                jar = new tough_cookie_1.CookieJar();
                manager = cookies_1.wrapToughCookie(jar);
            });
            it('handles getCookieString', () => __awaiter(void 0, void 0, void 0, function* () {
                const url = 'https://etjanster.stockholm.se/';
                const cookieStr = 'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly';
                yield jar.setCookie(cookieStr, url);
                const storedCookies = yield manager.getCookieString('https://foo.stockholm.se/bar/baz');
                expect(storedCookies).toEqual('foo=bar');
            }));
            it('handles getCookies', () => __awaiter(void 0, void 0, void 0, function* () {
                const url = 'https://etjanster.stockholm.se/';
                const cookieStr = 'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly';
                const cookie = {
                    name: 'foo',
                    value: 'bar',
                    domain: 'stockholm.se',
                    path: '/',
                    secure: true,
                    httpOnly: true,
                };
                yield jar.setCookie(cookieStr, url);
                const storedCookies = yield manager.getCookies('https://foo.stockholm.se/bar/baz');
                expect(storedCookies).toHaveLength(1);
                expect(storedCookies[0]).toEqual(cookie);
            }));
            it('handles setCookie', () => __awaiter(void 0, void 0, void 0, function* () {
                const url = 'https://etjanster.stockholm.se/';
                const cookie = {
                    name: 'foo',
                    value: 'bar',
                    domain: 'stockholm.se',
                    path: '/',
                    secure: true,
                    httpOnly: true,
                };
                yield manager.setCookie(cookie, url);
                const cookies = yield jar.getCookieString(url);
                expect(cookies).toEqual('foo=bar');
            }));
            it('handles setCookieString', () => __awaiter(void 0, void 0, void 0, function* () {
                const url = 'https://etjanster.stockholm.se/';
                const cookieStr = 'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly';
                yield manager.setCookieString(cookieStr, url);
                const cookies = yield jar.getCookieString(url);
                expect(cookies).toEqual('foo=bar');
            }));
            it('handles clearAll', () => __awaiter(void 0, void 0, void 0, function* () {
                const url = 'https://etjanster.stockholm.se/';
                const cookieStr = 'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly';
                yield manager.setCookieString(cookieStr, url);
                yield manager.clearAll();
                const cookies = yield jar.getCookieString(url);
                expect(cookies).toEqual('');
            }));
        });
        describe('@react-native-cookies/cookies', () => {
            let manager;
            beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
                yield cookies_2.default.clearAll();
                manager = cookies_1.wrapReactNativeCookieManager(cookies_2.default);
            }));
            it('handles getCookieString', () => __awaiter(void 0, void 0, void 0, function* () {
                const url = 'https://etjanster.stockholm.se/';
                const cookieStr = 'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly';
                yield cookies_2.default.setFromResponse(url, cookieStr);
                const storedCookies = yield manager.getCookieString('https://foo.stockholm.se/bar/baz');
                expect(storedCookies).toEqual('foo=bar');
            }));
            it('handles getCookies', () => __awaiter(void 0, void 0, void 0, function* () {
                const url = 'https://etjanster.stockholm.se/';
                const cookieStr = 'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly';
                const cookie = {
                    name: 'foo',
                    value: 'bar',
                    domain: 'stockholm.se',
                    path: '/',
                    secure: true,
                    httpOnly: true,
                };
                yield cookies_2.default.setFromResponse(url, cookieStr);
                const storedCookies = yield manager.getCookies('https://foo.stockholm.se/bar/baz');
                expect(storedCookies).toHaveLength(1);
                expect(storedCookies[0]).toEqual(cookie);
            }));
            it('handles setCookie', () => __awaiter(void 0, void 0, void 0, function* () {
                const url = 'https://etjanster.stockholm.se/';
                const cookie = {
                    name: 'foo',
                    value: 'bar',
                    domain: 'stockholm.se',
                    path: '/',
                    secure: true,
                    httpOnly: true,
                };
                yield manager.setCookie(cookie, url);
                const cookies = yield cookies_2.default.get(url);
                expect(cookies).toHaveProperty('foo');
                expect(cookies['foo'].value).toEqual('bar');
            }));
            it('handles setCookieString', () => __awaiter(void 0, void 0, void 0, function* () {
                const url = 'https://etjanster.stockholm.se/';
                const cookieStr = 'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly';
                yield manager.setCookieString(cookieStr, url);
                const cookies = yield cookies_2.default.get(url);
                expect(cookies).toHaveProperty('foo');
                expect(cookies['foo'].value).toEqual('bar');
            }));
            it('handles clearAll', () => __awaiter(void 0, void 0, void 0, function* () {
                const url = 'https://etjanster.stockholm.se/';
                const cookieStr = 'foo=bar; Domain=.stockholm.se; Path=/; Secure; HttpOnly';
                yield manager.setCookieString(cookieStr, url);
                yield manager.clearAll();
                const cookies = yield cookies_2.default.get(url);
                expect(cookies).toEqual({});
            }));
        });
    });
});
//# sourceMappingURL=cookies.test.js.map