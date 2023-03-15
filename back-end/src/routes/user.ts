import express from "express";
import { getAllScore, getUserScore, postingNewScore } from "../controller/userController";
import { checkToken } from "../utils/middleware";
const router = express.Router();

router
.post("/", checkToken, postingNewScore)
.get("/", getAllScore)
.get("/:uid", checkToken, getUserScore);

export { router as userRouter };
