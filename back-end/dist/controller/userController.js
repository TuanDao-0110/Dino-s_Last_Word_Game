"use strict";
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
const postingNewScore = async (req, res, next) => {
    let newScore = req.body;
    if (!(0, checkingType_1.isScore)(newScore)) {
        return next((0, ErrorCreate_1.createError)(errorType_model_1.Name.BadRequestError400, errorType_model_1.Message.Invalid_Score));
    }
    newScore.timestamp = admin.database.ServerValue.TIMESTAMP;
    const userScoresRef = admin.database().ref(`scores/${req.currentUser.uid}`);
    try {
        const snapshot = await userScoresRef.once("value");
        if (!snapshot.exists()) {
            await userScoresRef.set([newScore]);
        }
        else {
            let score = snapshot.val();
            let updateScore = [...score];
            updateScore.push(newScore);
            await userScoresRef.set(updateScore);
        }
        return res.status(201).json({ msg: successMessage_model_1.SuccessMessage.AddSuccess });
    }
    catch (error) {
        return next(error);
    }
};
exports.postingNewScore = postingNewScore;
const getAllScore = async (req, res, next) => {
    try {
        let snapshot = await scoreDB.once("value");
        let result = snapshot.val();
        return res.status(200).json({ result });
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllScore = getAllScore;
const getUserScore = async (req, res, next) => {
    const uid = req.params.uid;
    try {
        let userInfo = await (0, userData_1.userInfor)(uid, next);
        const scoreRef = admin.database().ref(`scores/${uid}`);
        await scoreRef.once("value", (snapshot) => {
            const scoreData = snapshot.val();
            return res.status(200).json({ scoreData, userInfo });
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getUserScore = getUserScore;
//# sourceMappingURL=userController.js.map