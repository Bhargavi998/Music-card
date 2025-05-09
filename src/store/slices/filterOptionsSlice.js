// filterOptionsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFilters: {
    headphonesType: null,
    company: null,
    color: null,
    priceRange: null,
    sortBy: null,
  },
};

const filterOptionsSlice = createSlice({
  name: "filterOptions",
  initialState,
  reducers: {
    updateSelectedFilter: (state, action) => {
      console.log("action :", action);
      const { filterType, value } = action.payload;
      state.selectedFilters[filterType] = value;
    },
  },
});

export const { updateSelectedFilter } = filterOptionsSlice.actions;
export default filterOptionsSlice.reducer;
