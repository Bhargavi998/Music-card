import React, { useEffect, useState, userRef } from "react";
import axios from "axios";
import styles from "./DefaultLayout.module.css";
import MusicIcon from "../../assets/MusicCartIcon.svg";
import AdvertiseImage from "../../assets/AdvertiseImage.svg";
import CartBtn from "../cartButton/CartBtn";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function DefaultLayout() {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");

        if (!token) throw new Error();

        if (token) {
          setIsAuthorized(true);
          setUser(name);
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleInitialsClick = () => {
    // Toggle state to show/hide options

    setShowOptions(!showOptions);
  };
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.clear();

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.navContainer}>
          <div className={styles.iconContainer}>
            <img src={MusicIcon} alt="MusicCart Icon" className={styles.logo} />
            <h1 className={styles.title}>Musicart</h1>
          </div>
          <ul className={styles.navList}>
            <li className={styles.homeTitle}>Home</li>
            {isAuthorized && (
              <Link to="/invoice" style={{ textDecoration: "none" }}>
                <li>
                  <a href="#invoice" className={styles.navLink}>
                    Invoice
                  </a>
                </li>
              </Link>
            )}
          </ul>
        </div>
        <nav className={styles.nav}>
          {isAuthorized && <CartBtn />}

          {isAuthorized && user && (
            <div className={styles.user}>
              <div className={styles.initials} onClick={handleInitialsClick}>
                {user
                  .split(" ")
                  .map((name) => name.charAt(0))
                  .join("")
                  .toUpperCase()}
              </div>
              {showOptions && (
                <div className={styles.options}>
                  <div className={styles.initialUser}>{user}</div>
                  <div className={styles.line}></div>
                  <div className={styles.logout} onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
      <div className={styles.AdvertiseContainer}>
        <div className={styles.advertisement}>
          <div className={styles.adTextContainer}>
            <p className={styles.adText}>
              Grab upto 50% off on <br /> selected headphones
            </p>
          </div>
          <div className={styles.AdvertiseImageContainer}>
            <img
              src={AdvertiseImage}
              alt="Advertisement"
              className={styles.adImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
