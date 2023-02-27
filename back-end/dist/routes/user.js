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
const middleware_1 = require("../utils/middleware");
const { scoreDB, admin } = firebase_1.default;
router.use(middleware_1.checkToken);
router
    .post("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = _req.body;
    data.timestamp = admin.database.ServerValue.TIMESTAMP;
    try {
        yield scoreDB.push(data);
        return res.status(200).json({ msg: "add ok" });
    }
    catch (error) {
        return res.status(500).json({ msg: "Error storing data" });
    }
}))
    .get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user router");
    yield scoreDB.once("value", (snapshot) => {
        let result = snapshot.val();
        return res.status(200).json({ result });
    });
}));
