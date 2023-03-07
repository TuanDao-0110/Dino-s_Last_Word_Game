import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player, PlayerState } from "../hangman.model";

const initialState: PlayerState = {
  players: [],
};

export const PlayerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players.push(action.payload);
    },
  },
});

export default PlayerSlice.reducer;
export const { addPlayer } = PlayerSlice.actions;
export const selectPlayers = (state: { player: PlayerState }) =>
  state.player.players;
