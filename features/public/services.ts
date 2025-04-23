import { queryFormat } from "@/lib/queryFormat";
import { apiSlice } from "../api/apiSlice";

export const headerSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getServices: builder.query({
      query: (q: any) => `/services?${queryFormat(q)}`,
    }),
  }),
});

export const { useGetServicesQuery } = headerSlice;
