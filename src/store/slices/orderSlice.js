// orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    items: [],
    shippingAddress: "",
    paymentMethod: "",
    // Other order details
  },
  reducers: {
    addItemToOrder(state, action) {
      state.items.push(action.payload);
    },
    removeItemFromOrder(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateShippingAddress(state, action) {
      state.shippingAddress = action.payload;
    },
    updatePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
    },
  },
});

export const {
  addItemToOrder,
  removeItemFromOrder,
  updateShippingAddress,
  updatePaymentMethod,
} = orderSlice.actions;
export default orderSlice.reducer;
