import express from "express";
const router = express.Router();

import { getALlWord, getWordBaseOnLevel, postNewWord } from "../controller/wordController";

router
.get("/all", getALlWord)
.get("/:level", getWordBaseOnLevel)
.post("/newword", postNewWord);

export { router as wordRouter };
