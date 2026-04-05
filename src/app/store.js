import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import leaderboardReducer from "../features/leaderboardSlice";

export const store = configureStore({
  reducer: {
     user: userReducer,
    leaderboard: leaderboardReducer,
  },
});