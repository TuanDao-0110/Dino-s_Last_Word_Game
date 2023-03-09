import axios from "axios";
import { METHOD, Category, URL } from "../types/API.model";
import { NEW_WORD_TYPE } from "../types/word.model";

export const getAllWords = async () => {
  try {
    const { data, status } = await axios({
      method: METHOD.GET,
      url: URL.WORD_URL,
    });
    return data;
  } catch (error) {}
};

export const getByWordByCategory = async (category: Category) => {
  try {
    const { data, status } = await axios({
      method: METHOD.GET,
      url: `${URL.WORD_URL}/${category}`,
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
