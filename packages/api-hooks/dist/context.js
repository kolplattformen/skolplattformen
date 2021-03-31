"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApi = exports.ApiContext = void 0;
const react_1 = require("react");
exports.ApiContext = react_1.createContext({});
const useApi = () => react_1.useContext(exports.ApiContext);
exports.useApi = useApi;
//# sourceMappingURL=context.js.map