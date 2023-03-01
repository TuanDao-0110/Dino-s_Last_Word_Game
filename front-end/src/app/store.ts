import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import PlayerSlice from "../features/PlayerSlice";
import ScoreSlicer from "../features/ScoreSlicer";

export const store = configureStore({
  reducer: {
    ScoreSlicer,
    PlayerSlice,
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
