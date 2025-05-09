import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "../../assets/SearchIcon.svg";
import ListIcon from "../../assets/ListIcon.svg";
import GridIcon from "../../assets/GridIcon.svg";
import styles from "./FilterOptions.module.css";
import DropDownIcon from "../../assets/DropDownIcon.svg";
import { updateSelectedFilter } from "../../store/slices/filterOptionsSlice";
function Sort() {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const dispatch = useDispatch();
  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };
  const handleSelectOption = (filterType, value) => {
    setShowSortOptions(false);
    dispatch(updateSelectedFilter({ filterType, value }));
  };
  return (
    <div className={styles.sort}>
      <div className={styles.dropdown}>
        <div className={styles.dropdownContainer} onClick={toggleSortOptions}>
          <div className={styles.optionTitle}>Sort by: Featured</div>
          <img src={DropDownIcon} alt="Dropdown" />
        </div>
        {showSortOptions && (
          <div className={styles.options}>
            <div className={styles.feturedShowText}>Featured</div>
            <div
              className={styles.feature}
              onClick={() => handleSelectOption("sortBy", "priceLowest")}
            >
              Price Lowest
            </div>
            <div
              className={styles.feature}
              onClick={() => handleSelectOption("sortBy", "priceHighest")}
            >
              Price Highest
            </div>
            <div
              className={styles.feature}
              onClick={() => handleSelectOption("sortBy", "nameAZ")}
            >
              Name A-Z
            </div>
            <div
              className={styles.feature}
              onClick={() => handleSelectOption("sortBy", "nameZA")}
            >
              Name Z-A
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sort;
