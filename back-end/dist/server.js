"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express, { Response, Request } from "express";
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const unknowEndpoint_1 = __importDefault(require("./errorhandlder/unknowEndpoint"));
const welcome_1 = require("./routes/welcome");
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
// 1.middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)(":method :url :status :response-time ms "));
// 2.
app.use(express_1.default.static("build"));
app.use(welcome_1.welcomeRouter);
// 3.
app.use(unknowEndpoint_1.default);
app.listen(PORT, () => {
    console.log(`listeng at ${PORT}....`);
});
