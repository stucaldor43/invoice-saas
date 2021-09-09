import React from "react";
import { TrashSvg } from "../icons/TrashSvg";
import styles from "./styles.module.css";

export function InvoiceItemRow({ item, editItem, removeItem }) {
  return (
    <tr>
      <td className={styles.dataCell}>
        <textarea
          className={styles.textarea}
          placeholder="Item name"
          value={item.name}
          onChange={(e) => editItem(item.id, { name: e.target.value })}
        ></textarea>
      </td>
      <td className={styles.dataCell}>
        <input
          className={styles.input}
          type="text"
          value={item.cost}
          onChange={(e) => editItem(item.id, { cost: e.target.value })}
        />
      </td>
      <td className={styles.dataCell}>
        <input
          className={styles.input}
          type="text"
          value={item.quantity}
          onChange={(e) => editItem(item.id, { quantity: e.target.value })}
        />
      </td>
      <td className={styles.dataCell}>
        <input
          className={styles.input}
          type="text"
          value={Number(item.cost * item.quantity).toFixed(2)}
          readOnly
        />
      </td>
      <td className={styles.dataCell}>
        <div className={styles.trashWrapper}>
          <TrashSvg
            className={styles.trashSvg}
            onClick={(e) => removeItem(item.id)}
          />
        </div>
      </td>
    </tr>
  );
}
