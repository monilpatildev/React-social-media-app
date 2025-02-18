/* eslint-disable no-unused-vars */
import { baseApi } from "../baseApi";
import { setPostLists } from "./postSlice";


export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query({
      query: ({ pageSize, pageNumber }) => ({
        url: `posts/get-feed-post?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      }),
      // forceRefetch({ currentArg, previousArg }) {
      //   return currentArg !== previousArg;
      // }
      providesTags: (result, error, { pageNumber }) =>
        result ? [{ type: "GetPost", id: pageNumber }] : ["GetPost"],
    }),

    getSearchPost: builder.query({
      query: (search) => ({
        url: `posts/get-feed-post?search=${search}`,
      }),
    }),

    createPost: builder.mutation({
      query: (formData) => ({
        url: "/posts/create-post",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["GetPost"],
    }),

    getImage: builder.query({
      query: (id) => ({
        url: `/posts/file/${id}`,
        responseHandler: async (response) => {
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        },
      }),
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetSearchPostQuery,
  useCreatePostMutation,
  useGetImageQuery,
} = postApi;
