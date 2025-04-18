import { apiSlice } from "../api/apiSlice";

export const blogSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getblogs: builder.query({
      query: ({ page, pagi_limit, query, blog_category_ids }: any) => {
        const params = new URLSearchParams();

        if (query) params.append("query", query);
        params.append("page", String(page));
        params.append("pagi_limit", String(pagi_limit));

        // Append array indices for blog_category_ids
        if (blog_category_ids?.length) {
          blog_category_ids.forEach((id: number, index: number) => {
            params.append(`blog_category_ids[${index}]`, String(id));
          });
        }

        return `/blogs?${params.toString()}`;
      },
    }),

    getblogscategories: builder.query({
      query: () => `/blog-categories`,
    }),
    getblog: builder.query({
      query: ({ slug }: any) => `/blogs/${slug}`,
    }),
  }),
});

export const { useGetblogsQuery, useGetblogscategoriesQuery, useGetblogQuery } =
  blogSlice;
