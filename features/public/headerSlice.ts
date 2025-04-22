import { apiSlice } from "../api/apiSlice";

export const headerSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getHeader: builder.query({
      query: () => "/header",
    }),
  }),
});

export const { useGetHeaderQuery } = headerSlice;
