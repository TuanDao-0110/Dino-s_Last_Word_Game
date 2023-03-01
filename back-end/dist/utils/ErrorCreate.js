"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const createError = (name, message) => {
    return Object.assign(new Error(message), { name });
};
exports.createError = createError;
