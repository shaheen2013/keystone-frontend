import { apiSlice } from "@/features/api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";

import otpSlice from "@/features/auth/otpSlice";
import logoSlice from "@/features/sharedAssetsSlice/logoSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

    // Add other reducers here if needed
    otpToken: otpSlice,
    logoUrl: logoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
