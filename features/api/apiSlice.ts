import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
    mode: "cors",
    prepareHeaders: async (headers) => {
      // headers.set(
      //   "authorization",
      //   `Bearer ${
      //     getState().authToken.token ||
      //     localStorage.getItem("access_token") ||
      //     ""
      //   }`
      // );
      headers.set("Content-Type", "application/json");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("accept", "application/json");

      return headers;
    },

    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});
