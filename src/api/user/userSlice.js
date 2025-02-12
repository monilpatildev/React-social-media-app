
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUserData: null,
  newPost: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUserData: (state, action) => {
      state.loggedUserData = action.payload;
    },
    setNewPost: (state, action) => {
      state.newPost = action.payload;
    },
  },
});

export const { setLoggedUserData, setNewPost } = userSlice.actions;
export default userSlice.reducer;
