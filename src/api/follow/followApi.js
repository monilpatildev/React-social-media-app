import { baseApi } from "../baseApi";

export const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation({
      query: (id) => ({
        url: "/users/follow-user",
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["GetLoginUser", "FollowRequest"],
    }),

    unfollowUser: builder.mutation({
      query: (id) => ({
        url: "/users/unfollow-user",
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["GetLoginUser", "FollowRequest"],
    }),

    getFollowRequest: builder.query({
      query: () => ({
        url: "users/get-follow-requests",
      }),
      transformResponse: (res) => {
        return res?.data;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ["FollowRequest"],
    }),

    acceptFollowRequest: builder.mutation({
      query: (id) => ({
        url: "/users/accept-follow-requests",
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["FollowRequest", "GetLoginUser"],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetFollowRequestQuery,
  useAcceptFollowRequestMutation,
} = followApi;
