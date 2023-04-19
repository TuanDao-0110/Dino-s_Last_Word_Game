import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllWords, getWordByCategory } from "../api/wordapi";
import { AppDispatch } from "../app/store";
import { Categories, GameStatus, Word_Type } from "../types/API.model";

let words: string[] = ["test"];

interface GameState {
  randomCategory?: Categories;
  category: Categories;
  round: number;
  word?: string[] | { [index: string]: string[] };
  wordToGuess: string;
  guessedLetters: string[];
  gameStatus: GameStatus;
  score: number;
  leaderboard: { name: string; score: number }[];
  hints: string[];
  showModal: boolean;
  showLogin: boolean;
  showWord: boolean;
}

const initialState: GameState = {
  category: Categories.ALL,
  round: 0,
  wordToGuess: "",
  guessedLetters: [],
  gameStatus: GameStatus.playing,
  leaderboard: [],
  score: 0,
  hints: [],
  showModal: false,
  showLogin: false,
  showWord: false,
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

    setModal: (state, action) => {
      state.showModal = action.payload;
    },
    setShowWord: (state, action) => {
      state.showWord = action.payload;
    },

    setLogin: (state, action) => {
      state.showLogin = action.payload;
    },

    setHint: (state, action: PayloadAction<string>) => {
      state.hints.push(action.payload);
      state.score--;
    },
    setCategory: (state, action: PayloadAction<Categories>) => {
      state.category = action.payload;
    },
    setWordToGuess: (state) => {
      if (!state.word) {
        const index = Math.floor(Math.random() * words.length);
        state.wordToGuess = words[index].toUpperCase();
      } else {
        const { word } = state;
        // if current category is not ALL and word array exists,
        // set a random word from the word array
        if (state.category !== Categories.ALL && Array.isArray(word)) {
          const index = Math.floor(Math.random() * word.length);
          state.wordToGuess = word[index].toUpperCase();
        } else if (
          state.category === Categories.ALL &&
          typeof word === "object" &&
          Categories.ANIMALS in word
        ) {
          // if category is ALL, word array is object and
          const categoriesArray = Object.values(Categories).filter(
            (category) => category !== Categories.ALL
          );
          const randomIndex = Math.floor(
            Math.random() * categoriesArray.length
          );
          const index = Math.floor(
            Math.random() * word[categoriesArray[randomIndex]].length
          );
          state.wordToGuess =
            word[categoriesArray[randomIndex]][index].toUpperCase();
        }
      }
    },
    addGuessedLetter: (state, action: PayloadAction<string>) => {
      state.guessedLetters.push(action.payload);
    },
    setGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.gameStatus = action.payload;
    },
    resetGame: (state) => {
      return {
        ...state,
        guessedLetters: [],
        gameStatus: GameStatus.playing,
        round: 0,
        score: 0,
      };
    },
    nextGame: (state) => {
      state.guessedLetters = [];
      state.gameStatus = GameStatus.playing;
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
  if (category === Categories.ALL) {
    return async (dispatch: AppDispatch) => {
      const data = (await getAllWords()) as Word_Type;
      dispatch(setAllWord(data));
      /* console.log("setWordToGuess getWordDispatch GameSlice"); */
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
  setLogin,
  setShowWord,
  nextGame,
} = gameSlice.actions;
export default gameSlice.reducer;
