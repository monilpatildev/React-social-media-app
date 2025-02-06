import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.172:4004/api/v1/",
  }),

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
    }),
    getUser: builder.query({
      query: (userToken) => ({
        url: "/users/get-user-profile",
        headers: {
          Authorization: `${userToken}`,
        },
      }),
    }),
    getPost: builder.query({
      query: (args) => {
        const { pageSize, pageNumber } = args;
        console.log(args);
        
        return {
          url: "posts/get-feed-post?pageSize=5&pageNumber=1",
          params: { pageSize, pageNumber },
        };
      },
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useSignInUserMutation,
  useGetUserQuery,
  useGetPostQuery,
} = api;
