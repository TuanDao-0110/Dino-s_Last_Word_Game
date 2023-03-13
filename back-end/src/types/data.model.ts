export enum Category {
  ANIMALS = "animals",
  FRUITS = "fruits",
  COUNTRIES = "countries",
  PROFESSION = "professions",
  SPORTS = "sports",
}
export enum TakeUser {
  All = "all",
  Short = "short",
}
export interface Score {
  score: number;
  timestamp: number | string;
  [key: string]: any;
}
export interface UserInfoType {
  [index: string]: number | string;
  email: string;
  name: string;
}

export interface ListScores {
  [uid: string]: Score | UserInfoType[];
}

export interface userInfoType {
  _fieldsProto: {
    [key: string]: {
      stringValue: string;
      valueType: string;
    };
  };
  [key: string]: any;
}
