import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirebaseConfig } from "./firebase-config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const app = initializeApp(getFirebaseConfig());
export const auth = getAuth(app);
const db = getFirestore(app);
export const signInUser = async (email: string, password: string) => {
  if (!email && !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const userStateListener = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback);
};

export const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    // the response gives us an object "user" back
    const user = res.user;
    // const q = query(collection(db, "users"), where("uid", "==", user.id));
    // This will become our fields in the database
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return user;
  } catch (err) {
    console.log(err);
    alert(err);
  }
};
export const SignOutUser = async () => await signOut(auth);
