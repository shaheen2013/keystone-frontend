import { apiSlice } from "../api/apiSlice";

export const homePageSlice = apiSlice?.injectEndpoints({
  endpoints: (builder: any) => ({
    getHomePageContents: builder.query({
      query: () => `/homepage`,
    }),
  }),
});

export const { useGetHomePageContentsQuery } = homePageSlice;
