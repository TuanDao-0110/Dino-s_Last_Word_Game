import * as admin from "firebase-admin";
const serviceAccount = require("../service/hangman-e9ef0-firebase-adminsdk-ejrss-244a0a8bc2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hangman-e9ef0-default-rtdb.firebaseio.com",
});
const db = admin.database();
const verifyIdToken = async (token: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying ID token:", error);
    throw error;
  }
};
const wordDB = db.ref("words");
const scoreDB = db.ref("scores");
export default { wordDB, scoreDB, verifyIdToken,admin };
