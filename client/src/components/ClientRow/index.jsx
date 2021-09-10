import React from "react";
import { formatDate } from "./../../../src/helpers/format-date";
import styles from "./styles.module.css";

export function ClientRow({ client }) {
  return (
    <tr className={styles.row}>
      <td
        className={styles.cell}
      >{`${client.firstName} ${client.lastName}`}</td>
      <td className={styles.cell}>{client.email}</td>
      <td className={styles.cell}>{client.companyName}</td>
      <td className={styles.cell}>{formatDate(client.dateCreated)}</td>
    </tr>
  );
}
