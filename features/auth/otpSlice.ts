import { createSlice } from "@reduxjs/toolkit";

export const otpSlice = createSlice({
  name: "otp",
  initialState: null,
  reducers: {
    shareOtp: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { shareOtp } = otpSlice.actions;

export default otpSlice.reducer;
