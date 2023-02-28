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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.userRouter = router;
const firebase_1 = __importDefault(require("../database/firebase"));
const successMessage_model_1 = require("../types/successMessage.model");
const { scoreDB, admin, firebaseDB } = firebase_1.default;
router
    .post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newScore = req.body;
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
        return res.status(200).json({ msg: successMessage_model_1.SuccessMessage.AddSuccess });
    }
    catch (error) {
        return res.status(500).json({ msg: "Error storing data" });
    }
}))
    .get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let snapshot = yield scoreDB.once("value");
        let result = snapshot.val();
        const getAll = yield firebaseDB.collection("users").get();
        console.log(getAll);
        return res.status(200).json({ result });
    }
    catch (error) {
        return next(error);
    }
}))
    .get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const currentUser = req.currentUser;
    try {
        const scoreRef = admin.database().ref(`scores/${id}`);
        yield scoreRef.once("value", (snapshot) => {
            const scoreData = snapshot.val();
            return res.status(200).json({ scoreData, currentUser });
        });
    }
    catch (error) {
        return next(error);
    }
}));
