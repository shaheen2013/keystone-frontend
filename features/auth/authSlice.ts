import { apiSlice } from "../api/apiSlice";

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    // register: builder.mutation({
    //   query: (data: any) => ({
    //     url: `/register`,
    //     method: "POST",
    //     body: data,
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["getUserData"],
    // }),
    // login: builder.mutation({
    //   query: (data: any) => ({
    //     url: `/login`,
    //     method: "POST",
    //     body: data,
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["getUserData"],
    // }),
    // loginSocial: builder.mutation({
    //   query: ({ source, method }: any) => ({
    //     url: `/auth/url?source=${source}&method=${method}`,
    //     method: "GET",
    //   }),
    //   invalidatesTags: ["getUserData"],
    // }),
    // forgotPassword: builder.mutation({
    //   query: (data: any) => ({
    //     url: `/forgot_password`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    // emailConfirmed: builder.query({
    //   query: (data: any) => ({
    //     url: `/email_confirmation`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // onboarding: builder.mutation({
    //   query: (data: any) => ({
    //     url: `/onboarding`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
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
  // useEmailConfirmedQuery,
  // useRegisterMutation,
  // useLoginMutation,

  // useOnboardingMutation,
  useLoginMutation,
  useLazyGoogleRedirectUrlQuery,
  useGoogleCallbackMutation,
  useRegisterMutation,
  useMeQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useLogoutMutation,
} = authSlice;
