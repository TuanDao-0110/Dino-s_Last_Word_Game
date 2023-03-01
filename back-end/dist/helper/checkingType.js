"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScore = exports.isLevel = void 0;
const data_model_1 = require("../types/data.model");
const isLevel = (value) => {
    return Object.values(data_model_1.Level).includes(value);
};
exports.isLevel = isLevel;
const isScore = (obj) => {
    return obj && typeof obj.score === "number";
};
exports.isScore = isScore;
//# sourceMappingURL=checkingType.js.map