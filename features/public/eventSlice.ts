import { queryFormat } from "@/lib/queryFormat";
import { apiSlice } from "../api/apiSlice";

export const eventsSlice = apiSlice?.injectEndpoints({
  endpoints: (builder: any) => ({
    getEvents: builder.query({
      query: (q: any) => `/events${queryFormat(q)}`,
    }),
  }),
});

export const { useGetEventsQuery } = eventsSlice;
