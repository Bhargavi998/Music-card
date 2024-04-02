import { createSlice } from "@reduxjs/toolkit";

export const displayOptionsSlice = createSlice({
  name: "displayOptions",
  initialState: {
    displayType: "grid",
  },
  reducers: {
    setDisplayType: (state, action) => {
      state.displayType = action.payload;
    },
  },
});

export const { setDisplayType } = displayOptionsSlice.actions;

export default displayOptionsSlice.reducer;
