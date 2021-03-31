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
const fetcher_1 = __importDefault(require("./fetcher"));
const Blob = require('node-blob');
Blob.prototype.arrayBuffer = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return this.buffer.buffer;
    });
};
describe('fetcher', () => {
    let fetch;
    let response;
    let headers;
    let fetcher;
    beforeEach(() => {
        headers = { get: jest.fn() };
        response = {
            ok: true,
            status: 200,
            statusText: 'ok',
            json: jest.fn(),
            text: jest.fn(),
            headers,
        };
        fetch = jest.fn().mockResolvedValue(response);
        fetcher = fetcher_1.default(fetch);
    });
    it('calls fetch', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fetcher('foo', '/');
        expect(fetch).toHaveBeenCalledWith('/', expect.any(Object));
    }));
    it('json returns the result', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { foo: 'bar' };
        response.json.mockResolvedValue(data);
        const res = yield fetcher('foo', '/');
        const result = yield res.json();
        expect(result).toEqual(data);
    }));
    it('text returns the result', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = 'Hello World!';
        response.text.mockResolvedValue(data);
        const res = yield fetcher('foo', '/');
        const result = yield res.text();
        expect(result).toEqual(data);
    }));
    describe('record', () => {
        let recorder;
        let expectedInfo;
        beforeEach(() => {
            recorder = jest.fn().mockResolvedValue(undefined);
            fetcher = fetcher_1.default(fetch, { record: recorder });
            expectedInfo = {
                name: 'foo',
                type: '',
                url: '/',
                headers: expect.any(Object),
                status: 200,
                statusText: 'ok',
            };
        });
        it('records with the correct parameters for json', () => __awaiter(void 0, void 0, void 0, function* () {
            response.json.mockResolvedValue({});
            yield (yield fetcher('foo', '/')).json();
            expectedInfo.type = 'json';
            const expectedData = {};
            expect(recorder).toHaveBeenCalledWith(expectedInfo, expectedData);
        }));
        it('records with the correct parameters for text', () => __awaiter(void 0, void 0, void 0, function* () {
            response.text.mockResolvedValue('Hello');
            yield (yield fetcher('foo', '/')).text();
            expectedInfo.type = 'text';
            const expectedData = 'Hello';
            expect(recorder).toHaveBeenCalledWith(expectedInfo, expectedData);
        }));
    });
});
//# sourceMappingURL=fetcher.test.js.map