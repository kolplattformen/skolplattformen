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
exports.checkStatus = void 0;
const events_1 = require("events");
const routes_1 = require("./routes");
class Checker extends events_1.EventEmitter {
    constructor(fetcher, ticket) {
        super();
        this.cancelled = false;
        this.fetcher = fetcher;
        this.url = routes_1.loginStatus(ticket.order);
        this.token = ticket.token;
        this.check();
    }
    check() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.fetcher('login-status', this.url);
            const status = yield response.text();
            this.emit(status);
            if (!this.cancelled &&
                status !== 'OK' &&
                status !== 'ERROR!' &&
                status !== 'CANCELLED') {
                setTimeout(() => this.check(), 1000);
            }
        });
    }
    cancel() {
        return __awaiter(this, void 0, void 0, function* () {
            this.cancelled = true;
        });
    }
}
const checkStatus = (fetch, ticket) => new Checker(fetch, ticket);
exports.checkStatus = checkStatus;
//# sourceMappingURL=loginStatus.js.map