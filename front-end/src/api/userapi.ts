import axios from "axios";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { METHOD } from "../types/API.model";
import { NEW_SCORE } from "../types/score.model";

export const postNewScore = async (user: User, newScore: NEW_SCORE) => {
  try {
    const { getIdToken } = user;
    const { data, status } = await axios({
      method: METHOD.POST,
      data: newScore,
      
    });
    return 
  } catch (error) {}
};
