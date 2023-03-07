import express from "express";
const router = express.Router();
import { getALlWord, getWordBaseOnLevel, postNewWord } from "../controller/wordController";

router
.get("/", getALlWord)
.get("/:level", getWordBaseOnLevel)
.post("/", postNewWord);

export { router as wordRouter };
