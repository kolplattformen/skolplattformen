"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const middleware_1 = require("./middleware");
const reducers_1 = require("./reducers");
const appReducer = redux_1.combineReducers({
    calendar: reducers_1.calendar,
    children: reducers_1.children,
    classmates: reducers_1.classmates,
    menu: reducers_1.menu,
    news: reducers_1.news,
    newsDetails: reducers_1.newsDetails,
    notifications: reducers_1.notifications,
    schedule: reducers_1.schedule,
    user: reducers_1.user,
});
// @ts-expect-error
const rootReducer = (state, action) => {
    if (action.type === 'CLEAR') {
        // eslint-disable-next-line no-param-reassign
        state = undefined;
    }
    return appReducer(state, action);
};
const enhancers = redux_1.applyMiddleware(middleware_1.apiMiddleware, middleware_1.cacheMiddleware);
// @ts-expect-error
const store = redux_1.createStore({ rootReducer, enhancers });
exports.default = store;
//# sourceMappingURL=store.js.map