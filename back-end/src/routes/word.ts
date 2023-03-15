import express from "express";
const router = express.Router();
import { getALlWord, getWordBaseOnCategory, postNewWord } from "../controller/wordController";

router
.get("/", getALlWord)
.get("/:category", getWordBaseOnCategory)
.post("/", postNewWord);

export { router as wordRouter };
