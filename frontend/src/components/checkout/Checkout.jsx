import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./Checkout.module.css";
import Header from "../header/Header";
import MusicCartIcon from "../../assets/MusicCartIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import DropDownCheckout from "../../assets/DropDownCheckout.svg";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedProductColor, setSelectedProductColor] = useState("");
  const paymentOptions = ["Pay on Delivery", "UPI", "Card"];
  const [totalPrice, setTotalPrice] = useState(0);
  // const { totalprice } = location.state;
  const [showOption, setShowOption] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [userName, setUserName] = useState("");
  const [paymentMode, setPaymentMode] = useState("Mode of payment");
  const [userAddress, setUserAddress] = useState("");
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      console.log("storedCartItems :", JSON.parse(storedCartItems));
      const name = localStorage.getItem("name");
      const parsed = JSON.parse(storedCartItems).items;
      setItemList(JSON.parse(storedCartItems).items);
      setSelectedProductName(parsed[0].product.name);
      setSelectedProductColor(parsed[0].product.color);
      setTotalPrice(JSON.parse(storedCartItems).totalPrice);
      setUserName(name);
    }
  }, []);
  const handleImageDetails = (item) => {
    setSelectedProductName(item.product.name);
    setSelectedProductColor(item.product.color);
  };
  const handleAddressChange = (event) => {
    setUserAddress(event.target.value);
  };
  const handlePlaceOrder = async () => {
    const image = [];
    try {
      itemList.forEach((item) => {
        console.log("item :", item);
        image.push(item.product.images[0]);
      });
      console.log("items in checklist :", itemList);
      console.log("images :", image);

      const orderData = {
        userAddress: userAddress,
        paymentMethod: paymentMode,
        items: itemList,
        totalPrice: totalPrice + 45,
        images: image,
      };
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      if (!token) return;
      const response = await axios.post("/api/v1/order/placeorder", orderData);
      if (response.status === 201) {
        console.log("Order placed successfully");
        localStorage.removeItem("cartItems");
        const deleteResponse = await axios.delete("/api/v1/cart/deletecart");
        navigate("/orderplaced");
        console.log("deleteResponse :", deleteResponse);
        if (deleteResponse === 201) {
          console.log("item deleted from cart after  placing the order");
        }
      } else {
        console.log("response :", response);
        console.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={`${styles.breadcrumb} ${styles.breadcrumbContainer}`}>
          <div className={styles.musicartInfo}>
            <img src={MusicCartIcon} alt="My Cart Icon" />
            <div className={styles.cartTitle}>Musicart</div>
            <span className={styles.breadcrumbText}>Home / Checkout</span>
          </div>
        </div>
        <div>
          <Link to="/" className={styles.backToProductLink}>
            <button className={styles.backToProductBtn}>
              Back to products
            </button>
          </Link>
        </div>
        <div className={styles.mainSection}>
          <div className={styles.titleContainer}>
            <span className={styles.CheckoutTitle}>Checkout</span>
          </div>
          <div className={styles.userDetailsFillingContainer}>
            <div className={styles.usersDetailsFilling}>
              <div className={styles.stepsContainer}>
                <div className={styles.step}>1. Delivery Address</div>
                <div className={styles.deliveryAddress}>
                  <div className={styles.userName}>{userName}</div>
                  <div className={styles.addressDetails}>
                    <textarea
                      name="userAddress"
                      id="userAddress"
                      className={styles.addressInput}
                      value={userAddress}
                      onChange={handleAddressChange}
                      placeholder="Enter your delivery address..."
                    ></textarea>
                  </div>
                </div>
                <div className={styles.line1}></div>
                <div className={styles.line1}></div>
                <div className={styles.step}>2. Payment Method</div>
                <div className={styles.paymentMethods}>
                  <div
                    className={styles.dropContainer}
                    onClick={() => {
                      setShowOption(!showOption);
                    }}
                  >
                    <div>{paymentMode}</div>
                    <img
                      src={DropDownCheckout}
                      alt="Dropdown"
                      className={styles.dropdownIcon}
                    />
                  </div>
                  <div className={styles.paymentContainer}>
                    {showOption && (
                      <div className={styles.paymentOption}>
                        {paymentOptions.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setPaymentMode(option);
                              setShowOption(!showOption);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.line2}></div>
                <div className={styles.line2}></div>
                <div className={styles.step}>3. Review Items and Delivery</div>

                <div className={styles.orderItems}>
                  <div className={styles.itemImageContainer}>
                    {itemList.map((item, index) => (
                      <div key={index} className={styles.item}>
                        <div
                          className={styles.itemImage}
                          onClick={() => handleImageDetails(item)}
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className={styles.itemImage}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.productName}>
                      {selectedProductName}
                    </div>
                    <div className={styles.productColor}>
                      Color: {selectedProductColor}
                    </div>
                    <div className={styles.estimatedDeliveryText}>
                      Estimated Delivery:
                      <br /> Monday — FREE Standard Delivery
                    </div>
                  </div>
                </div>
                <div className={styles.line3}></div>
                <div className={styles.line3}></div>
              </div>
              <div className={styles.placeOrderSection}>
                <div className={styles.palceOrderBtnContainer}>
                  <div
                    className={styles.palceOrderBtn1}
                    onClick={handlePlaceOrder}
                  >
                    Place your order
                  </div>
                </div>
                <div className={styles.orderTotal}>
                  <div className={styles.orderTotalPrice}>
                    Order Total: ₹{totalPrice + 45}
                  </div>
                  <div className={styles.orderText}>
                    By placing your order, you agree to Musicart privacy notice
                    and conditions of use.
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.placeOrderSection2}>
                <div
                  className={styles.palceOrderBtn2}
                  onClick={handlePlaceOrder}
                >
                  Place your order
                </div>

                <div className={styles.orderText2}>
                  <span>
                    By placing your order, you agree to Musicart privacy notice
                    and conditions of use.
                  </span>
                </div>
                <div className={styles.line4}></div>
                <div className={styles.orderSummary}>
                  <div className={styles.orderSummaryText}>Order Summary</div>
                  <div className={styles.summaryDetails}>
                    <span>Items:</span>
                    <span>{totalPrice}</span>
                    <span>Delivery:</span>
                    <span>₹45.00</span>
                  </div>
                  <div className={styles.line4}></div>
                  <div className={styles.orderTotal2}>
                    <span>Order Total:</span>
                    <span>₹{totalPrice + 45}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
