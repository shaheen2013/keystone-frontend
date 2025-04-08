import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "counter",
  initialState: null,
  reducers: {
    setOtp: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOtp } = tokenSlice.actions;

export default tokenSlice.reducer;
