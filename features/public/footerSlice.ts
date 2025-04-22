import { apiSlice } from "../api/apiSlice";

export const faqsSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getFooter: builder.query({
      query: () => "/footer",
    }),
    subscribe: builder.mutation({
      query: (data: any) => ({
        url: "/subscribe",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetFooterQuery, useSubscribeMutation } = faqsSlice;
