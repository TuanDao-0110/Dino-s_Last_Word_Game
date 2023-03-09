

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  appId: process.env.REACT_APP_FIREBASE_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  measurementId: process.env.REACT_APP_MESASUREMENT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};
// export const db = getFirestore(app);


 export function getFirebaseConfig() {
   if (!firebaseConfig || !firebaseConfig.apiKey) {
     throw new Error("No Firebase configuration object provided." + "\n" + "Add your web app's configuration object to firebase-config.ts");
   } else {
     return firebaseConfig;
   }
 }    
  

