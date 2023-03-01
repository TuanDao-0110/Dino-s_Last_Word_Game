import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { env } from "process";
const serviceAccount = require("../../service/hangman-e9ef0-firebase-adminsdk-ejrss-244a0a8bc2.json");
import dotenv from "dotenv";

dotenv.config();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: env.DATABASE_URL,
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
