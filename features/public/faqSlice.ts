import { apiSlice } from "../api/apiSlice";

export const faqsSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getFaqs: builder.query({
      query: () => "/faqs",
    }),
  }),
});

export const { useGetFaqsQuery } = faqsSlice;
