import axios from "axios";
import { AppDispatch } from "../app/store";
import { METHOD, WORD_LEVEL, URL } from "../types/API.model";
import { NEW_WORD_TYPE } from "../types/word.model";

export const getAllWord = async () => {
  try {
    const { data, status } = await axios({
      method: METHOD.GET,
      url: URL.WORD_URL,
    });
    return data;
  } catch (error) {}
};

export const getByWordByLevel = async (level: WORD_LEVEL) => {
  try {
    const { data, status } = await axios({
      method: METHOD.GET,
      url: `${URL.WORD_URL}/${level}`,
    });
    return data;
  } catch (error) {}
};

export const postNewWord = async (newData: NEW_WORD_TYPE) => {
  try {
    const { data, status } = await axios({
      method: METHOD.POST,
      url: `${URL.WORD_URL}`,
      data: newData,
    });
    return data;
  } catch (error) {}
};



