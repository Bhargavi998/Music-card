// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (filters) => {
    let url =
      "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/product/all"; // Initial URL assignment
    console.log("filters :", filters);
    const nonNullFilters = Object.entries(filters)
      .filter(([_, value]) => value !== null)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    if (nonNullFilters) {
      url =
        "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/product/filter"; // Overwrite URL if non-null filters are present
      url += `?${nonNullFilters}`;
    }

    try {
      console.log("Url :", url);
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (searchQuery) => {
    console.log("searchQuery I'm here ", searchQuery);
    const url = `https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/product/search?productName=${searchQuery}`; // Update query parameter to match API endpoint
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error("Failed to search products");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
