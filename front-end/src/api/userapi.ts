import axios from "axios";
import { getIdTokenResult, User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { METHOD } from "../types/API.model";
import { NEW_SCORE } from "../types/score.model";
import { setUpheader } from "./setUpHeader";

export const postNewScore = async (user: User, newScore: NEW_SCORE) => {
  try {
    if (user) {
    //   const { accessToken } = user;
      const { data, status } = await axios({
        method: METHOD.POST,
        data: newScore,
        // headers: setUpheader(getIdTokenResult),
      });
      return;
    }
  } catch (error) {}
};
