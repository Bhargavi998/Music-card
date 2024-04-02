import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice";

import ProductGrid from "../ProductGrid/ProductGrid";
import ProductList from "../productList/ProductList";
import DefaultLayout from "../layout/DefaultLayout";
import FilterOptions from "../filters/FilterOptions";
const Product = () => {
  const displayType = useSelector((state) => state.displayOptions.displayType);

  return (
    <div>
      <DefaultLayout />
      <FilterOptions />
      {displayType === "grid" ? <ProductGrid /> : <ProductList />}
    </div>
  );
};

export default Product;
