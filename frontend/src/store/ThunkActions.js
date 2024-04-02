// thunkActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  setLoading,
  setError,
} from "./slices/cartSlice";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      if (!token) return;
      const response = await axios.get("/api/v1/cart/getcart");
      console.log("response cart fetching :", response.data);
      dispatch(addItemToCart(response.data));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, thunkAPI) => {
    try {
      const response = await axios.post("/api/orders", orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
