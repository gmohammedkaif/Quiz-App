import { createSlice } from "@reduxjs/toolkit";

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    users: [],
  },
  reducers: {
    addUserScore: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { addUserScore } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;