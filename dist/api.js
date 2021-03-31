"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Api = void 0;
const events_1 = require("events");
const he_1 = require("he");
const html = __importStar(require("node-html-parser"));
const loginStatus_1 = require("./loginStatus");
const routes = __importStar(require("./routes"));
const parse = __importStar(require("./parse"));
const fetcher_1 = __importDefault(require("./fetcher"));
const fake = __importStar(require("./fakeData"));
const fakeResponse = (data) => new Promise((res) => setTimeout(() => res(data), 200 + Math.random() * 800));
class Api extends events_1.EventEmitter {
    constructor(fetch, cookieManager, options) {
        super();
        this.isLoggedIn = false;
        this.isFake = false;
        this.fetch = fetcher_1.default(fetch, options);
        this.cookieManager = cookieManager;
        this.headers = {};
    }
    getPersonalNumber() {
        return this.personalNumber;
    }
    getRequestInit(options = {}) {
        return Object.assign(Object.assign({}, options), { headers: Object.assign(Object.assign({}, this.headers), options.headers) });
    }
    getSession(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const init = this.getRequestInit(options);
            const cookie = yield this.cookieManager.getCookieString(url);
            return Object.assign(Object.assign({}, init), { headers: Object.assign(Object.assign({}, init.headers), { cookie }) });
        });
    }
    clearSession() {
        return __awaiter(this, void 0, void 0, function* () {
            this.headers = {};
            yield this.cookieManager.clearAll();
        });
    }
    addHeader(name, value) {
        this.headers[name] = value;
    }
    login(personalNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            if (personalNumber.endsWith('1212121212'))
                return this.fakeMode();
            this.isFake = false;
            const ticketUrl = routes.login(personalNumber);
            const ticketResponse = yield this.fetch('auth-ticket', ticketUrl);
            if (!ticketResponse.ok) {
                throw new Error(`Server Error [${ticketResponse.status}] [${ticketResponse.statusText}] [${ticketUrl}]`);
            }
            const ticket = yield ticketResponse.json();
            // login was initiated - store personal number
            this.personalNumber = personalNumber;
            const status = loginStatus_1.checkStatus(this.fetch, ticket);
            status.on('OK', () => __awaiter(this, void 0, void 0, function* () {
                yield this.retrieveSessionCookie();
                yield this.retrieveXsrfToken();
                yield this.retrieveApiKey();
                this.isLoggedIn = true;
                this.emit('login');
            }));
            status.on('ERROR', () => {
                this.personalNumber = undefined;
            });
            return status;
        });
    }
    setSessionCookie(sessionCookie) {
        return __awaiter(this, void 0, void 0, function* () {
            // Manually set cookie in this call and let the cookieManager
            // handle it from here
            // If we put it into the cookieManager manually, we get duplicate cookies
            const url = routes.loginCookie;
            yield this.fetch('login-cookie', url, {
                headers: {
                    cookie: sessionCookie,
                },
                redirect: 'manual', // Important! Turn off redirect following. We can get into a redirect loop without this.
            });
            const user = yield this.getUser();
            if (!user.isAuthenticated) {
                throw new Error('Session cookie is expired');
            }
            yield this.retrieveXsrfToken();
            yield this.retrieveApiKey();
            this.isLoggedIn = true;
            this.emit('login');
        });
    }
    retrieveSessionCookie() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = routes.loginCookie;
            yield this.fetch('login-cookie', url);
        });
    }
    retrieveXsrfToken() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const url = routes.hemPage;
            const session = this.getRequestInit();
            const response = yield this.fetch('hemPage', url, session);
            const text = yield response.text();
            const doc = html.parse(he_1.decode(text));
            const xsrfToken = ((_a = doc
                .querySelector('input[name="__RequestVerificationToken"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('value')) || '';
            const scriptTags = doc.querySelectorAll('script');
            const childControllerScriptTag = scriptTags.find((elem) => {
                const srcAttr = elem.getAttribute('src');
                return srcAttr === null || srcAttr === void 0 ? void 0 : srcAttr.startsWith('/vardnadshavare/bundles/childcontroller');
            });
            this.childControllerUrl =
                routes.baseEtjanst + (childControllerScriptTag === null || childControllerScriptTag === void 0 ? void 0 : childControllerScriptTag.getAttribute('src'));
            this.addHeader('x-xsrf-token', xsrfToken);
        });
    }
    retrieveApiKey() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = routes.childcontrollerScript;
            const session = this.getRequestInit();
            const response = yield this.fetch('startBundle', url, session);
            const text = yield response.text();
            const apiKeyRegex = /"API-Key": "([\w\d]+)"/gm;
            const apiKeyMatches = apiKeyRegex.exec(text);
            const apiKey = apiKeyMatches && apiKeyMatches.length > 1 ? apiKeyMatches[1] : '';
            this.addHeader('API-Key', apiKey);
        });
    }
    retrieveCdnUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = routes.cdn;
            const session = this.getRequestInit();
            const response = yield this.fetch('cdn', url, session);
            const cdnUrl = yield response.text();
            return cdnUrl;
        });
    }
    retrieveAuthBody() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = routes.auth;
            const session = this.getRequestInit();
            const response = yield this.fetch('auth', url, session);
            const authBody = yield response.text();
            return authBody;
        });
    }
    retrieveCreateItemHeaders() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.fetch('createItemConfig', routes.createItemConfig);
            const json = yield response.json();
            return json;
        });
    }
    retrieveAuthToken(url, authBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = this.getRequestInit({
                method: 'POST',
                headers: {
                    Accept: 'text/plain',
                    Origin: 'https://etjanst.stockholm.se',
                    Referer: 'https://etjanst.stockholm.se/',
                    Connection: 'keep-alive',
                },
                body: authBody,
            });
            delete session.headers['API-Key'];
            // Temporarily remove cookies
            const cookies = yield this.cookieManager.getCookies(url);
            this.cookieManager.clearAll();
            // Perform request
            let scriptUrl = this.childControllerUrl;
            if (!scriptUrl) {
                scriptUrl = routes.childcontrollerScript;
            }
            const createItemHeaders = yield this.retrieveCreateItemHeaders();
            const response = yield this.fetch('createItem', url, Object.assign(Object.assign({ method: 'POST' }, createItemHeaders), { body: authBody }));
            // Restore cookies
            cookies.forEach((cookie) => {
                this.cookieManager.setCookie(cookie, url);
            });
            if (!response.ok) {
                throw new Error(`Server Error [${response.status}] [${response.statusText}] [${url}]`);
            }
            const authData = yield response.json();
            return authData.token;
        });
    }
    fakeMode() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isFake = true;
            setTimeout(() => {
                this.isLoggedIn = true;
                this.emit('login');
            }, 50);
            const emitter = new events_1.EventEmitter();
            emitter.token = 'fake';
            return emitter;
        });
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFake)
                return fakeResponse(fake.user());
            const url = routes.user;
            const session = this.getRequestInit();
            const response = yield this.fetch('user', url, session);
            const data = yield response.json();
            return parse.user(data);
        });
    }
    getChildren() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFake)
                return fakeResponse(fake.children());
            const cdnUrl = yield this.retrieveCdnUrl();
            const authBody = yield this.retrieveAuthBody();
            const token = yield this.retrieveAuthToken(cdnUrl, authBody);
            const url = routes.children;
            const session = this.getRequestInit({
                headers: {
                    Accept: 'application/json;odata=verbose',
                    Auth: token,
                    Host: 'etjanst.stockholm.se',
                    Referer: 'https://etjanst.stockholm.se/vardnadshavare/inloggad2/hem',
                },
            });
            const response = yield this.fetch('children', url, session);
            if (!response.ok) {
                throw new Error(`Server Error [${response.status}] [${response.statusText}] [${url}]`);
            }
            const data = yield response.json();
            return parse.children(data);
        });
    }
    getCalendar(child) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFake)
                return fakeResponse(fake.calendar(child));
            const url = routes.calendar(child.id);
            const session = this.getRequestInit();
            const response = yield this.fetch('calendar', url, session);
            const data = yield response.json();
            return parse.calendar(data);
        });
    }
    getClassmates(child) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFake)
                return fakeResponse(fake.classmates(child));
            const url = routes.classmates(child.sdsId);
            const session = this.getRequestInit();
            const response = yield this.fetch('classmates', url, session);
            const data = yield response.json();
            return parse.classmates(data);
        });
    }
    getSchedule(child, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFake)
                return fakeResponse(fake.schedule(child));
            const url = routes.schedule(child.sdsId, from.toISODate(), to.toISODate());
            const session = this.getRequestInit();
            const response = yield this.fetch('schedule', url, session);
            const data = yield response.json();
            return parse.schedule(data);
        });
    }
    getNews(child) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFake)
                return fakeResponse(fake.news(child));
            const url = routes.news(child.id);
            const session = this.getRequestInit();
            const response = yield this.fetch('news', url, session);
            const data = yield response.json();
            return parse.news(data);
        });
    }
    getNewsDetails(child, item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFake) {
                return fakeResponse(fake.news(child).find((ni) => ni.id === item.id));
            }
            const url = routes.newsDetails(child.id, item.id);
            const session = this.getRequestInit();
            const response = yield this.fetch(`news_${item.id}`, url, session);
            const data = yield response.json();
            return parse.newsItemDetails(data);
        });
    }
    getMenu(child) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFake)
                return fakeResponse(fake.menu(child));
            const menuService = yield this.getMenuChoice(child);
            if (menuService === 'rss') {
                const url = routes.menuRss(child.id);
                const session = this.getRequestInit();
                const response = yield this.fetch('menu-rss', url, session);
                const data = yield response.json();
                return parse.menu(data);
            }
            const url = routes.menuList(child.id);
            const session = this.getRequestInit();
            const response = yield this.fetch('menu-list', url, session);
            const data = yield response.json();
            return parse.menuList(data);
        });
    }
    getMenuChoice(child) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = routes.menuChoice(child.id);
            const session = this.getRequestInit();
            const response = yield this.fetch('menu-choice', url, session);
            const data = yield response.json();
            const etjanstResponse = parse.etjanst(data);
            return etjanstResponse;
        });
    }
    getNotifications(child) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFake)
                return fakeResponse(fake.notifications(child));
            const url = routes.notifications(child.sdsId);
            const session = this.getRequestInit();
            const response = yield this.fetch('notifications', url, session);
            const data = yield response.json();
            return parse.notifications(data);
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isFake = false;
            this.personalNumber = undefined;
            this.isLoggedIn = false;
            this.emit('logout');
            yield this.clearSession();
        });
    }
}
exports.Api = Api;
//# sourceMappingURL=api.js.map