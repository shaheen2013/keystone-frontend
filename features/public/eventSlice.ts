import { queryFormat } from "@/lib/queryFormat";
import { apiSlice } from "../api/apiSlice";

export const eventsSlice = apiSlice?.injectEndpoints({
  endpoints: (builder: any) => ({
    getEvents: builder.query({
      query: (q: any) => `/events${queryFormat(q)}`,
    }),
    getEventDetails: builder.query({
      query: ({ slug }: any) => `/events/${slug}`,
    }),
  }),
});

export const { useGetEventsQuery, useGetEventDetailsQuery } = eventsSlice;
