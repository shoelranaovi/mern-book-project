import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SigninSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { SigninSuccess } = userSlice.actions;
export default userSlice.reducer;
