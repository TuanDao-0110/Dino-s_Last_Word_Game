import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Player {
  name: string;
  email: string;
  score: number;
}

interface PlayerState {
  players: Player[];
}

const initialState: PlayerState = {
  players: [],
};

export const PlayerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Player>) => {
      state.players.push(action.payload);
    },
  },
});

export default PlayerSlice.reducer;
export const { addUser } = PlayerSlice.actions;
