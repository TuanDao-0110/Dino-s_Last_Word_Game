import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { getAllScore, getUserInfo } from "../api/userapi";
import { AppDispatch } from "../app/store";
import { AllScore_Type, Player, PlayerState } from "../types/hangman.model";

const initialState: PlayerState = {
  // players: [],
};

export const PlayerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<Player>) => {
      // state.players.push(action.payload);
      state.players = action.payload;
    },
    setAllScore: (state, action: PayloadAction<AllScore_Type>) => {
      state.allScore = action.payload;
    },
  },
});

export const setPlayerDispatch = (currentUser: User) => {
  return async (dispatch: AppDispatch) => {
    const data = (await getUserInfo(currentUser)) as Player;
    dispatch(setPlayer(data));
  };
};
export const getAllScoreDispatch = () => {
  return async (dispatch: AppDispatch) => {
    const data = (await getAllScore()) as AllScore_Type;
    dispatch(setAllScore(data));
  };
};
export default PlayerSlice.reducer;
export const { setPlayer, setAllScore } = PlayerSlice.actions;
export const selectPlayers = (state: { player: PlayerState }) =>
  state.player.players;
