"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedule = exports.notifications = exports.newsDetails = exports.news = exports.menu = exports.classmates = exports.calendar = exports.children = exports.user = void 0;
const createReducer = (entity) => {
    const reducer = (state = {}, action) => {
        var _a;
        if (action.entity !== entity || !action.extra)
            return state;
        const key = (_a = action.extra) === null || _a === void 0 ? void 0 : _a.key;
        const node = state[key] || {
            status: 'pending',
            data: action.extra.defaultValue,
        };
        let newNode;
        switch (action.type) {
            case 'GET_FROM_API': {
                newNode = Object.assign(Object.assign({}, node), { error: undefined, status: 'loading' });
                break;
            }
            case 'RESULT_FROM_API': {
                newNode = Object.assign(Object.assign({}, node), { data: action.data || node.data, status: 'loaded' });
                break;
            }
            case 'API_ERROR': {
                newNode = Object.assign(Object.assign({}, node), { status: action.extra.retries < 3 ? node.status : 'error', error: action.error });
                break;
            }
            case 'RESULT_FROM_CACHE': {
                newNode = Object.assign(Object.assign({}, node), { data: action.data || node.data });
                break;
            }
            default: {
                newNode = Object.assign({}, node);
            }
        }
        return Object.assign(Object.assign({}, state), { [key]: newNode });
    };
    return reducer;
};
exports.user = createReducer('USER');
exports.children = createReducer('CHILDREN');
exports.calendar = createReducer('CALENDAR');
exports.classmates = createReducer('CLASSMATES');
exports.menu = createReducer('MENU');
exports.news = createReducer('NEWS');
exports.newsDetails = createReducer('NEWS_DETAILS');
exports.notifications = createReducer('NOTIFICATIONS');
exports.schedule = createReducer('SCHEDULE');
//# sourceMappingURL=reducers.js.map