
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUserData: null,
  userIsLoading: false

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUserData: (state, action) => {
      state.loggedUserData = action.payload;
    },
    setUserIsLoading: (state, action) => {
      state.userIsLoading = action.payload;
    },
  },
});

export const { setLoggedUserData, setUserIsLoading } = userSlice.actions;
export default userSlice.reducer;
