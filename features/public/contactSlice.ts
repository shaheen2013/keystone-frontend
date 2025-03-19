import { apiSlice } from "../api/apiSlice";

export const contactFormSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    contact: builder.mutation({
      query: (data: any) => ({
        method: "POST",
        url: `/contact_form`,
        body: data,
      }),
      transformErrorResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});

export const { useContactMutation } = contactFormSlice;
