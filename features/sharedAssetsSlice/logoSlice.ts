import { createSlice } from "@reduxjs/toolkit";

export const logoSlice = createSlice({
  name: "logo",
  initialState: null,
  reducers: {
    shareLogo: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { shareLogo } = logoSlice.actions;

export default logoSlice.reducer;
