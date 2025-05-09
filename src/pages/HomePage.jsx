import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer";
import FilterOptions from "../components/filters/FilterOptions";
import Product from "../components/product/Product";
import DefaultLayout from "../components/layout/DefaultLayout";
import styles from "./HomePage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../store/slices/cartSlice";
import axios from "axios";
import Feedback from "../components/Feedback/Feedback";
function HomePage() {
  const dispatch = useDispatch();
  const [inHomePage, setInHomePage] = useState(true);
  const [count, setCount] = useState(0);
  const handleCartProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      if (!token) return;

      const response = await axios.get(
        "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/cart/getcart"
      );
      if (response.data.message === "Cart not found") {
        setCount(0);
        return;
      }
      console.log("response :", response);
      console.log("response.data.length: ", response.data.length);
      setCount(response.data.totalQuantity);
      if (response.status === 200 && response.data.items.length > 0) {
        localStorage.setItem("cartItems", JSON.stringify(response.data));
        setCount(response.data.totalQuantity);

        if (localStorage.getItem("cartItems")) {
          const storedCartItems = localStorage.getItem("cartItems");
          const parsed = JSON.parse(storedCartItems);
          console.log("in another");
          setCount(parsed.totalQuantity);
          // dispatch(addItemToCart(parsed));
          console.log("storedCartItems :", JSON.parse(storedCartItems));
        }
      } else {
      }
    } catch (error) {
      alert(error.message);
    }
  };

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
  const updateCount = (newCount) => {
    setCount(newCount);
  };

  useEffect(() => {
    handleCartProduct();
  }, [count]);
  return (
    <div className={styles.homePage}>
      <Header inHomePage={inHomePage} />
      <div className={styles.content}>
        <Product count={count} updateCount={updateCount} />
      </div>
      <div style={{ marginTop: "40px" }}>
        <Footer count={count} inHomePage={inHomePage} />
      </div>
      <Feedback />
    </div>
  );
}

export default HomePage;
