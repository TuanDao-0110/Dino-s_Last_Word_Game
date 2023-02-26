"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./utils/config"));
app_1.default.listen(config_1.default.PORT, () => {
    console.log(`listeng at ${config_1.default.PORT}....`);
});
