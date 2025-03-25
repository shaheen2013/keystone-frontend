import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
    mode: "cors",
    // prepareHeaders: (headers, { getState }) => {
    //     // headers.set('authorization', `Bearer ${getState().authToken.token || localStorage.getItem('access_token')}`);
    //     headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);
    //     return headers
    // },
    credentials: "include",
  }),
  tagTypes: ["getUserData"],
  endpoints: () => ({}),
});
