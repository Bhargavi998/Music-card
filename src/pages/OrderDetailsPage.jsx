import React, { useState, useEffect } from "react";
import OrderDetails from "../components/invoiceDetails/OrderDetails";
import Footer from "../components/Footer/Footer";
function OrderDetailsPage() {
  const [count, setCount] = useState(0);
  const [inInvoice, setInInvoice] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("cartItems")) {
      const storedCartItems = localStorage.getItem("cartItems");
      const parsed = JSON.parse(storedCartItems);
      console.log("in another");
      setCount(parsed.totalQuantity);
      // dispatch(addItemToCart(parsed));
      console.log("storedCartItems :", JSON.parse(storedCartItems));
    }
  }, [count]);
  return (
    <>
      <OrderDetails />
      <Footer count={count} />
    </>
  );
}

export default OrderDetailsPage;
