import React, { useEffect, useState } from "react";
import PhoneIcon from "../../assets/PhoneIcon.svg";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import Searchbar from "../filters/Searchbar";
function Header({ inHomePage }) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");

        if (!token) return;

        if (token) {
          console.log("token :", token, name);
          setIsAuthorized(true);
        } else {
          throw new Error("User not authorized");
        }
      } catch (error) {
        console.error(error);
        // Redirect to login or handle unauthorized access
      }
    };

    fetchUserData();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    setIsAuthorized(false);
    navigate("/login");
  };
  const handleClickLogin = () => {
    navigate("/login");
  };
  const handleClickRegister = () => {
    navigate("/register");
  };
  return (
    <div className={styles.container}>
      <div className={styles.searchbar}>
        <Searchbar />
      </div>
      <div className={styles.headerContainer}>
        <div className={styles.PhoneContainer}>
          <div className={styles.iconContainer}>
            <img
              src={PhoneIcon}
              alt="Phone Icon"
              className={styles.phoneIcon}
            />
          </div>
          <div className={styles.phoneNumber}>
            <span>8688057880</span>
          </div>
        </div>
        <div className={styles.promotion}>
          <span>Get 50% off on selected items</span>
          <span className={styles.separator}></span>
          <span>Shop Now</span>
        </div>

        <div className={styles.links}>
          {!isAuthorized && (
            <ul>
              <li>
                <div className={styles.link} onClick={handleClickLogin}>
                  Login
                </div>
              </li>

              <li>
                <span className={styles.separator}></span>
              </li>

              <li>
                <div className={styles.link} onClick={handleClickRegister}>
                  Signup
                </div>
              </li>
            </ul>
          )}
          {!inHomePage && isAuthorized && (
            <div className={styles.logout} onClick={handleLogout}>
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
