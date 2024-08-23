"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const process = require("process");
const pagination = (page) => {
    const take = +process.env.PER_PAGE || 12;
    const skip = (page - 1) * take;
    return { skip, take };
};
exports.pagination = pagination;
//# sourceMappingURL=pagination.helper.js.map