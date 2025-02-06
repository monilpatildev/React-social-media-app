import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: false,
  },
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});
export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;
