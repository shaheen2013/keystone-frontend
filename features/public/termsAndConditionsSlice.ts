import { apiSlice } from "../api/apiSlice";

export const termsAndConditionsSlice = apiSlice?.injectEndpoints({
  endpoints: (builder: any) => ({
    getTermsAndConditions: builder.query({
      query: () => `/pages/terms-conditions`,
    }),
  }),
});

export const { useGetTermsAndConditionsQuery } = termsAndConditionsSlice;
