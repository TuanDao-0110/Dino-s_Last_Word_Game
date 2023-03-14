import { RequestHandler } from "express";
import { createError } from "../utils/ErrorCreate";
import firebase from "../database/firebase";
import { isCategory } from "../helper/checkingType";
import { Message, Name } from "../types/errorType.model";
import { SuccessMessage } from "../types/successMessage.model";
const { wordDB, admin } = firebase;

export const getALlWord: RequestHandler = async (req, res, next) => {
  try {
    let snapshot = await wordDB.once("value");
    let result = snapshot.val();
    return res.status(200).json({ result });
  } catch (error) {
    return next(error);
  }
};
export const getWordBaseOnCategory: RequestHandler = async (req, res, next) => {
  const category = req.params.category;
  if (!isCategory(category)) {
    const error = createError(Name.BadRequestError400, Message.Invalid_Category_Select);
    return next(error);
  }
  try {
    const snapshot = await admin.database().ref(`words/${category}`).once("value");
    const result = snapshot.val();
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};
export const postNewWord: RequestHandler = async (req, res, next) => {
  const { newWord, category } = req.body;
  // Check if the newword and category are of the expected type
  if (typeof newWord !== "string" || typeof category !== "string") {
    // If the data is of the wrong type, throw a custom error with a name and message
    const error = createError(Name.BadRequestError400, Message.Invalid_New_Word);
    return next(error);
  }
  if (!isCategory(category)) {
    const error = createError(Name.BadRequestError400, Message.Invalid_Category_Select);
    //  throw error;
    return next(error);
  }
  const newWordDB = admin.database().ref(`words/${category}`);
  try {
    let snapshot = await newWordDB.once("value");
    if (!snapshot.exists()) {
      await newWordDB.set([newWord]);
    } else {
      const word = snapshot.val();
      let updateWord = [...word];
      updateWord.push(newWord);
      await newWordDB.set([...updateWord]);
    }
    return res.status(201).json({ msg: SuccessMessage.AddSuccess });
  } catch (error) {
    return next(error);
  }
};
