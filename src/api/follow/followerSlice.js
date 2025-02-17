import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followers: [],
  following: [],
};

const followerSlice = createSlice({
  name: "follower",
  initialState,
  reducers: {
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    setFollowing: (state, action) => {
      state.followers = action.payload;
    },
  },
});

export const { setFollowers, setFollowing } = followerSlice.actions;
export default followerSlice.reducer;
