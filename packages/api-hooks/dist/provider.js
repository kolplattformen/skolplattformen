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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiProvider = void 0;
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const context_1 = require("./context");
const store_1 = __importDefault(require("./store"));
const noopReporter = {
    log: () => { },
    error: () => { },
};
const ApiProvider = ({ children, api, storage, reporter = noopReporter, }) => {
    const [isLoggedIn, setIsLoggedIn] = react_1.useState(api.isLoggedIn);
    const [isFake, setIsFake] = react_1.useState(api.isFake);
    const value = {
        api,
        storage,
        isLoggedIn,
        isFake,
        reporter,
    };
    react_1.useEffect(() => {
        const handler = () => {
            setIsLoggedIn(api.isLoggedIn);
            setIsFake(api.isFake);
            if (!api.isLoggedIn) {
                store_1.default.dispatch({ type: 'CLEAR', entity: 'ALL' });
            }
        };
        api.on('login', handler);
        api.on('logout', handler);
        return () => {
            api.off('login', handler);
            api.off('logout', handler);
        };
    }, [api.isLoggedIn, api.isFake]);
    return (react_1.default.createElement(context_1.ApiContext.Provider, { value: value },
        react_1.default.createElement(react_redux_1.Provider, { store: store_1.default }, children)));
};
exports.ApiProvider = ApiProvider;
//# sourceMappingURL=provider.js.map