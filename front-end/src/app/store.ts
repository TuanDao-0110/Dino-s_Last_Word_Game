import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import scoreSlicer from "../features/ScoreSlicer";
export const store = configureStore({
  reducer: {
    scoreSlicer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
