"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInfor = void 0;
const firebase_1 = __importDefault(require("../database/firebase"));
const { fireStoreDB } = firebase_1.default;
const userInfor = async (uid, next) => {
    try {
        const getAll = await fireStoreDB.collection("users").where("uid", "==", uid).get();
        const userDocs = getAll.docs[0];
        return userDocs;
    }
    catch (error) {
        return next(error);
    }
};
exports.userInfor = userInfor;
//# sourceMappingURL=userData.js.map