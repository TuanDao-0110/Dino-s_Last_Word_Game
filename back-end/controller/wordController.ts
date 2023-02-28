import { Response, Request, NextFunction } from "express";
import { createError } from "../utils/ErrorCreate";
import firebase from "../database/firebase";
import { isLevel } from "../helper/checkingType";
import { Message, Name } from "../types/errorType.model";
import { SuccessMessage } from "../types/successMessage.model";
const { wordDB, admin } = firebase;

export const getALlWord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let snapshot = await wordDB.once("value");
    let result = snapshot.val();
    return res.status(200).json({ result });
  } catch (error) {
    return next(error);
  }
};
export const getWordBaseOnLevel = async (req: Request, res: Response, next: NextFunction) => {
  const level = req.params.level;
  if (!isLevel(level)) {
    const error = createError(Name.BadRequestError400, Message.Invalid_Level_Select);
    return next(error);
  }
  try {
    const snapshot = await admin.database().ref(`words/${level}`).once("value");
    const result = snapshot.val();
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};
export const postNewWord = async (req: Request, res: Response, next: NextFunction) => {
  const { newword, level } = req.body;
  // Check if the newword and level are of the expected type
  if (typeof newword !== "string" || typeof level !== "string") {
    // If the data is of the wrong type, throw a custom error with a name and message
    const error = createError(Name.BadRequestError400, Message.Invalid_New_Word);
    return next(error);
  }
  if (!isLevel(level)) {
    const error = createError(Name.BadRequestError400, Message.Invalid_Level_Select);
    //  throw error;
    return next(error);
  }
  const newWordDB = admin.database().ref(`words/${level}`);
  try {
    let snapshot = await newWordDB.once("value");
    if (!snapshot.exists()) {
      await newWordDB.set([newword]);
    } else {
      const word = snapshot.val();
      let updateWord = [...word];
      updateWord.push(newword);
      console.log(updateWord);
      await newWordDB.set([...updateWord]);
    }
    return res.status(201).json({ msg: SuccessMessage.AddSuccess });
  } catch (error) {
    return next(error);
  }
};
