import { User, UserCredential,getIdToken } from "firebase/auth";

export const setUpheader = (token: string) => {
  return { Authorization: `Bearer ${token}` };
};
