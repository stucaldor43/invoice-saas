import React from "react";
import { ClientsHeadingRow } from "../ClientsHeadingRow";
import { ClientRow } from "./../ClientRow";
import "./styles.module.css";

export function ClientsTable({ clients, actions }) {
  return (
    <table>
      <thead>
        <ClientsHeadingRow actions={actions} />
      </thead>
      <tbody>
        {clients.map((client) => (
          <ClientRow key={client.email} client={client} />
        ))}
      </tbody>
    </table>
  );
}
