"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUser = exports.useSchedule = exports.useNotifications = exports.useNewsDetails = exports.useNews = exports.useMenu = exports.useClassmates = exports.useCalendar = exports.useChildList = void 0;
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const context_1 = require("./context");
const actions_1 = require("./actions");
const store_1 = __importDefault(require("./store"));
const hook = (entityName, key, defaultValue, selector, apiCaller) => {
    const { api, isLoggedIn, reporter, storage, } = context_1.useApi();
    const getState = () => store_1.default.getState();
    const select = (storeState) => {
        const stateMap = selector(storeState) || {};
        const state = stateMap[key] || { status: 'pending', data: defaultValue };
        return state;
    };
    const initialState = select(getState());
    const [state, setState] = react_1.useState(initialState);
    const dispatch = react_redux_1.useDispatch();
    const load = (force = false) => {
        if (isLoggedIn && state.status !== 'loading' && ((force && !api.isFake) || state.status === 'pending')) {
            const extra = {
                key,
                defaultValue,
                apiCall: apiCaller(api),
                retries: 0,
            };
            // Only use cache when not in fake mode
            if (!api.isFake) {
                const pnr = api.getPersonalNumber();
                // Only get from cache first time
                if (state.status === 'pending') {
                    extra.getFromCache = () => storage.getItem(`${pnr}_${key}`);
                }
                extra.saveToCache = (value) => storage.setItem(`${pnr}_${key}`, value);
            }
            const action = actions_1.loadAction(entityName, extra);
            dispatch(action);
        }
    };
    react_1.useEffect(() => { load(); }, [isLoggedIn]);
    const listener = () => {
        const newState = select(getState());
        if (newState.status !== state.status
            || newState.data !== state.data
            || newState.error !== state.error) {
            setState(newState);
            if (newState.error) {
                const description = `Error getting ${entityName} from API`;
                reporter.error(newState.error, description);
            }
        }
    };
    react_1.useEffect(() => store_1.default.subscribe(listener), []);
    return Object.assign(Object.assign({}, state), { reload: () => load(true) });
};
const useChildList = () => hook('CHILDREN', 'children', [], (s) => s.children, (api) => () => api.getChildren());
exports.useChildList = useChildList;
const useCalendar = (child) => hook('CALENDAR', `calendar_${child.id}`, [], (s) => s.calendar, (api) => () => api.getCalendar(child));
exports.useCalendar = useCalendar;
const useClassmates = (child) => hook('CLASSMATES', `classmates_${child.id}`, [], (s) => s.classmates, (api) => () => api.getClassmates(child));
exports.useClassmates = useClassmates;
const useMenu = (child) => hook('MENU', `menu_${child.id}`, [], (s) => s.menu, (api) => () => api.getMenu(child));
exports.useMenu = useMenu;
const useNews = (child) => hook('NEWS', `news_${child.id}`, [], (s) => s.news, (api) => () => api.getNews(child));
exports.useNews = useNews;
const useNewsDetails = (child, news) => hook('NEWS_DETAILS', `news_details_${news.id}`, news, (s) => s.newsDetails, (api) => () => api.getNewsDetails(child, news));
exports.useNewsDetails = useNewsDetails;
const useNotifications = (child) => hook('NOTIFICATIONS', `notifications_${child.id}`, [], (s) => s.notifications, (api) => () => api.getNotifications(child));
exports.useNotifications = useNotifications;
const useSchedule = (child, from, to) => hook('SCHEDULE', `schedule_${child.id}_${from}_${to}`, [], (s) => s.schedule, 
// @ts-expect-error 
(api) => () => api.getSchedule(child, from, to));
exports.useSchedule = useSchedule;
const useUser = () => hook('USER', 'user', {}, (s) => s.user, (api) => () => api.getUser());
exports.useUser = useUser;
//# sourceMappingURL=hooks.js.map