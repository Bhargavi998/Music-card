import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./OrderDetails.module.css";
import Header from "../header/Header";
import MusicCartIcon from "../../assets/MusicCartIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import DropDownCheckout from "../../assets/DropDownCheckout.svg";
import { useLocation } from "react-router-dom";
import backMobileIcon from "../../assets/backMobileIcon.svg";
function OrderDetails() {
  const navigate = useNavigate();
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedProductColor, setSelectedProductColor] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [userName, setUserName] = useState("");
  const [paymentMode, setPaymentMode] = useState("Mode of payment");
  const [userAddress, setUserAddress] = useState("");
  const { orderId } = useParams();
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(
          `https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/order/${orderId}`
        );
        console.log("response order:", response.data.data);
        const fetchedResponse = response.data.data;
        setItemList(fetchedResponse.items);
        setSelectedProductName(fetchedResponse.items[0].product.name);
        setSelectedProductColor(fetchedResponse.items[0].product.color);
        setUserAddress(fetchedResponse.userAddress);
        setTotalPrice(fetchedResponse.totalPrice);
        setPaymentMode(fetchedResponse.paymentMethod);
        setImages(fetchedResponse.image);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchOrderDetails();
  }, []);
  const handleImageDetails = (item) => {
    setSelectedProductColor(item.product.color);
    setSelectedProductName(item.product.name);
  };
  return (
    <div>
      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.container}>
        <Link to="/invoice">
          <div className={styles.backIcon}>
            <img src={backMobileIcon} alt="" />
          </div>
        </Link>
        <div className={`${styles.breadcrumb} ${styles.breadcrumbContainer}`}>
          <div className={styles.musicartInfo}>
            <img src={MusicCartIcon} alt="My Cart Icon" />
            <div className={styles.cartTitle}>Musicart</div>
            <span className={styles.breadcrumbText}>Home / Invoices</span>
          </div>
        </div>
        <div>
          <Link to="/invoice" className={styles.backToProductLink}>
            <button className={styles.backToProductBtn}>Back to Invoice</button>
          </Link>
        </div>
        <div className={styles.mainSection}>
          <div className={styles.titleContainer}>
            <span className={styles.CheckoutTitle}>Invoices</span>
          </div>
          <div className={styles.userDetailsFillingContainer}>
            <div className={styles.usersDetailsFilling}>
              <div className={styles.stepsContainer}>
                <div className={styles.step}>1. Delivery Address</div>
                <div className={styles.deliveryAddress}>
                  <div className={styles.userName}>{userName}</div>
                  <div className={styles.addressDetails}>{userAddress}</div>
                </div>
                <div className={styles.line1}></div>
                <div className={styles.line1}></div>
                <div className={styles.line5}></div>
                <div className={styles.step}>2. Payment Method</div>
                <div className={styles.paymentMethods}>
                  <div className={styles.dropContainer}>
                    <div>{paymentMode}</div>
                  </div>
                </div>
                <div className={styles.line2}></div>
                <div className={styles.line2}></div>
                <div className={styles.line6}></div>
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
            </div>
            <div>
              <div className={styles.line6}></div>
              <div className={styles.placeOrderSection2}>
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
            <div className={styles.placeOrderSectionMobile}>
              <div className={styles.palceOrderBtnContainer}>
                <div className={styles.orderTotal}>
                  <div className={styles.orderTotalTitle}>Order Total: </div>
                  <div className={styles.orderTotalvalue}>
                    ₹{totalPrice + 45}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderDetails;
