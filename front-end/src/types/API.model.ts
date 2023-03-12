export enum Categories {
  ALL = "all",
  ANIMALS = "animals",
  FRUITS = "fruits",
  COUNTRIES = "countries",
  PROFESSION = "professions",
  SPORTS = "sports",
}

export enum METHOD {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}

export enum URL {
  WORD_URL = "/api/word",
  USER_URL = "/api/user",
}

// 1. return API type
// 1.1 return get word type
export interface Word_Type {
  result:
    | string[]
    | {
        [key in Categories]: string[];
      };
}

// 1.2 resturn message
export interface Message_Type {
  msg?: string;
}
