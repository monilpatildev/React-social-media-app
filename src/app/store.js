import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../api/auth/authSlice";
import userSlice from "../api/user/userSlice";
import postSlice from "../api/post/postSlice";
import followerSlice from "../api/follow/followerSlice";
import { baseApi } from "../api/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    user: userSlice,
    auth: authSlice,
    post: postSlice,
    follower: followerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
