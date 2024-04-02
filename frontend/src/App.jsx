import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import store from "./store/store";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SucessfullPage from "./pages/SucessfullPage";
import InvoicePage from "./pages/InvoicePage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Header component can be placed here */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/productDetails/:productId"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orderplaced" element={<SucessfullPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/orderDetails/:orderId" element={<OrderDetailsPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  );
}

export default App;
