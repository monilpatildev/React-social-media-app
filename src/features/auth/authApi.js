import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
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
      transformResponse: (res) => {
        return res?.data
      },
    }),
  }),
});

export const { useSignUpUserMutation } = authApi;
