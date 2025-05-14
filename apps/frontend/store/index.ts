import { configureStore } from "@reduxjs/toolkit";
import getUser from "./slices/saveUser";

export const store = configureStore({
  reducer: {
    getUser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
