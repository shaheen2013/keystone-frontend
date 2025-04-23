import { apiSlice } from "../api/apiSlice";

export const headerSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getServices: builder.query({
      query: ({ limit }: { limit: number }) => `/services?limit=${limit}`,
    }),
  }),
});

export const { useGetServicesQuery } = headerSlice;
