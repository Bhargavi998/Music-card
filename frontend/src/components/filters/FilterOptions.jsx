import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "../../assets/SearchIcon.svg";
import ListIcon from "../../assets/ListIcon.svg";
import GridIcon from "../../assets/GridIcon.svg";
import styles from "./FilterOptions.module.css";
import DropDownIcon from "../../assets/DropDownIcon.svg";
import { updateSelectedFilter } from "../../store/slices/filterOptionsSlice";
import Display from "./Display";
import Searchbar from "./Searchbar";
import Sort from "./Sort";

function FilterOptions() {
  const [showHeadphonesTypeOptions, setShowHeadphonesTypeOptions] =
    useState(false);
  const [showCompanyOptions, setShowCompanyOptions] = useState(false);
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [showPriceOptions, setShowPriceOptions] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const handleSelectOption = (filterType, value) => {
    if (filterType === "headphonesType") {
      setShowHeadphonesTypeOptions(false);
    }
    if (filterType === "color") {
      setShowColorOptions(false);
    }
    if (filterType === "price") {
      setShowPriceOptions(false);
    }
    if (filterType === "company") {
      setShowCompanyOptions(false);
    }
    console.log("handleSelectOption", filterType, value);
    dispatch(updateSelectedFilter({ filterType, value }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowHeadphonesTypeOptions(false);
        setShowCompanyOptions(false);
        setShowColorOptions(false);
        setShowPriceOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleHeadphonesTypeOptions = () => {
    setShowHeadphonesTypeOptions(!showHeadphonesTypeOptions);
  };

  const toggleCompanyOptions = () => {
    setShowCompanyOptions(!showCompanyOptions);
  };

  const toggleColorOptions = () => {
    setShowColorOptions(!showColorOptions);
  };

  const togglePriceOptions = () => {
    setShowPriceOptions(!showPriceOptions);
  };

  return (
    <div className={styles.filterOptionsContainer}>
      <Searchbar />
      <div className={styles.filterOptions} ref={dropdownRef}>
        <Display />
        <div className={styles.filterOptionContainer}>
          <div className={styles.filterOption}>
            <div className={styles.dropdown}>
              <div
                className={styles.dropdownContainer}
                onClick={toggleHeadphonesTypeOptions}
              >
                <div className={styles.optionTitle}>Headphones Type</div>
                <img src={DropDownIcon} alt="Dropdown" />
              </div>
              {showHeadphonesTypeOptions && (
                <div className={styles.options}>
                  <div className={styles.feturedShowText}>Featured</div>
                  <div
                    className={styles.feature}
                    onClick={() =>
                      handleSelectOption("headphonesType", "On Ear")
                    }
                  >
                    On-Ear headphone
                  </div>
                  <div
                    className={styles.feature}
                    onClick={() =>
                      handleSelectOption("headphonesType", "In Ear")
                    }
                  >
                    In-Ear headphone
                  </div>
                  <div
                    className={styles.feature}
                    onClick={() =>
                      handleSelectOption("headphonesType", "Over Ear")
                    }
                  >
                    Over-Ear headphone
                  </div>
                </div>
              )}
            </div>
            <div className={styles.dropdown}>
              <div
                className={styles.dropdownContainer}
                onClick={toggleCompanyOptions}
              >
                <div className={styles.optionTitle}>Company</div>
                <img src={DropDownIcon} alt="Dropdown" />
              </div>
              {showCompanyOptions && (
                <div className={styles.options}>
                  <div className={styles.feturedShowText}>Featured</div>
                  <div
                    className={styles.feature}
                    onClick={() => handleSelectOption("company", "Sony")}
                  >
                    Sony
                  </div>
                  <div
                    className={styles.feature}
                    onClick={() => handleSelectOption("company", "Boat")}
                  >
                    Boat
                  </div>
                  <div
                    className={styles.feature}
                    onClick={() => handleSelectOption("company", "Zebronics")}
                  >
                    Zebronics
                  </div>
                  <div
                    className={styles.feature}
                    onClick={() => handleSelectOption("company", "Marshall")}
                  >
                    Marshall
                  </div>
                  <div
                    className={styles.feature}
                    onClick={() => handleSelectOption("company", "Ptron")}
                  >
                    Ptron
                  </div>
                  <div
                    className={styles.feature}
                    onClick={() => handleSelectOption("company", "JBL")}
                  >
                    JBL
                  </div>
                </div>
              )}
            </div>
            <div className={styles.dropdown}>
              <div
                className={styles.dropdownContainer}
                onClick={toggleColorOptions}
              >
                <div className={styles.optionTitle}>Color</div>
                <img src={DropDownIcon} alt="Dropdown" />
              </div>
              {showColorOptions && (
                <div className={styles.options}>
                  <div className={styles.feturedShowText}>Featured</div>
                  <div
                    className={styles.feature}
                    onClick={() => handleSelectOption("color", "Black")}
                  >
                    Black
                  </div>
                  <div
                    className={styles.feature}
                    onClick={() => handleSelectOption("color", "Blue")}
                  >
                    Blue
                  </div>
                  <div
                    className={styles.feature}
                    onClick={() => handleSelectOption("color", "Brown")}
                  >
                    Brown
                  </div>
                  <div
                    className={styles.feature}
                    onClick={() => handleSelectOption("color", "White")}
                  >
                    White
                  </div>
                </div>
              )}
            </div>
            <div className={styles.dropdown}>
              <div
                className={styles.dropdownContainer}
                onClick={togglePriceOptions}
              >
                <div className={styles.optionTitle}>Price</div>
                <img src={DropDownIcon} alt="Dropdown" />
              </div>
              {showPriceOptions && (
                <div className={styles.options}>
                  <div className={styles.feturedShowText}>Featured</div>
                  <div
                    className={styles.feature}
                    onClick={() => handleSelectOption("price", "0-1000")}
                  >
                    ₹0 - ₹1,000
                  </div>
                  <div
                    className={styles.feature}
                    onClick={() => handleSelectOption("price", "1000-10000")}
                  >
                    ₹1,000 - ₹10,000
                  </div>
                  <div
                    className={styles.feature}
                    onClick={() => handleSelectOption("price", "10000-20000")}
                  >
                    ₹10,000 - ₹20,000
                  </div>
                </div>
              )}
            </div>
          </div>
          <Sort />
        </div>
      </div>
    </div>
  );
}

export default FilterOptions;
