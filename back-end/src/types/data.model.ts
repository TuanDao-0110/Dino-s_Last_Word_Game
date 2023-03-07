export enum Level {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export interface Score {
  score: number;
  timestamp: number | string;
}
