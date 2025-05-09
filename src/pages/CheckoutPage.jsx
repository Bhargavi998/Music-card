import React, { useState, useEffect } from "react";
import Checkout from "../components/checkout/Checkout";
import Footer from "../components/Footer/Footer";
function CheckoutPage() {
  const [count, setCount] = useState(0);
  const [inCheckout, setInCheckout] = useState(true);
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
      <Checkout />
      <Footer count={count} inCheckout={inCheckout} />
    </>
  );
}

export default CheckoutPage;
