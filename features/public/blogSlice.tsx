import { apiSlice } from "../api/apiSlice";

export const blogSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getblogs: builder.query({
      query: ({ pagi_limit, query, blog_category_ids }: any) =>
        `/blogs?query=${query}&blog_category_ids=${blog_category_ids}&pagi_limit=${pagi_limit}`,
    }),
  }),
});

export const { useGetblogsQuery } = blogSlice;
