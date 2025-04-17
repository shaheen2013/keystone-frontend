import { apiSlice } from "../api/apiSlice";

export const blogSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getblogs: builder.query({
      query: ({ page, pagi_limit, query, blog_category_ids }: any) =>
        `/blogs?query=${query}&page=${page}&blog_category_ids=${blog_category_ids}&pagi_limit=${pagi_limit}`,
    }),

    getblogscategories: builder.query({
      query: () => `/blog-categories`,
    }),
  }),
});

export const { useGetblogsQuery, useGetblogscategoriesQuery } = blogSlice;
