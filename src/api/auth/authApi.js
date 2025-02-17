/* eslint-disable no-unused-vars */
import { baseApi } from "../baseApi";
import { setAuthToken } from "./authSlice";

export const authApi = baseApi.injectEndpoints({
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
      transformResponse:(res)=>{
        return res?.data
      },
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthToken(data.data.token));
        } catch (error) {
          dispatch(setAuthToken(null));
        }
      },
    }),
  }),
});

export const { useSignUpUserMutation, useSignInUserMutation } = authApi;
