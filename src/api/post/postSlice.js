import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  searchPosts: null,
  newPost: null,
  searchText: "",
  searchPostsLoading: false,
};

const postSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearchPosts: (state, action) => {
      state.searchPosts = action.payload;
    },
    setNewPost: (state, action) => {
      state.newPost = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSearchTextLoading: (state, action) => {
      state.searchPostsLoading = action.payload;
    },
  },
});

export const {
  setSearchPosts,
  setNewPost,
  setSearchText,
  setSearchTextLoading,
} = postSlice.actions;
export default postSlice.reducer;
