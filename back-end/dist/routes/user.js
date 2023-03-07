"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
exports.userRouter = router;
router
    .post("/", userController_1.postingNewScore)
    .get("/", userController_1.getAllScore)
    .get("/:uid", userController_1.getUserScore);
