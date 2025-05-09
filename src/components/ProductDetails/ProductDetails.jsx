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
import Footer from "../../components/Footer/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backMobileIcon from "../../assets/backMobileIcon.svg";
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
      try {
        const response = await axios.get(
          `https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/product/${productId}`
        );
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
      stars.push(
        <img key={i} src={Star} className={styles.starImage} alt="Star Icon" />
      );
    }
    return stars;
  };
  const handleCartProduct = async (productId) => {
    if (!isAuthorized) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const requestData = {
        productId: productId,
        quantity: 1, // Initial quantity is set to 1
      };

      // Fetch the current cart items to check if the product is already in the cart
      const response = await axios.get(
        "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/cart/getcart"
      );
      const cartItems = response.data.items;
      console.log("cartItems in here :", cartItems);
      const existingCartItem = cartItems.find(
        (item) => item.product._id === productId
      );
      console.log("existingCartItem :", existingCartItem);
      if (existingCartItem.quantity >= 8) {
        // If the product is already in the cart, update its quantity
        toast.error("cannot add more than 8 item");
        return;
      }

      await axios.post(
        "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/cart/addcart",
        requestData
      );
      const updatedResponse = await axios.get(
        "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/cart/getcart"
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedResponse.data));
      setCount(updatedResponse.data.totalQuantity);
      console.log("response.data :", response.data);
      dispatch(addItemToCart(updatedResponse.data));
      toast.success("Item added to cart successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleBuyNow = async (id) => {
    if (!isAuthorized) {
      navigate("/login");
      return;
    }
    try {
      if (count !== 0) {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const requestData = {
          productId: id,
          quantity: 1,
        };

        // Check if the item is already in the cart
        const response = await axios.get(
          "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/cart/getcart"
        );
        const cartItems = response.data.items;
        const isItemInCart = cartItems.some((item) => item.productId === id);
        console.log("clicked on buynow", cartItems);
        if (!isItemInCart) {
          // If item is not in cart, add it
          console.log("clicked on buynow");
          await axios.post(
            "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/cart/addcart",
            requestData
          );
          const updatedResponse = await axios.get(
            "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/cart/getcart"
          );
          localStorage.setItem(
            "cartItems",
            JSON.stringify(updatedResponse.data)
          );
          setCount(updatedResponse.data.totalQuantity);
          dispatch(addItemToCart(updatedResponse.data));
        }
      }
      if (count === 0) {
        const token = localStorage.getItem("token");
        console.log("clicked on buynow");
        axios.defaults.headers.common["Authorization"] = token;
        const requestData = {
          productId: id,
          quantity: 1,
        };
        await axios.post(
          "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/cart/addcart",
          requestData
        );
        const updatedResponse = await axios.get(
          "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/cart/getcart"
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedResponse.data));
        setCount(updatedResponse.data.totalQuantity);
        dispatch(addItemToCart(updatedResponse.data));
      }
      // Navigate to the cart page
      navigate("/cart");
    } catch (error) {
      alert("An error occurred while adding the item to the cart.");
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
          <div>{isAuthorized && <CartBtn count={count} />}</div>
        </div>
        <div>
          <Link to="/">
            <button className={styles.backToProductBtn}>
              Back to products
            </button>
          </Link>
        </div>
        <Link to="/">
          <div className={styles.backIcon}>
            <img src={backMobileIcon} alt="" />
          </div>
        </Link>
        <div
          className={`${styles.buyNowBtn} ${styles.mobileBuyNowBtn}`}
          onClick={() => handleBuyNow(product._id)}
        >
          Buy Now
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
            <div className={styles.summaryMobile}>
              <p>{product.summary}</p>
            </div>
            <div className={styles.price}>Price: ₹ {product.price}</div>
            <span className={styles.colorType}>
              {product.color} | {product.headphoneType}
            </span>
            <div className={styles.aboutItem}>
              <h3 className={styles.aboutItemTitle}>About this item</h3>
              <ul>
                {product.about.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.availability}>
              <span className={styles.availableStockTitle}>Available - </span>
              <span className={styles.stock}>{product.availability}</span>
            </div>
            <div className={styles.brand}>
              <span className={styles.availableStockTitle}> Brand - </span>
              <span className={styles.stock}>{product.brand}</span>
            </div>
            <div>
              <div className={styles.btn}>
                <div
                  className={styles.addToCartBtn}
                  onClick={() => handleCartProduct(product._id)}
                >
                  Add To Cart
                </div>

                <div
                  className={styles.buyNowBtn}
                  onClick={() => handleBuyNow(product._id)}
                >
                  Buy Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer count={count} inDetailsPage={inDetailsPage} />
    </div>
  );
};

export default ProductDetails;
