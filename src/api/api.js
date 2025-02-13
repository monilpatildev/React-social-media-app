/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthToken } from "../api/auth/authSlice";
import { setLoggedUserData } from "../api/user/userSlice";

export const api = createApi({
  reducerPath: "api",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.172:4004/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["GetLoginUser", "GetPost", "GetAllUsers"],
  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      query: (user) => ({
        url: "/auth/signup",
        method: "POST",
        body: user,
      }),
    }),

    signInUser: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthToken(data.data.token));
        } catch (error) {
          dispatch(setAuthToken(null));
        }
      },
    }),

    getLoggedUser: builder.query({
      query: () => ({
        url: "/users/get-user-profile",
      }),
      providesTags: ["GetLoginUser"],
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoggedUserData(data.data));
        } catch (error) {
          dispatch(setLoggedUserData(null));
        }
      },
    }),

    getPost: builder.query({
      query: ({ pageSize, pageNumber }) => ({
        url: `posts/get-feed-post?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      }),

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result, error, { pageNumber }) =>
        result ? [{ type: "GetPost", id: pageNumber }] : ["GetPost"],
    }),

    getAllUsers: builder.query({
      query: ({ pageSize, pageNumber }) => ({
        url: `users/get-all-users?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      }),

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result, error, { pageNumber }) =>
        result ? [{ type: "GetAllUsers", id: pageNumber }] : ["GetAllUsers"],
    }),

    createPost: builder.mutation({
      query: (formData) => ({
        url: "/posts/create-post",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["GetPost"],
    }),

    editProfile: builder.mutation({
      query: (newUser) => ({
        url: "/users/update-user-profile",
        method: "PATCH",
        body: newUser,
      }),
      invalidatesTags: ["GetLoginUser"],
    }),

    deleteUser: builder.mutation({
      query: () => ({
        url: "/users/delete-users",
        method: "DELETE",
      }),
    }),

    getUser: builder.query({
      query: (userId) => ({
        url: `users/show-user-profile?userId=${userId}`,
      }),
      transformResponse(res) {
        return res?.data;
      },
    }),

    getImage: builder.query({
      query: (id) => ({
        url: `/posts/file/${id}`,
        responseHandler: async (response) => {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          return url;
        },
      }),
    }),

    getSearchPost: builder.query({
      query: (search) => ({
        url: `posts/get-feed-post?search=${search}`,
      }),
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useSignInUserMutation,
  useGetLoggedUserQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useEditProfileMutation,
  useDeleteUserMutation,
  useGetImageQuery,
  useGetUserQuery,
  useGetAllUsersQuery,
  useGetSearchPostQuery
} = api;
