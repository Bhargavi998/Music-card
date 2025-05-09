import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, searchProducts } from "../../store/slices/productSlice";
// import { selectDisplayType } from "../../store/slices/displayOptionsSlice";
import styles from "./ProductList.module.css";
import AddToCartIcon from "../../assets/AddToCartIcon.png";
import { Link } from "react-router-dom";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../store/slices/cartSlice";
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductList = ({ count, updateCount }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const selectedFilters = useSelector(
    (state) => state.filterOptions.selectedFilters
  );
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const [isAuthorized, setIsAuthorized] = useState(false);

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
    console.log("Fetching products for grid view");
    console.log("selectedFilters, ", selectedFilters);
    if (searchQuery) {
      dispatch(searchProducts(searchQuery));
    } else {
      dispatch(fetchProducts(selectedFilters));
    }
  }, [dispatch, selectedFilters, searchQuery]);

  const handleCartProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      let existingCartItem;
      if (count != 0) {
        const respons = await axios.get(
          "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/cart/getcart"
        );
        const cartItems = respons.data.items;
        existingCartItem = cartItems.find((item) => item.product._id === id);
      }
      if (count != 0 && existingCartItem && existingCartItem.quantity >= 8) {
        // If the product is already in the cart, update its quantity
        toast.error("cannot add more than 8 item");
        return;
      }
      const requestData = {
        productId: id,
        quantity: 1,
      };
      if (!token) return;
      await axios.post(
        "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/cart/addcart",
        requestData
      );
      const response = await axios.get(
        "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/cart/getcart"
      );
      localStorage.setItem("cartItems", JSON.stringify(response.data));
      dispatch(addItemToCart(response.data));
      updateCount(count + 1);
      toast.success("Item added to cart sucessfully.");
    } catch (error) {
      toast.error(error);
    }
  };
  const ProductItem = ({ product }) => (
    <div className={styles.productItemListContainer}>
      <div>
        <div className={styles.productItemList}>
          <div className={styles.productImageContainer}>
            {product.images && product.images.length > 0 && (
              <img src={product.images[0]} alt={product.name} />
            )}
            {isAuthorized && (
              <div
                className={styles.addToCartContainer}
                onClick={() => handleCartProduct(product._id)}
              >
                <img src={AddToCartIcon} alt="Add to Cart" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.productDetails}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.price}>Price - ₹ {product.price}</div>
        <div>
          <span>{product.color}</span>
          <span>|</span>
          <span>{product.headphoneType} headphone</span>
        </div>
        <div className={styles.summary}>
          <p>{product.summary}</p>
        </div>
        <Link to={`/productDetails/${product._id}`}>
          <div className={styles.detailsBtn}>Details</div>
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <div className={styles.listContainer}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
