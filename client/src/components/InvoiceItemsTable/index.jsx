import React from "react";
import { InvoiceItemCategoryRow } from "./../InvoiceItemCategoryRow";
import { InvoiceItemRow } from "./../InvoiceItemRow";
import styles from "./styles.module.css";

export function InvoiceItemsTable({ items, editItem, removeItem }) {
  return (
    <table className={styles.table}>
      <thead>
        <InvoiceItemCategoryRow />
      </thead>
      <tbody>
        {items.map((item) => (
          <InvoiceItemRow
            key={item.id}
            item={item}
            editItem={editItem}
            removeItem={removeItem}
          ></InvoiceItemRow>
        ))}
      </tbody>
    </table>
  );
}
