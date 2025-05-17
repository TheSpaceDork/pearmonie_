import { configureStore } from "@reduxjs/toolkit";
import getUser from "./slices/saveUser";
import getRecommendations from "./slices/saveRecommendations";

export const store = configureStore({
  reducer: {
    getUser,
    getRecommendations,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
