import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice";

import ProductGrid from "../ProductGrid/ProductGrid";
import ProductList from "../productList/ProductList";
import DefaultLayout from "../layout/DefaultLayout";
import FilterOptions from "../filters/FilterOptions";
const Product = ({ count, updateCount }) => {
  const displayType = useSelector((state) => state.displayOptions.displayType);

  return (
    <div>
      <DefaultLayout count={count} />
      <FilterOptions />
      {displayType === "grid" ? (
        <ProductGrid count={count} updateCount={updateCount} />
      ) : (
        <ProductList count={count} updateCount={updateCount} />
      )}
    </div>
  );
};

export default Product;
