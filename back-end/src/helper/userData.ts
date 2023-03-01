import { NextFunction } from "express";
import firebase from "../database/firebase";
const { fireStoreDB } = firebase;

export const userInfor = async (uid: string, next: NextFunction) => {
  try {
    const getAll = await fireStoreDB.collection("users").where("uid", "==", uid).get();
    const userDocs = getAll.docs[0];
    return userDocs;
  } catch (error) {
    return next(error);
  }
};
