import { apiSlice } from "../api/apiSlice";
import { shareLogo } from "../sharedAssetsSlice/logoSlice";

export const headerSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getHeader: builder.query({
      query: () => "/header",
      async onQueryStarted(_arg: any, { dispatch, queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;
          if (data.data.website_logo) {
            dispatch(shareLogo(data.data.website_logo));
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetHeaderQuery } = headerSlice;
