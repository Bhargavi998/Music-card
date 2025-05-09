import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../header/Header";
import MusicCartIcon from "../../assets/MusicCartIcon.svg";
import styles from "./Cart.module.css";
import CartBtn from "../cartButton/CartBtn";
import { Link, useNavigate } from "react-router-dom";
import MyCartIcon from "../../assets/MyCartIcon.svg";
import axios from "axios";
import DropDownCart from "../../assets/DropDownCart.svg";
import backMobileIcon from "../../assets/backMobileIcon.svg";
const Cart = () => {
  const [itemlist, setItemList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showOption, setShowOption] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const quantityOptions = [...Array(8).keys()].map((num) => num + 1);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      console.log("storedCartItems :", JSON.parse(storedCartItems));
      setTotalPrice(JSON.parse(storedCartItems).totalPrice);
      setItemList(JSON.parse(storedCartItems).items);
    }
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    setShowOption(!showOption);
    console.log("productId :", productId);
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      if (!token) return;
      await axios.put(
        "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/cart/update/",
        {
          productId: productId,
          quantity: newQuantity,
        }
      );

      const response = await axios.get(
        "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/cart/getcart"
      );
      localStorage.setItem("cartItems", JSON.stringify(response.data));
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        console.log("storedCartItems :", JSON.parse(storedCartItems));
        setTotalPrice(JSON.parse(storedCartItems).totalPrice);
        setItemList(JSON.parse(storedCartItems).items);
      }
    } catch (error) {
      alert("problem is here");
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.cartContainer}>
        <div className={`${styles.breadcrumb} ${styles.breadcrumbContainer}`}>
          <div className={styles.musicartInfo}>
            <img src={MusicCartIcon} alt="My Cart Icon" />
            <div className={styles.cartTitle}>Musicart</div>
            <span className={styles.breadcrumbText}>Home / View Cart</span>
          </div>
          <div>
            <CartBtn />
          </div>
        </div>
        <div>
          <Link to="/">
            <button className={styles.backToProductBtn}>
              Back to products
            </button>
          </Link>
        </div>
        <div className={styles.cartIconContainer}>
          <div className={styles.cartIconWrapper}>
            <img src={MyCartIcon} alt="" className={styles.cartIcon} />
            <div className={styles.cartTitle}>My Cart</div>
          </div>
        </div>
        <div className={styles.mainSection}>
          <div className={styles.itemListContainer}>
            <div className={styles.itemList}>
              {itemlist.map((item) => (
                <div
                  key={item._id}
                  className={`${styles.item} ${styles.itemFlex}`}
                >
                  <div className={styles.itemImageContainer}>
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className={styles.itemImage}
                    />
                  </div>
                  <div
                    className={`${styles.productContainer} ${styles.commonClass} `}
                  >
                    <div className={styles.itemName}>
                      {item.product.name}
                      <div
                        className={`${styles.itemStock} ${styles.commonItemClass} `}
                      >
                        <div>
                          <span>Color :</span> {item.product.color}
                        </div>
                        <div>{item.product.availability}</div>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.itemPrice} ${styles.commonClass} `}>
                    <span> Price</span>
                    <div className={styles.commonItemClass}>
                      <span className={styles.price}>
                        ₹{item.product.price}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${styles.quantityContainer} ${styles.commonClass} `}
                  >
                    <label
                      htmlFor={`quantity-${item._id}`}
                      className={styles.quantityLabel}
                    >
                      Quantity
                    </label>
                    <div
                      className={`${styles.dropDownToggle} ${styles.commonItemClass} `}
                      onClick={() => {
                        setShowOption(!showOption);
                        setSelectId(item._id);
                      }}
                    >
                      <span>{item.quantity}</span>
                      <img src={DropDownCart} alt="" />
                    </div>
                    {showOption && selectId === item._id && (
                      <div className={styles.customDropdown}>
                        <div
                          id={`quantity-${item._id}`}
                          className={styles.quantityDropdown}
                          value={item.quantity}
                        >
                          {quantityOptions.map((option) => (
                            <option
                              key={option}
                              value={option}
                              onClick={(e) =>
                                handleQuantityChange(
                                  item.product._id,
                                  parseInt(option)
                                )
                              }
                            >
                              {option}
                            </option>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className={`${styles.totalPrice} ${styles.commonClass} `}
                  >
                    <span>Total</span>{" "}
                    <div className={styles.commonItemClass}>
                      <span className={styles.price}>
                        ₹{item.quantity * item.product.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.totalDetailsContainer}>
              <div className={styles.itemCount}>{itemlist.length} item</div>
              <div className={styles.itemTotalPriceContainer}>
                <div className={styles.itemTotalPrice}>₹{totalPrice}</div>
              </div>
            </div>
          </div>
          <div className={styles.priceDetailsContainer}>
            <div className={styles.priceDetailsTitle}>PRICE DETAILS</div>
            <div className={styles.priceDetails}>
              <span>Total MRP</span>
              <span>₹{totalPrice}</span>
              <span>Discount on MRP</span>
              <span>₹{0}</span>
              <span>Convenience Fee</span>
              <span>₹45</span>
              <span className={styles.totalAmount}>Total Amount</span>
              <span className={styles.totalAmount}>₹{totalPrice + 45}</span>
            </div>
            <Link
              to={{
                pathname: "/checkout",
                state: { totalPrice: totalPrice },
              }}
            >
              <div className={styles.placeOrderButton}>PLACE ORDER</div>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.mobileViewCart}>
        <div className={styles.backBtn}>
          <Link to="/">
            <div className={styles.backIcon}>
              <img src={backMobileIcon} alt="" />
            </div>
          </Link>
        </div>
        <div className={styles.mobileItemList}>
          {itemlist.map((item) => (
            <div key={item._id} className={styles.mobileItem}>
              <div className={styles.mobileItemImageContainer}>
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className={styles.mobileItemImage}
                />
              </div>
              <div className={styles.mobileProductContainer}>
                <span className={styles.mobileProductName}>
                  {item.product.name}
                </span>
                <span className={styles.mobilePrice}>
                  ₹{item.product.price}
                </span>
                <span className={styles.color}>
                  Color :{item.product.color}
                </span>
                <span className={styles.color}>
                  {item.product.availability}
                </span>
                <div className={styles.mobileTotalPrice}>
                  <span className={styles.mobileTotalPriceTitle}>Total:</span>
                  <span className={styles.mobilePrice}>
                    ₹{item.quantity * item.product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.mobileLine}></div>
        <div className={styles.mobilePriceDetailsContainer}>
          <div className={styles.mobilePriceDetails}>
            <span className={styles.mobileTotalAmountTitle}>Total Amount</span>
            <span className={styles.mobileTotalAmount}>₹{totalPrice + 45}</span>
          </div>
          <Link
            to={{
              pathname: "/checkout",
              state: { totalPrice: totalPrice },
            }}
            style={{ textDecoration: "none" }}
          >
            <div className={styles.mobilePlaceOrderButton}>PLACE ORDER</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
