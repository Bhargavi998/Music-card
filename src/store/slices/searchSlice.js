// searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "", // Initial search query is empty
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; // Set search query
    },
    clearSearchQuery: (state) => {
      state.searchQuery = ""; // Clear search query
    },
  },
});

export const { setSearchQuery, clearSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
