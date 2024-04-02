import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ListIcon from "../../assets/ListIcon.svg";
import GridIcon from "../../assets/GridIcon.svg";
import styles from "./FilterOptions.module.css";
import NotSelectedGridIcon from "../../assets/NotSelectedGridIcon.svg";
import SelectedListIcon from "../../assets/SelectedListIcon.svg";
import { setDisplayType } from "../../store/slices/displayOptionsSlice";

function Display() {
  const dispatch = useDispatch();
  const displayType = useSelector((state) => state.displayOptions.displayType);

  const handleDisplayTypeChange = (type) => {
    dispatch(setDisplayType(type));
  };

  return (
    <div className={styles.displayOptions}>
      {displayType === "grid" && (
        <div className={styles.displayOption}>
          <img
            src={GridIcon}
            alt="Grid"
            className={displayType === "grid" ? styles.active : ""}
            onClick={() => handleDisplayTypeChange("grid")}
          />
          <img
            src={ListIcon}
            alt="List"
            className={displayType === "list" ? styles.active : ""}
            onClick={() => handleDisplayTypeChange("list")}
          />
        </div>
      )}
      {displayType === "list" && (
        <div className={styles.displayOption}>
          <img
            src={NotSelectedGridIcon}
            alt="Grid"
            className={displayType === "grid" ? styles.active : ""}
            onClick={() => handleDisplayTypeChange("grid")}
          />
          <img
            src={SelectedListIcon}
            alt="List"
            className={displayType === "list" ? styles.active : ""}
            onClick={() => handleDisplayTypeChange("list")}
          />
        </div>
      )}
    </div>
  );
}

export default Display;
