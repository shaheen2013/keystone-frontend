import { apiSlice } from "../api/apiSlice";

export const abilitySupportsSlice = apiSlice?.injectEndpoints({
  endpoints: (builder: any) => ({
    getAbilitySupports: builder.query({
      query: () => `/ability-supports`,
    }),
  }),
});

export const { useGetAbilitySupportsQuery } = abilitySupportsSlice;
