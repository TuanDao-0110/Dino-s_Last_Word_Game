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
exports.wordRouter = void 0;
const express_1 = __importDefault(require("express"));
const ErrorCreate_1 = require("../utils/ErrorCreate");
const router = express_1.default.Router();
exports.wordRouter = router;
const firebase_1 = __importDefault(require("../database/firebase"));
const checking_1 = require("../helper/checking");
const errorType_model_1 = require("../types/errorType.model");
const successMessage_model_1 = require("../types/successMessage.model");
const { wordDB, admin } = firebase_1.default;
router
    .get("/all", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let snapshot = yield wordDB.once("value");
        let result = snapshot.val();
        return res.status(200).json({ result });
    }
    catch (error) {
        return next(error);
    }
}))
    .get("/:level", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const level = req.params.level;
    if (!checking_1.isLevel) {
        const error = (0, ErrorCreate_1.createError)(errorType_model_1.Name.BadRequestError400, errorType_model_1.Message.Invalid_Level_Select);
        return next(error);
    }
    try {
        const snapshot = yield admin.database().ref(`words/${level}`).once("value");
        const result = snapshot.val();
        return res.status(200).json({ result });
    }
    catch (error) {
        next(error);
    }
}))
    .post("/newword", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { newword, level } = req.body;
    // Check if the newword and level are of the expected type
    if (typeof newword !== "string" || typeof level !== "string") {
        // If the data is of the wrong type, throw a custom error with a name and message
        const error = (0, ErrorCreate_1.createError)(errorType_model_1.Name.BadRequestError400, errorType_model_1.Message.Invalid_New_Word);
        return next(error);
    }
    if (!(0, checking_1.isLevel)(level)) {
        const error = (0, ErrorCreate_1.createError)(errorType_model_1.Name.BadRequestError400, errorType_model_1.Message.Invalid_Level_Select);
        //  throw error;
        return next(error);
    }
    const newWordDB = admin.database().ref(`words/${level}`);
    try {
        let snapshot = yield newWordDB.once("value");
        if (!snapshot.exists()) {
            yield newWordDB.set([newword]);
        }
        else {
            const word = snapshot.val();
            let updateWord = [...word];
            updateWord.push(newword);
            yield newWordDB.set(updateWord);
        }
        return res.status(201).json({ msg: successMessage_model_1.SuccessMessage.AddSuccess });
    }
    catch (error) {
        return next(error);
    }
}));
