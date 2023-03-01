"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const welcome_1 = require("./routes/welcome");
const word_1 = require("./routes/word");
const user_1 = require("./routes/user");
const middleware_1 = require("./utils/middleware");
const app = (0, express_1.default)();
// 1.middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)(":method :url :status :response-time ms "));
app.use(express_1.default.static("build"));
app.use(welcome_1.welcomeRouter);
app.use("/api/word", word_1.wordRouter);
app.use("/api/user", middleware_1.checkToken, user_1.userRouter);
app.use(middleware_1.unknowEndpoint);
app.use(middleware_1.errorHandler);
// 3.
exports.default = app;
