"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScore = exports.isCategory = void 0;
const data_model_1 = require("../types/data.model");
const isCategory = (value) => {
    return Object.values(data_model_1.Category).includes(value);
};
exports.isCategory = isCategory;
const isScore = (obj) => {
    return obj && typeof obj.score === "number";
};
exports.isScore = isScore;
