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
    getEventTypes: builder.query({
      query: () => `/event-types`,
    }),
    getJoinedEvents: builder.query({
      query: (q: any) => `/joined-events${queryFormat(q)}`,
    }),
    confirmAttendance: builder.mutation({
      query: ({ slug }: any) => ({
        url: `/joined-events/${slug}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventDetailsQuery,
  useGetEventTypesQuery,
  useConfirmAttendanceMutation,
  useGetJoinedEventsQuery,
} = eventsSlice;
