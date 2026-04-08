import { createSlice } from "@reduxjs/toolkit";


const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("leaderboard");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (users) => {
  localStorage.setItem("leaderboard", JSON.stringify(users));
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    users: loadFromLocalStorage(), 
  },

  reducers: {
    addUserScore: (state, action) => {
      const newUser = action.payload;

      state.users.push(newUser);

      saveToLocalStorage(state.users);
    },
  },
});

export const { addUserScore } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;