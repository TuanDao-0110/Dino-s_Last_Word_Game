import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { env } from "process";
const serviceAccount = require("../../service/hangman-e9ef0-firebase-adminsdk-ejrss-244a0a8bc2.json");
const testServiceAccount = require("../../service/hangman_test.json");
import dotenv from "dotenv";
dotenv.config();
// const useServiceAccount =
//   env.NODE_ENV === "test"
//     ? {
//         type: process.env.DATA_TYPE,
//         project_id: env.DATA_PROJECT_ID,
//         private_key_id: env.DATA_PRIVATE_KEY_ID,
//         private_key: env.DATA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//         client_email: env.DATA_CLIENT_EMAIL,
//         client_id: env.DATA_CLIENT_ID,
//         auth_uri: env.DATA_AUTH_URI,
//         token_uri: env.DATA_TOKEN_URI,
//         auth_provider_x509_cert_url: env.DATA_PROVIDER_X509_CERT_URL,
//         client_x509_cert_url: env.DATA_X509_CERT_URL,
//       }
//     : {
//         type: env.TEST_TYPE,
//         project_id: env.TEST_PROJECT_ID,
//         private_key_id: env.TEST_PRIVATE_KEY_ID,
//         private_key: env.TEST_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//         client_email: env.TEST_CLIENT_EMAIL,
//         client_id: env.TEST_CLIENT_ID,
//         auth_uri: env.TEST_AUTH_URI,
//         token_uri: env.TEST_TOKEN_URI,
//         auth_provider_x509_cert_url: env.TEST_AUTH_PROVIDER_X509_CERT_URL,
//         client_x509_cert_url: env.TEST_CLIENT_X509_CERT_URL,
//       };
const useServiceAccount = env.NODE_ENV === "test" ? testServiceAccount: serviceAccount
const DATABASE_URL = env.NODE_ENV === "test" ? env.TESTING_DATABASE_URL : env.DATABASE_URL;
admin.initializeApp({
  // credential: admin.credential.cert(checkExist(useServiceAccount)? useServiceAccount:''),
  credential:admin.credential.cert(useServiceAccount),
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



