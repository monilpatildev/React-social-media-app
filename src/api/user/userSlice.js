import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedUserData: {},
  },
  reducers: {
    setLoggedUserData(state, action) {
      state.loggedUserData = action.payload;
    },
  },
});
export const { setLoggedUserData} = userSlice.actions;
export default userSlice.reducer;
