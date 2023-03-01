import { Level, Score } from "../types/data.model";

export const isLevel = (value: string): value is Level => {
  return Object.values<string>(Level).includes(value);
};

export const isScore = (obj: any): obj is Score => {
  return obj && typeof obj.score === "number";
};
