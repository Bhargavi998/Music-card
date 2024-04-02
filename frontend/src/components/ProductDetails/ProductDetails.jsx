import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Header from "../header/Header";
import MusicCartIcon from "../../assets/MusicCartIcon.svg";
import CartBtn from "../cartButton/CartBtn";
import Star from "../../assets/Star.svg";
import styles from "./ProductDetails.module.css";
import { Link, useNavigate } from "react-router-dom";
import ImageCarousel from "../imageCarousel/ImageCarousel";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../store/slices/cartSlice";
const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inDetailsPage, setInDetailsPage] = useState(true);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");

        if (!token) throw new Error();

        if (token) {
          setIsAuthorized(true);
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    const fetchProductDetails = async () => {
      console.log("i m reached here");
      try {
        const response = await axios.get(`/api/v1/product/${productId}`);
        if (localStorage.getItem("cartItems")) {
          const storedCartItems = localStorage.getItem("cartItems");
          const parsed = JSON.parse(storedCartItems);
          setCount(parsed.totalQuantity);
          dispatch(addItemToCart(parsed));
          console.log("storedCartItems :", JSON.parse(storedCartItems));
        }

        setProduct(response.data.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProductDetails();
  }, [count]);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  if (!product) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }
  const renderStarRating = () => {
    const stars = [];
    for (let i = 0; i < product.starRating; i++) {
      stars.push(<img key={i} src={Star} alt="Star Icon" />);
    }
    return stars;
  };
  const handleCartProduct = async (productId) => {
    if (!isAuthorized) {
      navigate("/login");
    }
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const requestData = {
        productId: productId,
        quantity: 1,
      };
      if (!token) {
        return;
      }
      await axios.post("/api/v1/cart/addcart", requestData);
      const response = await axios.get("/api/v1/cart/getcart");
      localStorage.setItem("cartItems", JSON.stringify(response.data));
      setCount(response.data.totalQuantity);
      console.log("response.data :", response.data);
      dispatch(addItemToCart(response.data));

      alert("cart addedsucessfully");
    } catch (error) {
      alert("please register or login before adding to cart");
    }
  };
  const handleBuyNow = () => {
    if (!isAuthorized) {
      navigate("/login");
    }
  };
  const handleMoveToCartPage = () => {
    const storedCartItems = localStorage.getItem("cartItems");
    const parsed = JSON.parse(storedCartItems);

    if (parsed.totalQuantity > 0) {
      navigate("/cart");
    } else {
      toast.error("No item Present In Cart");
      navigate("/");
    }
  };
  return (
    <div>
      <Header inDetailsPage={inDetailsPage} />
      <div className={styles.productDetailsContainer}>
        <div className={`${styles.breadcrumb} ${styles.breadcrumbContainer}`}>
          <div className={styles.musicartInfo}>
            <img src={MusicCartIcon} alt="Music Cart Icon" />
            <div>Musicart</div>
            <span>Home / {product.name}</span>
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
        <div className={styles.summary}>
          <p>{product.summary}</p>
        </div>
        <div
          className={`${styles.productContainer} ${styles.productContainer}`}
        >
          <div>
            {" "}
            <ImageCarousel images={product.images} />
          </div>
          <div className={`${styles.productDetails} ${styles.productDetails}`}>
            <div className={styles.name}> {product.name}</div>
            <div className={`${styles.rating} ${styles.ratingContainer}`}>
              {renderStarRating()}
              <span>({product.numberOfReviews} Customer reviews)</span>
            </div>
            <div className={styles.price}>Price: ₹ {product.price}</div>
            <span>
              {product.color} | {product.headphoneType}
            </span>
            <div className={styles.aboutItem}>
              <h3>About this item</h3>
              <ul>
                {product.about.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.availability}>
              Available -{" "}
              <span className={styles.stock}>{product.availability}</span>
            </div>
            <div className={styles.brand}>
              Brand - <span>{product.brand}</span>
            </div>
            <div>
              <div className={styles.btn}>
                <div
                  className={styles.addToCartBtn}
                  onClick={() => handleCartProduct(product._id)}
                >
                  Add To Cart
                </div>
                <Link to="/cart" style={{ textDecoration: "none" }}>
                  <div className={styles.buyNowBtn} onClick={handleBuyNow}>
                    Buy Now
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
