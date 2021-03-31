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
const record = (name, url, init, type, options, response, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!options.record) {
        return;
    }
    const info = Object.assign(Object.assign({}, (init || {})), { name,
        url,
        type, status: response.status, statusText: response.statusText });
    yield options.record(info, data);
});
function wrap(fetch, options = {}) {
    return (name, url, init = { headers: {} }) => __awaiter(this, void 0, void 0, function* () {
        const config = Object.assign(Object.assign({}, init), { headers: Object.assign({ 'User-Agent': 
                // eslint-disable-next-line max-len
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36' }, init.headers) });
        const response = yield fetch(url, config);
        const wrapMethod = (res, methodName) => {
            // @ts-ignore
            const original = res[methodName].bind(res);
            // @ts-ignore
            res[methodName] = (...args) => __awaiter(this, void 0, void 0, function* () {
                const result = yield original(...args);
                yield record(name, url, config, methodName, options, response, result);
                return result;
            });
        };
        wrapMethod(response, 'json');
        wrapMethod(response, 'text');
        return response;
    });
}
exports.default = wrap;
//# sourceMappingURL=fetcher.js.map