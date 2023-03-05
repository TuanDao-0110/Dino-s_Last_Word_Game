import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import gameSlice from "../features/GameSlice";

export const store = configureStore({
  reducer: {
    game: gameSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
