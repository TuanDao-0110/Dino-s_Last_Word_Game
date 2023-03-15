// import { Socket } from "dgram";
import { NextFunction } from "express";
import firebase from "../database/firebase";
import { TakeUser, userInfoType, UserInfoType } from "../types/data.model";
const { fireStoreDB } = firebase;

export const userInfor = async (uid: string, next: NextFunction, dataAmount: TakeUser) => {
  try {
    const getAll = await fireStoreDB.collection("users").where("uid", "==", uid).get();
    const userDocs = getAll.docs.length > 0 ? (getAll.docs[0] as unknown as userInfoType) : null;
    if (userDocs !== null) {
      if (dataAmount === TakeUser.All) {
        return userDocs;
      } else {
        const shortUserInfo: UserInfoType = {
          email: userDocs._fieldsProto.email.stringValue,
          name: userDocs._fieldsProto.name.stringValue,
        };
        return shortUserInfo;
      }
    }
  } catch (error) {
    return next(error);
  }
};
