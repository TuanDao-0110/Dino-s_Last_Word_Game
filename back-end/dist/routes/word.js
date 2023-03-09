"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.wordRouter = router;
const wordController_1 = require("../controller/wordController");
router
    .get("/", wordController_1.getALlWord)
    .get("/:category", wordController_1.getWordBaseOnCategory)
    .post("/", wordController_1.postNewWord);
