import { queryFormat } from "@/lib/queryFormat";
import { apiSlice } from "../api/apiSlice";

export const headerSlice = apiSlice?.injectEndpoints({
  endpoints: (builder: any) => ({
    getServices: builder.query({
      query: (q: any) => `/services${queryFormat(q)}`,
    }),
    getServiceDetails: builder.query({
      query: ({ slug }: any) => `/services/${slug}`,
    }),
  }),
});

export const { useGetServicesQuery, useGetServiceDetailsQuery } = headerSlice;
