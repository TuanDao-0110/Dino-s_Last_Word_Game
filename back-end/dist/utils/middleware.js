"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.unknowEndpoint = exports.checkToken = void 0;
const firebase_1 = __importDefault(require("../database/firebase"));
const errorType_model_1 = require("../types/errorType.model");
const ErrorCreate_1 = require("./ErrorCreate");
const checkToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next((0, ErrorCreate_1.createError)(errorType_model_1.Name.Authorization, errorType_model_1.Message.HeaderMissing));
    }
    const token = authHeader.split("Bearer ")[1];
    try {
        const decodedToken = await firebase_1.default.verifyIdToken(token);
        req.currentUser = decodedToken; // add currentUser property to request object
        return next();
    }
    catch (error) {
        return next((0, ErrorCreate_1.createError)(error.code, error.message));
    }
};
exports.checkToken = checkToken;
const unknowEndpoint = (req, res) => {
    return res.status(404).json({ error: errorType_model_1.Message.UnknownEndPoint });
};
exports.unknowEndpoint = unknowEndpoint;
const errorHandler = (err, req, res, next) => {
    if (err.name === errorType_model_1.Name.Authorization) {
        return res.status(401).send(err.message);
    }
    if (err.name === errorType_model_1.Name.Auth_Argument_Error) {
        return res.status(401).send(err.message);
    }
    if (err.name === errorType_model_1.Name.Auth_Token_Expired) {
        return res.status(401).send(err.message);
    }
    if (err.name === errorType_model_1.Name.BadRequestError400) {
        return res.status(400).send(err.message);
    }
    if (err.name === errorType_model_1.Name.BadRequestError404) {
        return res.status(404).send(err.message);
    }
    return res.status(500).send(errorType_model_1.Message.ServerBroken);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=middleware.js.map