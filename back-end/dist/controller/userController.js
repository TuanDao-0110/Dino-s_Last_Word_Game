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
exports.getUserScore = exports.getAllScore = exports.postingNewScore = void 0;
const firebase_1 = __importDefault(require("../database/firebase"));
const successMessage_model_1 = require("../types/successMessage.model");
const userData_1 = require("../helper/userData");
const checkingType_1 = require("../helper/checkingType");
const ErrorCreate_1 = require("../utils/ErrorCreate");
const errorType_model_1 = require("../types/errorType.model");
const { admin, scoreDB } = firebase_1.default;
const postingNewScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let newScore = req.body;
    if (!(0, checkingType_1.isScore)(newScore)) {
        return next((0, ErrorCreate_1.createError)(errorType_model_1.Name.BadRequestError400, errorType_model_1.Message.Invalid_Score));
    }
    newScore.timestamp = admin.database.ServerValue.TIMESTAMP;
    const userScoresRef = admin.database().ref(`scores/${req.currentUser.uid}`);
    try {
        const snapshot = yield userScoresRef.once("value");
        if (!snapshot.exists()) {
            yield userScoresRef.set([newScore]);
        }
        else {
            let score = snapshot.val();
            let updateScore = [...score];
            updateScore.push(newScore);
            yield userScoresRef.set(updateScore);
        }
        return res.status(201).json({ msg: successMessage_model_1.SuccessMessage.AddSuccess });
    }
    catch (error) {
        return next(error);
    }
});
exports.postingNewScore = postingNewScore;
const getAllScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let snapshot = yield scoreDB.once("value");
        let result = snapshot.val();
        return res.status(200).json({ result });
    }
    catch (error) {
        return next(error);
    }
});
exports.getAllScore = getAllScore;
const getUserScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.uid;
    try {
        let userInfo = yield (0, userData_1.userInfor)(uid, next);
        const scoreRef = admin.database().ref(`scores/${uid}`);
        yield scoreRef.once("value", (snapshot) => {
            const scoreData = snapshot.val();
            return res.status(200).json({ scoreData, userInfo });
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.getUserScore = getUserScore;
