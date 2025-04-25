import { apiSlice } from "../api/apiSlice";

export const testimonialSlice = apiSlice?.injectEndpoints({
  endpoints: (builder: any) => ({
    getTestimonial: builder.query({
      query: () => `/parent-reviews`,
    }),
  }),
});

export const { useGetTestimonialQuery } = testimonialSlice;
