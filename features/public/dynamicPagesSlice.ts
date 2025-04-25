import { apiSlice } from "../api/apiSlice";

export const dynamicPageSlice = apiSlice?.injectEndpoints({
  endpoints: (builder: any) => ({
    getDynamicPageContent: builder.query({
      query: ({ slug }: { slug: string }) => `/pages/${slug}`,
    }),
  }),
});

export const { useGetDynamicPageContentQuery } = dynamicPageSlice;
