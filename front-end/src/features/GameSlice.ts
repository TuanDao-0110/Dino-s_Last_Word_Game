import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllWords, getWordByCategory } from "../api/wordapi";
import { AppDispatch } from "../app/store";
import { Categories, Word_Type } from "../types/API.model";
let words: string[] = ["test"];

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
  showModal: boolean;
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
  showModal: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setAllWord: (state, action: PayloadAction<Word_Type>) => {
      console.log("RESULT", action.payload.result);
      state.word = action.payload.result;
      console.log("state word", state.word);
    },
    setNextRound: (state) => {
      state.round++;
    },
    setScore: (state, action) => {
      state.score += action.payload;
    },

    setModal: (state, action) => {
      console.log("modal set to", action.payload);
      state.showModal = action.payload;
    },
    setHint: (state, action: PayloadAction<string>) => {
      state.hints.push(action.payload);
      state.score--;
    },
    setCategory: (state, action: PayloadAction<Categories>) => {
      state.category = action.payload;
    },
    /* setRandomCategory: (state, action: PayloadAction<Categories>) => {
      state.randomCategory = action.payload;
    }, */
    setWordToGuess: (state) => {
      console.log("setWordToGuess called", state.word);
      if (!state.word) {
        console.log("test");
        const index = Math.floor(Math.random() * words.length);
        state.wordToGuess = words[index].toUpperCase();
      } else {
        const { word, randomCategory } = state;
        // if current category is not ALL and word array exists,
        // set a random word from the word array
        if (state.category !== Categories.ALL && Array.isArray(word)) {
          const index = Math.floor(Math.random() * word.length);
          state.wordToGuess = word[index].toUpperCase();
          console.log("setting word to ", word[index].toUpperCase());
        } else if (
          state.category === Categories.ALL &&
          typeof word === "object" &&
          Categories.ANIMALS in word
        ) {
          // if category is ALL, word array is object and
          console.log("word", word);
          console.log("Categories.ANIMALS", Categories.ANIMALS);
          console.log("in word", Categories.ANIMALS in word);
          const index = Math.floor(Math.random() * word[randomCategory].length);
          state.wordToGuess = word[randomCategory][index].toUpperCase();
          console.log(
            "setting word to ",
            word[randomCategory][index].toUpperCase()
          );
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
      console.log("resetting game");
      // state.guessedLetters = [];
      // state.gameStatus = "playing";

      return {
        ...state,
        guessedLetters: [],
        gameStatus: "playing",
        round: 0,
        score: 0,
      };
    },
    nextGame: (state) => {
      state.guessedLetters = [];
      state.gameStatus = "playing";
      setWordToGuess();
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
  console.log("getWordDispatch category:", category);
  if (category === Categories.ALL) {
    return async (dispatch: AppDispatch) => {
      const data = (await getAllWords()) as Word_Type;
      dispatch(setAllWord(data));
      dispatch(setWordToGuess());
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
  setModal,
  nextGame,
  /* setRandomCategory, */
} = gameSlice.actions;
export default gameSlice.reducer;
