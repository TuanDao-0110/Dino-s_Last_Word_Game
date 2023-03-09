import { Category } from "./API.model";

export interface RETURN_WORD_LIST_TYPE {
  result: string[];
}

export interface NEW_WORD_TYPE {
  newword: string;
  category: Category;
}
