import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/httpType.model";
import firebase from "../database/firebase";
import { SuccessMessage } from "../types/successMessage.model";
import { isScore } from "../helper/checkingType";
import { createError } from "../utils/ErrorCreate";
import { Message, Name } from "../types/errorType.model";
import { userInfor } from "../helper/userData";
import { TakeUser } from "../types/data.model";

const { admin, scoreDB } = firebase;

export const postingNewScore = async (req: CustomRequest, res: Response, next: NextFunction) => {
  let newScore = req.body;

  if (!isScore(newScore)) {
    return next(createError(Name.BadRequestError400, Message.Invalid_Score));
  }
  newScore.timestamp = admin.database.ServerValue.TIMESTAMP as number;
  const userInfo = await userInfor(req.currentUser.uid, next, TakeUser.Short);
  const userScoresRef = admin.database().ref(`scores/${req.currentUser.uid}`);
  try {
    const snapshot = await userScoresRef.once("value");
    if (!snapshot.exists()) {
      await userScoresRef.set([userInfo, newScore]);
    } else {
      let score = snapshot.val();
      let updateScore = [...score];
      updateScore.push(newScore);
      await userScoresRef.set(updateScore);
    }
    return res.status(201).json({ msg: SuccessMessage.AddSuccess });
  } catch (error) {
    return next(error);
  }
};

export const getAllScore = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    let snapshot = await scoreDB.once("value");
    let result = snapshot.val();
    return res.status(200).json({ result });
  } catch (error) {
    return next(error);
  }
};

export const getUserScore = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const uid = req.params.uid;
  if (uid !== req.currentUser.uid) {
    const error = createError(Name.Authorization, Message.Authorization_Error);
    return next(error);
  }
  try {
    let userInfo = await userInfor(uid, next, TakeUser.All);
    const scoreRef = admin.database().ref(`scores/${uid}`);
    await scoreRef.once("value", (snapshot) => {
      const scoreData = snapshot.val();
      return res.status(200).json({ scoreData, userInfo });
    });
  } catch (error) {
    return next(error);
  }
};
