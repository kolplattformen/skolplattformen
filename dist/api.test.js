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
const _1 = __importDefault(require("./"));
const cookies_1 = __importDefault(require("@react-native-cookies/cookies"));
describe('api', () => {
    let fetch;
    let response;
    let headers;
    let api;
    beforeEach(() => {
        headers = { get: jest.fn() };
        response = {
            json: jest.fn(),
            text: jest.fn(),
            ok: true,
            status: 200,
            statusText: 'ok',
            headers,
        };
        fetch = jest.fn().mockResolvedValue(response);
        response.text.mockResolvedValue('<html></html>');
        cookies_1.default.clearAll();
        api = _1.default(fetch, cookies_1.default);
    });
    describe('#login', () => {
        it('exposes token', () => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                token: '9462cf77-bde9-4029-bb41-e599f3094613',
                order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
            };
            response.json.mockResolvedValue(data);
            const personalNumber = 'my personal number';
            const status = yield api.login(personalNumber);
            expect(status.token).toEqual(data.token);
            status.cancel();
        }));
        it('emits PENDING', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                token: '9462cf77-bde9-4029-bb41-e599f3094613',
                order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
            };
            response.json.mockResolvedValue(data);
            response.text.mockResolvedValue('PENDING');
            const personalNumber = 'my personal number';
            const status = yield api.login(personalNumber);
            status.on('PENDING', () => __awaiter(void 0, void 0, void 0, function* () {
                status.cancel();
                done();
            }));
        }));
        it('retries on PENDING', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                token: '9462cf77-bde9-4029-bb41-e599f3094613',
                order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
            };
            response.json.mockResolvedValue(data);
            response.text.mockResolvedValueOnce('PENDING');
            response.text.mockResolvedValueOnce('OK');
            const personalNumber = 'my personal number';
            const status = yield api.login(personalNumber);
            status.on('OK', () => {
                expect(fetch).toHaveBeenCalledTimes(4);
                done();
            });
        }));
        it('remembers used personal number', () => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                token: '9462cf77-bde9-4029-bb41-e599f3094613',
                order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
            };
            response.json.mockResolvedValue(data);
            const personalNumber = 'my personal number';
            yield api.login(personalNumber);
            expect(api.getPersonalNumber()).toEqual(personalNumber);
        }));
        it('forgets used personal number if sign in is unsuccessful', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                token: '9462cf77-bde9-4029-bb41-e599f3094613',
                order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
            };
            response.json.mockResolvedValue(data);
            response.text.mockResolvedValueOnce('ERROR');
            const personalNumber = 'my personal number';
            const status = yield api.login(personalNumber);
            status.on('ERROR', () => {
                expect(api.getPersonalNumber()).toEqual(undefined);
                done();
            });
        }));
        it('throws error on external api error', () => __awaiter(void 0, void 0, void 0, function* () {
            expect.hasAssertions();
            const data = '';
            response.json.mockResolvedValue(data);
            response.ok = false;
            response.status = 500;
            response.statusText = 'Internal Server Error';
            const personalNumber = 'my personal number';
            try {
                yield api.login(personalNumber);
            }
            catch (error) {
                expect(error.message).toEqual(expect.stringContaining('Server Error'));
            }
        }));
    });
    describe('#logout', () => {
        it('clears session', () => __awaiter(void 0, void 0, void 0, function* () {
            yield api.logout();
            const session = yield api.getSession('');
            expect(session).toEqual({
                headers: {
                    cookie: '',
                },
            });
        }));
        it('emits logout event', () => __awaiter(void 0, void 0, void 0, function* () {
            const listener = jest.fn();
            api.on('logout', listener);
            yield api.logout();
            expect(listener).toHaveBeenCalled();
        }));
        it('sets .isLoggedIn', () => __awaiter(void 0, void 0, void 0, function* () {
            api.isLoggedIn = true;
            yield api.logout();
            expect(api.isLoggedIn).toBe(false);
        }));
        it('forgets personalNumber', () => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                token: '9462cf77-bde9-4029-bb41-e599f3094613',
                order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
            };
            response.json.mockResolvedValue(data);
            const pnr = 'my personal number';
            yield api.login(pnr);
            api.isLoggedIn = true;
            yield api.logout();
            expect(api.getPersonalNumber()).toEqual(undefined);
        }));
    });
    describe('fake', () => {
        it('sets fake mode for the correct pnr:s', () => __awaiter(void 0, void 0, void 0, function* () {
            let status;
            status = yield api.login('121212121212');
            expect(status.token).toEqual('fake');
            status = yield api.login('201212121212');
            expect(status.token).toEqual('fake');
            status = yield api.login('1212121212');
            expect(status.token).toEqual('fake');
        }));
        it.skip('delivers fake data', (done) => __awaiter(void 0, void 0, void 0, function* () {
            api.on('login', () => __awaiter(void 0, void 0, void 0, function* () {
                const user = yield api.getUser();
                expect(user).toEqual({
                    firstName: 'Namn',
                    lastName: 'Namnsson',
                });
                const children = yield api.getChildren();
                expect(children).toHaveLength(2);
                const calendar1 = yield api.getCalendar(children[0]);
                expect(calendar1).toHaveLength(20);
                const calendar2 = yield api.getCalendar(children[1]);
                expect(calendar2).toHaveLength(18);
                done();
            }));
            yield api.login('121212121212');
        }));
    });
});
//# sourceMappingURL=api.test.js.map