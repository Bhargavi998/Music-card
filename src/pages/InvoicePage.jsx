import React, { useState, useEffect } from "react";
import Invoices from "../components/invoice/Invoices";
import Footer from "../components/Footer/Footer";
function InvoicePage() {
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
      <Invoices />
      <Footer count={count} inInvoice={inInvoice} />
    </>
  );
}

export default InvoicePage;
