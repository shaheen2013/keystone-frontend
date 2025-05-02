import { apiSlice } from "../api/apiSlice";

export const authSlice = apiSlice?.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (data: any) => ({
        url: `/login`,
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Me"],
    }),

    register: builder.mutation({
      query: (data: any) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),

    googleRedirectUrl: builder.query({
      query: () => ({
        url: "/google/redirect",
      }),
    }),

    googleCallback: builder.mutation({
      query: (data: any) => ({
        url: "/google/callback",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data: any) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data: any) => ({
        url: "/reset-password/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: any) => ({
        url: `/reset-password`,
        method: "POST",
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data: any) => ({
        url: `/password`,
        method: "PUT",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Me"],
    }),

    me: builder.query({
      query: () => "/user",
      providesTags: ["Me"],
    }),

    updateMe: builder.mutation({
      query: (data: any) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyGoogleRedirectUrlQuery,
  useGoogleCallbackMutation,
  useRegisterMutation,
  useMeQuery,
  useUpdateMeMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useLogoutMutation,
} = authSlice;
