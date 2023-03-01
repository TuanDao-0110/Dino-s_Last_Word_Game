"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.welcomeRouter = router;
router.get("/", (_req, res) => {
    return res.status(200).send("welcome  to our hang man game");
});
//# sourceMappingURL=welcome.js.map