"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const api_1 = require("./api");
Object.defineProperty(exports, "Api", { enumerable: true, get: function () { return api_1.Api; } });
const cookies_1 = require("./cookies");
__exportStar(require("./types"), exports);
const init = (fetch, cookieManagerImpl, options) => {
    // prettier-ignore
    const cookieManager = (cookieManagerImpl.get)
        ? cookies_1.wrapReactNativeCookieManager(cookieManagerImpl)
        : cookies_1.wrapToughCookie(cookieManagerImpl);
    return new api_1.Api(fetch, cookieManager, options);
};
exports.default = init;
//# sourceMappingURL=index.js.map