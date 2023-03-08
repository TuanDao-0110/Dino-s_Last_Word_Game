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
      state.wordToGuess = "";
      state.guessedLetters = [];
      state.gameStatus = "playing";
      console.log(state);
    },
    addToLeaderboard: (state, action: PayloadAction<{ name: string; score: number }>) => {
      state.leaderboard.push(action.payload);
    },
  },
});

<<<<<<< HEAD


export const { setWordToGuess, setGuessedLetters, setGameStatus, resetGame, addToLeaderboard } = gameSlice.actions;
=======
export const {
  setWordToGuess,
  addGuessedLetter,
  setGameStatus,
  resetGame,
  addToLeaderboard,
} = gameSlice.actions;
>>>>>>> development
export default gameSlice.reducer;
