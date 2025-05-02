import { apiSlice } from "../api/apiSlice";

export const parentGuidesSlice = apiSlice?.injectEndpoints({
  endpoints: (builder: any) => ({
    getParentGuidesContents: builder.query({
      query: () => `/parent-guides-page`,
    }),
  }),
});

export const { useGetParentGuidesContentsQuery } = parentGuidesSlice;
