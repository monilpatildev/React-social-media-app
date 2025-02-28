
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUserData: null,
  usersList: [] 

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUserData: (state, action) => {
      state.loggedUserData = action.payload;
    },
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
  },
});

export const { setLoggedUserData, setUsersList } = userSlice.actions;
export default userSlice.reducer;
