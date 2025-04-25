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
    }),

    register: builder.mutation({
      query: (data: any) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
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
    }),

    me: builder.query({
      query: () => "/user",
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyGoogleRedirectUrlQuery,
  useGoogleCallbackMutation,
  useRegisterMutation,
  useMeQuery,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useLogoutMutation,
} = authSlice;
