import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import gameSlice from "../features/GameSlice";
import playerSlice from "../features/PlayerSlice";

export const store = configureStore({
  reducer: {
    game: gameSlice,
    player: playerSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
