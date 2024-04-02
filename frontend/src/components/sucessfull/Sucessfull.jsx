import React from "react";
import { Link } from "react-router-dom";
import SucessfullImage from "../../assets/SucessfullImage.svg";
import MusicCartIcon from "../../assets/MusicCartIcon.svg";
import styles from "./Sucessfull.module.css";

function Sucessfull() {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={MusicCartIcon} alt="NotFound" className={styles.logo} />
        <div className={styles.brand}>Musicart</div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div>
            <img src={SucessfullImage} alt="" />
          </div>
          <div className={styles.textContainer}>
            <span className={styles.title}>Order is placed successfully!</span>
            <span className={styles.description}>
              You will be receiving a confirmation email with order details
            </span>
          </div>
          <div className={styles.linkContainer}>
            <Link to="/" className={styles.link}>
              <div className={styles.btn}>Go back to Homepage</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sucessfull;
