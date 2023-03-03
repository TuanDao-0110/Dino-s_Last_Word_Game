import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import words from "../wordList.json";

interface GameState {
  wordToGuess: string;
  letter: string;
  guessedLetters: string[];
  incorrectLetters: string[];
  gameStatus: "playing" | "won" | "lost";
  leaderboard: { name: string; score: number }[];
}

const initialState: GameState = {
  wordToGuess: "",
  letter: "",
  guessedLetters: [],
  incorrectLetters: [],
  gameStatus: "playing",
  leaderboard: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setWordToGuess: (state) => {
      const index = Math.floor(Math.random() * words.length);
      state.wordToGuess = words[index].toUpperCase();
    },
    setGuessedLetters: (state, action: PayloadAction<string>) => {
      state.guessedLetters.push(action.payload);
    },
    setIncorrectLetters(state) {
      state.incorrectLetters = state.guessedLetters.filter(
        (letter) => !state.wordToGuess.includes(letter)
      );
    },

    setGameStatus: (
      state,
      action: PayloadAction<"playing" | "won" | "lost">
    ) => {
      state.gameStatus = action.payload;
    },
    resetGame: (state) => {
      state.wordToGuess = "";
      state.guessedLetters = [];
      state.gameStatus = "playing";
    },
    addToLeaderboard: (
      state,
      action: PayloadAction<{ name: string; score: number }>
    ) => {
      state.leaderboard.push(action.payload);
    },
  },
});

export const {
  setWordToGuess,
  setGuessedLetters,
  setGameStatus,
  resetGame,
  addToLeaderboard,
  setIncorrectLetters,
} = gameSlice.actions;
export default gameSlice.reducer;
