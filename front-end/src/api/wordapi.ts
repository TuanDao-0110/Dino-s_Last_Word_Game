import axios from "axios";
import {
  METHOD,
  Categories,
  URL,
  Word_Type,
  Message_Type,
} from "../types/API.model";
import { NEW_WORD_TYPE } from "../types/word.model";

export const getAllWords = async (): Promise<Word_Type[] | any> => {
  try {
    const { data, status } = await axios({
      method: METHOD.GET,
      url: URL.WORD_URL,
    });
    return data;
  } catch (error) {}
};

export const getWordByCategory = async (
  category: Categories
): Promise<Word_Type[] | any> => {
  try {
    const { data, status } = await axios({
      method: METHOD.GET,
      url: `${URL.WORD_URL}/${category}`,
    });
    return data;
  } catch (error) {}
};

export const postNewWord = async (
  newData: NEW_WORD_TYPE
): Promise<Message_Type | any> => {
  try {
    const { data, status } = await axios({
      method: METHOD.POST,
      url: `${URL.WORD_URL}`,
      data: newData,
    });
    return data;
  } catch (error) {}
};
