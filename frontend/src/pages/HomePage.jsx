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
  const handleCartProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      if (!token) return;

      const response = await axios.get("/api/v1/cart/getcart");
      console.log("response :", response);
      if (response.data && response.data.length > 0) {
        localStorage.setItem("cartItems", JSON.stringify(response.data));
        dispatch(addItemToCart(response.data));
      } else {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    handleCartProduct();
  }, [dispatch]);
  return (
    <div className={styles.homePage}>
      <Header inHomePage={inHomePage} />
      <div className={styles.content}>
        <Product />
      </div>
      <div style={{ marginTop: "40px" }}>
        <Footer />
      </div>
      <Feedback />
    </div>
  );
}

export default HomePage;
