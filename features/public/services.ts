import { apiSlice } from "../api/apiSlice";

export const headerSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getServices: builder.query({
      query: () => `/services?limit=5`,
    }),
  }),
});

export const { useGetServicesQuery } = headerSlice;
