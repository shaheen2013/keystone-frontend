import { apiSlice } from "../api/apiSlice";

export const whyUsPageSlice = apiSlice?.injectEndpoints({
  endpoints: (builder: any) => ({
    getWhyUsPageContents: builder.query({
      query: () => `/why-us-page`,
    }),
  }),
});

export const { useGetWhyUsPageContentsQuery } = whyUsPageSlice;
