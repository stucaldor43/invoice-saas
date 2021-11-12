import React from "react";
import styles from "./styles.module.css";

export function InvoiceItemCategoryRow() {
  return (
    <tr className={styles.row}>
      <th className={styles.itemHeading}>Item</th>
      <th>Rate</th>
      <th>Hours</th>
      <th>Total</th>
      <th className={styles.iconHeading}></th>
    </tr>
  );
}
