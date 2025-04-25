import { queryFormat } from "@/lib/queryFormat";
import { apiSlice } from "../api/apiSlice";

export const blogSlice = apiSlice?.injectEndpoints({
  endpoints: (builder: any) => ({
    getblogs: builder.query({
      query: (q: any) => `/blogs${queryFormat(q)}`,
    }),

    getblogscategories: builder.query({
      query: () => `/blog-categories`,
    }),
    getblog: builder.query({
      query: ({ slug }: any) => `/blogs/${slug}`,
    }),
    getSavedBlogs: builder.query({
      query: () => `/saved-blogs`,
    }),
    saveToggle: builder.mutation({
      query: ({ blog_slug }: any) => ({
        url: `/saved-blogs/${blog_slug}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetblogsQuery,
  useGetblogscategoriesQuery,
  useGetblogQuery,
  useGetSavedBlogsQuery,
  useSaveToggleMutation,
} = blogSlice;
