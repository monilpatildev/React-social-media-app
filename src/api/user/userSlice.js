
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUserData: null,
  userIsLoading: false,
  usersList: [] 

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
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
  },
});

export const { setLoggedUserData, setUserIsLoading, setUsersList } = userSlice.actions;
export default userSlice.reducer;
