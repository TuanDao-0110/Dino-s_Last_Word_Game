"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInfor = void 0;
const firebase_1 = __importDefault(require("../database/firebase"));
const data_model_1 = require("../types/data.model");
const { fireStoreDB } = firebase_1.default;
const userInfor = (uid, next, dataAmount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAll = yield fireStoreDB.collection("users").where("uid", "==", uid).get();
        const userDocs = getAll.docs.length > 0 ? getAll.docs[0] : null;
        if (userDocs !== null) {
            if (dataAmount === data_model_1.TakeUser.All) {
                return userDocs;
            }
            else {
                const shortUserInfo = {
                    email: userDocs._fieldsProto.email.stringValue,
                    name: userDocs._fieldsProto.name.stringValue,
                };
                return shortUserInfo;
            }
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.userInfor = userInfor;
