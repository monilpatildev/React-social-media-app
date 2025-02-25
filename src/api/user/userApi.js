/* eslint-disable no-unused-vars */
import { baseApi } from "../baseApi";
import { setLoggedUserData } from "../../api/user/userSlice";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

    getAllUsers: builder.query({
      query: ({ pageSize, pageNumber, searchText }) => ({
        url: `users/get-all-users?searchText=${searchText}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
      }),
      providesTags: ["GetAllUsers"],
    }),
  }),
});

export const {
  useGetLoggedUserQuery,
  useEditProfileMutation,
  useDeleteUserMutation,
  useGetUserQuery,
  useGetAllUsersQuery,
} = userApi;
