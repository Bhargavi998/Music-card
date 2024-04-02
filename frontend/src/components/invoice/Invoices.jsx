// Invoices.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Invoice.module.css";
import CartBtn from "../cartButton/CartBtn";
import Header from "../header/Header";
import MusicCartIcon from "../../assets/MusicCartIcon.svg";
import ViewInvoiceIcon from "../../assets/ViewInvoiceIcon.svg";
import axios from "axios";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      if (!token) return;
      const response = await axios.get("/api/v1/order/getorder");
      console.log("invoice response :", response.data);
      setUserName(localStorage.getItem("name"));
      setInvoices(response.data);
      setOrderList(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.invoicePage}>
        <div className={`${styles.breadcrumb} ${styles.breadcrumbContainer}`}>
          <div className={styles.musicartInfo}>
            <img src={MusicCartIcon} alt="My Cart Icon" />
            <div className={styles.cartTitle}>Musicart</div>
            <span className={styles.breadcrumbText}>Home / View Cart</span>
          </div>
          <div>
            <CartBtn inInvoicePage={true} />
          </div>
        </div>
        <div>
          <Link to="/" className={styles.backToProductLink}>
            <button className={styles.backToProductBtn}>Back to Home</button>
          </Link>
        </div>
        <div>
          <div className={styles.titleText}>My Invoices</div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {invoices.map((invoice) => (
                <div key={invoice._id} className={styles.invoiceItem}>
                  <div className={styles.invoiceInfo}>
                    <div className={styles.invoiceIcon}>
                      <img src={ViewInvoiceIcon} alt="ViewInvoiceIcon" />
                    </div>
                    <div className={styles.userInfo}>
                      <div className={styles.userName}>{userName}</div>
                      <div className={styles.userAddress}>
                        {invoice.userAddress}
                      </div>
                    </div>
                  </div>
                  <Link to={`/orderDetails/${invoice._id}`}>
                    <div className={styles.viewInvoiceBtn}>View Invoice</div>
                  </Link>
                </div>
              ))}
              {invoices.length === 0 && (
                <div className={styles.noInvoices}>No invoices found.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoices;
