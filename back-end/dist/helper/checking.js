"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLevel = void 0;
const data_model_1 = require("../types/data.model");
const isLevel = (value) => {
    return Object.values(data_model_1.Level).includes(value);
};
exports.isLevel = isLevel;
