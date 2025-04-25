import { apiSlice } from "../api/apiSlice";

export const pricingSlice = apiSlice?.injectEndpoints({
  endpoints: (builder: any) => ({
    getBillingPrices: builder.query({
      query: () => ({
        method: "GET",
        url: `/billing/plans`,
      }),
      transformResponse: (response: any) => {
        const { prices, products, tax_rates } = response;

        const mergedProducts = products.map((product: any) => ({
          ...product,
          price: prices?.find((price: any) => price?.product === product?.id),
        }));

        return { products: mergedProducts, tax_rates };
      },
    }),
  }),
});

export const { useGetBillingPricesQuery } = pricingSlice;
