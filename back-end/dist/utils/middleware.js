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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.unknowEndpoint = exports.checkToken = void 0;
const firebase_1 = __importDefault(require("../database/firebase"));
const checkToken = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send("Authorization header missing");
    }
    const token = authHeader.split("Bearer ")[1];
    try {
        const decodedToken = yield firebase_1.default.verifyIdToken(token);
        req.currentUser = decodedToken; // add currentUser property to request object
        return next();
    }
    catch (error) {
        return res.status(401).send("Invalid token");
    }
});
exports.checkToken = checkToken;
const unknowEndpoint = (req, res) => {
    return res.status(404).json({ error: "unknown endpoint" });
};
exports.unknowEndpoint = unknowEndpoint;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
};
exports.errorHandler = errorHandler;
