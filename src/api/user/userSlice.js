import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedUserData: {},
    postCreated : false
  },
  reducers: {
    setLoggedUserData(state, action) {
      state.loggedUserData = action.payload;
    },
    setPostCreated (state,action){
      state.postCreated = action.payload;

    }
  },
});
export const { setLoggedUserData, setPostCreated } = userSlice.actions;
export default userSlice.reducer;
