import React from "react";
import styles from "./styles.module.css";

export function Pagination({
  records,
  itemsPerPage,
  totalRecords,
  currentPage,
  pages,
  incrementPage,
  decrementPage,
}) {
  const firstPageItemNumber =
    currentPage === 1
      ? records === 0
        ? 0
        : 1
      : itemsPerPage * (currentPage - 1) + 1;
  const lastPageItemNumber =
    firstPageItemNumber === 0 ? 0 : firstPageItemNumber + (records - 1);

  return (
    <div className={styles.pagination}>
      <div>
        <div>
          {firstPageItemNumber} - {lastPageItemNumber} of {totalRecords}
        </div>
      </div>
      <div className={styles.container}>
        <div>
          {pages > 0 ? currentPage : 0} of {pages}
        </div>
        <div className={styles.controlsContainer}>
          <div
            className={`${styles.leftArrow} ${
              currentPage > 1 ? "" : styles.hidden
            }`}
            onClick={decrementPage}
          >
            <span>&#8592;</span>
          </div>

          <div
            className={`${styles.rightArrow} ${
              pages > 1 && currentPage < pages ? "" : styles.hidden
            }`}
            onClick={incrementPage}
          >
            &#8594;
          </div>
        </div>
      </div>
    </div>
  );
}
