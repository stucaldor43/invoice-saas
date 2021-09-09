import React from "react";
import styles from "./styles.module.css";

export function Pagination({
  canGoto,
  currentPage,
  pages,
  incrementPage,
  decrementPage,
}) {
  return (
    <div className={styles.pagination}>
      {currentPage > 1 ? (
        <div className={styles.leftArrow} onClick={decrementPage}>
          <span>&#8592;</span>
        </div>
      ) : null}
      {pages > 1 && currentPage < pages ? (
        <div className={styles.rightArrow} onClick={incrementPage}>
          &#8594;
        </div>
      ) : null}
    </div>
  );
}
