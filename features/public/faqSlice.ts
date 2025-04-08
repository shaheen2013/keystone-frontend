import { apiSlice } from "../api/apiSlice";

export const faqsSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getFaqs: builder.query({
      query: () => "/faq-categories",
    }),
  }),
});

export const { useGetFaqsQuery } = faqsSlice;
