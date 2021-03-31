"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = exports.apiMiddleware = void 0;
const apiMiddleware = (storeApi) => (next) => (action) => {
    var _a, _b;
    try {
        switch (action.type) {
            case 'GET_FROM_API': {
                // Retrieve from cache
                if ((_a = action.extra) === null || _a === void 0 ? void 0 : _a.getFromCache) {
                    const cacheAction = Object.assign(Object.assign({}, action), { type: 'GET_FROM_CACHE' });
                    storeApi.dispatch(cacheAction);
                }
                // Call api
                const apiCall = (_b = action.extra) === null || _b === void 0 ? void 0 : _b.apiCall;
                if (apiCall) {
                    const extra = action.extra;
                    apiCall()
                        .then((res) => {
                        const resultAction = Object.assign(Object.assign({}, action), { type: 'RESULT_FROM_API', data: res });
                        storeApi.dispatch(resultAction);
                        if (extra.saveToCache && res) {
                            const cacheAction = Object.assign(Object.assign({}, resultAction), { type: 'STORE_IN_CACHE' });
                            storeApi.dispatch(cacheAction);
                        }
                    })
                        .catch((error) => {
                        const retries = extra.retries + 1;
                        const errorAction = Object.assign(Object.assign({}, action), { extra: Object.assign(Object.assign({}, extra), { retries }), type: 'API_ERROR', error });
                        storeApi.dispatch(errorAction);
                        // Retry 3 times
                        if (retries < 3) {
                            const retryAction = Object.assign(Object.assign({}, action), { type: 'GET_FROM_API', extra: Object.assign(Object.assign({}, extra), { retries }) });
                            setTimeout(() => {
                                storeApi.dispatch(retryAction);
                            }, retries * 500);
                        }
                    });
                }
            }
        }
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
    }
    return next(action);
};
exports.apiMiddleware = apiMiddleware;
const cacheMiddleware = (storeApi) => (next) => (action) => {
    var _a, _b;
    try {
        switch (action.type) {
            case 'GET_FROM_CACHE': {
                const getFromCache = (_a = action.extra) === null || _a === void 0 ? void 0 : _a.getFromCache;
                if (getFromCache) {
                    getFromCache().then((res) => {
                        if (res) {
                            const cacheResultAction = Object.assign(Object.assign({}, action), { type: 'RESULT_FROM_CACHE', data: JSON.parse(res) });
                            storeApi.dispatch(cacheResultAction);
                        }
                    });
                }
                break;
            }
            case 'STORE_IN_CACHE': {
                const saveToCache = (_b = action.extra) === null || _b === void 0 ? void 0 : _b.saveToCache;
                if (saveToCache && action.data) {
                    saveToCache(JSON.stringify(action.data));
                }
                break;
            }
        }
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
    }
    return next(action);
};
exports.cacheMiddleware = cacheMiddleware;
//# sourceMappingURL=middleware.js.map