import axios from "axios";
import { User } from "firebase/auth";
import { METHOD, URL } from "../types/API.model";
import { NEW_SCORE } from "../types/score.model";
import { setUpheader } from "./setUpHeader";

export const postNewScore = async (currentUser: User, newScore: NEW_SCORE) => {
  try {
    const token = await currentUser.getIdToken();
    const { data, status } = await axios({
      url: URL.USER_URL,
      method: METHOD.POST,
      data: newScore,
      headers: setUpheader(token),
    });
    return data;
  } catch (error) {}
};
      
export const getAllScore = async (currentUser: User) => {
  
  try {
    const token = await currentUser.getIdToken();

    const { data, status } = await axios({
      url: URL.USER_URL,
      method: METHOD.GET,
      headers: setUpheader(token),
    });
    console.log(data);
    return data.result;
  } catch (error) {}
};

export const getUserInfor = async (currentUser: User) => {
  try {
    const token = await currentUser.getIdToken();
    const uid = currentUser.uid;
    const { data, status } = await axios({
      url: `${URL.USER_URL}/${uid}`,
      headers: setUpheader(token),
    });
    // console.log(data);
    // data now can dispatch to redux
    return data.result;
  } catch (error) {
    console.log(error);
  }
};
