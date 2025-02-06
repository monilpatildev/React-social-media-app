import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import authSlice from "../api/auth/authSlice";
import userSlice from "../api/user/userSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
