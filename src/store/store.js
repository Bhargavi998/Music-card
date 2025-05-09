import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import invoiceReducer from "./slices/orderSlice";
import displayOptionsReducer from "./slices/displayOptionsSlice";
import filterOptionsReducer from "./slices/filterOptionsSlice";
import searchReducer from "./slices/searchSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    order: invoiceReducer,
    displayOptions: displayOptionsReducer,
    filterOptions: filterOptionsReducer,
    search: searchReducer,
  },
});

export default store;
