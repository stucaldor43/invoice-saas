import React from "react";

export function ClientRow({ client }) {
  return (
    <tr>
      <td>{`${client.firstName} ${client.lastName}`}</td>
      <td>{client.email}</td>
      <td>{client.companyName}</td>
      <td>{client.dateCreated}</td>
    </tr>
  );
}
