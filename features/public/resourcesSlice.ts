import { queryFormat } from "@/lib/queryFormat";
import { apiSlice } from "../api/apiSlice";

export const resourcesSlice = apiSlice?.injectEndpoints({
  endpoints: (builder: any) => ({
    getResources: builder.query({
      query: (q: any) => `/resources${queryFormat(q)}`,
    }),
  }),
});

export const { useGetResourcesQuery } = resourcesSlice;
