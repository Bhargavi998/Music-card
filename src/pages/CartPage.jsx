import React, { useState, useEffect } from "react";
import Cart from "../components/cart/Cart";
import Footer from "../components/Footer/Footer";
function CartPage() {
  const [count, setCount] = useState(0);
  const [inCheckout, setInCheckout] = useState(true);
  const [inCartPage, setInCartPage] = useState(true);
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
      <Cart />
      <Footer count={count} inCartPage={inCartPage} />
    </>
  );
}

export default CartPage;
