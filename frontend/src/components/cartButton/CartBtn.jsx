import React, { useEffect, useState } from "react";
import ViewCartIcon from "../../assets/ViewCartIcon.svg";
import styles from "../layout/DefaultLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CartBtn({ inInvoicePage }) {
  const cartItem = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   setCount(cartItem[0].totalQuantity);
  // }, [cartItem]);

  const handleMoveToCartPage = () => {
    const storedCartItems = localStorage.getItem("cartItems");
    const parsed = JSON.parse(storedCartItems);
    if (!storedCartItems) {
      toast.error("No item Present In Cart");
      navigate("/");
    }
    console.log("i m here");
    if (parsed.totalQuantity > 0) {
      navigate("/cart");
    } else {
      toast.error("No item Present In Cart");
      navigate("/");
    }
  };

  return (
    <div className={styles.cart} onClick={handleMoveToCartPage}>
      <div className={styles.cartIconContainer}>
        <img src={ViewCartIcon} alt="View Cart" className={styles.cartIcon} />
      </div>
      <div className={styles.cartText}>View Cart</div>
      {!inInvoicePage && <div className={styles.cartCount}>{count}</div>}
    </div>
  );
}

export default CartBtn;
