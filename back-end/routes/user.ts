import express from "express";
import { getAllScore, getUserScore, postingNewScore } from "../controller/userController";
const router = express.Router();

router
  .post("/", postingNewScore)
  .get("/", getAllScore)
  .get("/:uid", getUserScore);

export { router as userRouter };
