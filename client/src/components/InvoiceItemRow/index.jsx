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
          value={`$${item.price}`}
          onChange={(e) =>
            editItem(item.id, {
              price: e.target.value.slice(1),
              cost: Number(e.target.value.slice(1)) * item.quantity,
            })
          }
        />
      </td>
      <td className={styles.dataCell}>
        <input
          className={styles.input}
          type="text"
          value={item.quantity}
          onChange={(e) =>
            editItem(item.id, {
              quantity: e.target.value,
              cost: Number(e.target.value) * item.price,
            })
          }
        />
      </td>
      <td className={styles.dataCell}>
        <input
          className={styles.input}
          type="text"
          value={Number(item.cost).toFixed(2)}
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
