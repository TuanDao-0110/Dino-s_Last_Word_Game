"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const admin = __importStar(require("firebase-admin"));
const firestore_1 = require("firebase-admin/firestore");
const process_1 = require("process");
const serviceAccount = require("../../service/hangman-e9ef0-firebase-adminsdk-ejrss-244a0a8bc2.json");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process_1.env.DATABASE_URL,
});
const db = admin.database();
const fireStoreDB = (0, firestore_1.getFirestore)();
const verifyIdToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = yield admin.auth().verifyIdToken(token);
        return decodedToken;
    }
    catch (error) {
        throw error;
    }
});
const wordDB = db.ref("words");
const scoreDB = db.ref("scores");
exports.default = { wordDB, scoreDB, verifyIdToken, admin, fireStoreDB };
