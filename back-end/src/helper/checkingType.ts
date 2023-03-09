import { Category, Score } from "../types/data.model";

export const isCategory = (value: string): value is Category => {
  return Object.values<string>(Category).includes(value);
};

export const isScore = (obj: any): obj is Score => {
  return obj && typeof obj.score === "number";
};
