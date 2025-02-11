import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token || "",
    userLoggedIn: !!token,
  },
  reducers: {
    setAuthToken(state, action) {
      state.token = action.payload;
     
    },
    setUserLoggedIn(state, action) {
      state.userLoggedIn = action.payload;
    },
  },
});

export const { setAuthToken, setUserLoggedIn } = authSlice.actions;
export default authSlice.reducer;
