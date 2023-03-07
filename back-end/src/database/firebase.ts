import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { env } from "process";
const serviceAccount = require("../../service/hangman-e9ef0-firebase-adminsdk-ejrss-244a0a8bc2.json");
const testServiceAccount = require("../../service/hangman_test.json");
import dotenv from "dotenv";
dotenv.config();
const useServiceAccount = env.NODE_ENV === "test" ? testServiceAccount : serviceAccount;
const DATABASE_URL = env.NODE_ENV === "test" ? env.TESTING_DATABASE_URL : env.DATABASE_URL;

admin.initializeApp({
  credential: admin.credential.cert(useServiceAccount),
  databaseURL: DATABASE_URL,
});

const db = admin.database();
const fireStoreDB = getFirestore();

const verifyIdToken = async (token: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw error;
  }
};
const wordDB = db.ref("words");
const scoreDB = db.ref("scores");
export default { wordDB, scoreDB, verifyIdToken, admin, fireStoreDB };
