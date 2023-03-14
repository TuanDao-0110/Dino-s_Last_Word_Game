import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllWords, getWordByCategory } from "../api/wordapi";
import { AppDispatch } from "../app/store";
import { Categories, Word_Type } from "../types/API.model";
let words: string[] = ["test"];
// getWordByCategory(Category.SPORTS).then((data) => {
//   words = data;
// });

interface GameState {
  randomCategory: Categories;
  category: Categories;
  round: number;
  word?: string[] | { [index: string]: string[] };
  wordToGuess: string;
  guessedLetters: string[];
  gameStatus: "playing" | "won" | "lost";
  score: number;
  leaderboard: { name: string; score: number }[];
  hints: string[];
}

const initialState: GameState = {
  randomCategory: Categories.ANIMALS,
  category: Categories.ALL,
  round: 0,
  wordToGuess: "",
  guessedLetters: [],
  gameStatus: "playing",
  leaderboard: [],
  score: 0,
  hints: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setAllWord: (state, action: PayloadAction<Word_Type>) => {
      state.word = action.payload.result;
    },
    setNextRound: (state) => {
      state.round++;
    },

    setScore: (state, action) => {
      state.score += action.payload;
    },

    setHint: (state, action: PayloadAction<string>) => {
      state.hints.push(action.payload);
    },
    setCategory: (state, action: PayloadAction<Categories>) => {
      state.category = action.payload;
    },
    setRandomCategory: (state, action: PayloadAction<Categories>) => {
      state.randomCategory = action.payload;
    },
    setWordToGuess: (state) => {
      if (!state.word) {
        console.log("set test");
        const index = Math.floor(Math.random() * words.length);
        state.wordToGuess = words[index].toUpperCase();
      } else {
        const { word, randomCategory } = state;
        if (state.category !== Categories.ALL && Array.isArray(word)) {
          console.log("set category");
          const index = Math.floor(Math.random() * word.length);
          state.wordToGuess = word[index].toUpperCase();
        } else if (
          state.category === Categories.ALL &&
          typeof word === "object" &&
          Categories.ANIMALS in word
        ) {
          console.log("get all");
          const index = Math.floor(Math.random() * word[randomCategory].length);
          state.wordToGuess = word[randomCategory][index].toUpperCase();
        }
      }
    },
    addGuessedLetter: (state, action: PayloadAction<string>) => {
      state.guessedLetters.push(action.payload);
    },
    setGameStatus: (
      state,
      action: PayloadAction<"playing" | "won" | "lost">
    ) => {
      state.gameStatus = action.payload;
    },
    resetGame: (state) => {
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
// 2. word get base on category if user
export const getWordDispatch = (category: Categories) => {
  if (category === Categories.ALL) {
    return async (dispatch: AppDispatch) => {
      const data = (await getAllWords()) as Word_Type;
      console.log(data);
      dispatch(setAllWord(data));
    };
  }
  return async (dispatch: AppDispatch) => {
    try {
      const data = (await getWordByCategory(category)) as Word_Type;
      dispatch(setAllWord(data));
    } catch (error) {}
  };
};

export const {
  setWordToGuess,
  addGuessedLetter,
  setGameStatus,
  resetGame,
  addToLeaderboard,
  setNextRound,
  setAllWord,
  setCategory,
  setScore,
  setHint,
  setRandomCategory,
} = gameSlice.actions;
export default gameSlice.reducer;
