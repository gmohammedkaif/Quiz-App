import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload;
    },
    logout: (state) => {
      state.email = null;
    },
  },
});

// ✅ THIS LINE IS VERY IMPORTANT
export const { setUser, logout } = userSlice.actions;

// ✅ DEFAULT EXPORT
export default userSlice.reducer;