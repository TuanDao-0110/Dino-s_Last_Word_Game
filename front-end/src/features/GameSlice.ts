import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import words from "../wordList.json";

interface GameState {
  word: string[];
  wordToGuess: string;
  guessedLetters: string[];
  gameStatus: "playing" | "won" | "lost";
  leaderboard: { name: string; score: number }[];
}

const initialState: GameState = {
  word: [],
  wordToGuess: "",
  guessedLetters: [],
  gameStatus: "playing",
  leaderboard: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    getAllWord: (state, action: PayloadAction<string[]>) => {

    },
    setWordToGuess: (state) => {
      const index = Math.floor(Math.random() * words.length);
      state.wordToGuess = words[index].toUpperCase();
    },
    addGuessedLetter: (state, action: PayloadAction<string>) => {
      state.guessedLetters.push(action.payload);
    },
    setGameStatus: (state, action: PayloadAction<"playing" | "won" | "lost">) => {
      state.gameStatus = action.payload;
    },
    resetGame: (state) => {
      state.guessedLetters = [];
      state.gameStatus = "playing";
    },
    addToLeaderboard: (state, action: PayloadAction<{ name: string; score: number }>) => {
      state.leaderboard.push(action.payload);
    },
  },
});

export const {
  setWordToGuess,
  addGuessedLetter,
  setGameStatus,
  resetGame,
  addToLeaderboard,
} = gameSlice.actions;
export default gameSlice.reducer;
