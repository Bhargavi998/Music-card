import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "../../assets/SearchIcon.svg";
import styles from "./FilterOptions.module.css";
import { setSearchQuery } from "../../store/slices/searchSlice";
import MobileSearchIcon from "../../assets/MobileSearchIcon.svg";
function Searchbar() {
  const [searchQuery, setSearchQueryLocal] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setSearchQuery(searchQuery));
  };

  const handleKeyDown = (e) => {
    console.log("entered");
    console.log("searchQuery ", searchQuery);

    handleSearch();
  };

  return (
    <div>
      <div className={styles.searchBar}>
        <img src={SearchIcon} className={styles.searchIcon} alt="Search" />
        <input
          type="text"
          placeholder="Search by Product Name"
          value={searchQuery}
          onChange={(e) => setSearchQueryLocal(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.searchBarMobile}>
        <img
          src={SearchIcon}
          className={styles.MobileSearchIcon}
          alt="Search"
        />
        <input
          type="text"
          placeholder="Search Musicart"
          value={searchQuery}
          onChange={(e) => setSearchQueryLocal(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default Searchbar;
