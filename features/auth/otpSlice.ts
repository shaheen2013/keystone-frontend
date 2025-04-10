import { createSlice } from "@reduxjs/toolkit";

export const otpSlice = createSlice({
  name: "otpToken",
  initialState: null,
  reducers: {
    shareOtpToken: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { shareOtpToken } = otpSlice.actions;

export default otpSlice.reducer;
