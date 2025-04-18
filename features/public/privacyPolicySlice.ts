import { apiSlice } from "../api/apiSlice";

export const privacyPolicySlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getPrivacyPolicy: builder.query({
      query: () => `/pages/privacy-policy`,
    }),
  }),
});

export const { useGetPrivacyPolicyQuery } = privacyPolicySlice;
